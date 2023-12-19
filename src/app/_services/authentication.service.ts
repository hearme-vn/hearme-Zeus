/**
 * @license hearme 
 * @copyright 2017-2020 https://hearme.vn 
 * @author Thuc VX <thuc@hearme.vn>
 * @date 2 Apr 2020
 * @purpose service to check and do authentication, then load user information, organization
 */

import { Injectable, Injector } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

import { UserModel } from '@app/_models';
import { APPService } from './app.service';
import { APPCONSTS } from './app.const';
import { URIS } from './uris.const';

import { INavData } from '@coreui/angular';
// import { environment }  from '@env/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  // private currentUserSubject: BehaviorSubject<User>;
  // public currentUser: Observable<User>;

  /**
   * Logged user. Get this data after user logging in
  */
  public currentUser;

  /**
   * List of Organizations and User role names
   */
   public org_roles;

  /**
   * User's' working organization
   */
  public working_organization = null;
  /**
   * User roles in working organization; Role is name of group of permissons
   */
  public user_roles;

  /**
   * - User permission in working organization, example of permission array:
   * - [{action: "all", permission_id: "admin", resource_id: "efaa4c7", resource_type: "organization", role_id: "378b0"},..]
   */
  public user_permissions;

  constructor(// private http: HttpClient, 
    // private injector: Injector
    private router: Router,
    private app_service: APPService
    ) {
    // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    // this.currentUser = this.currentUserSubject.asObservable();
  }

  public getCurrentUser(): UserModel {
    return this.currentUser;
  }

  public getToken() {
    let token = localStorage.getItem( APPCONSTS.LOCAL_STARAGE_KEYS.AUTH_TOKEN );
    return token;
  }

  static getToken() {
    let token = localStorage.getItem( APPCONSTS.LOCAL_STARAGE_KEYS.AUTH_TOKEN );
    return token;
  }

  public isAuthenicated() {
    return (this.getToken() && this.currentUser);
  }

  /**
   * Init User account and organization information; permission.
   * Purpose: provide data for rounting to check permission
   * This function is called in routing class, before checking canActivate
   * 
   * 2 steps of checking user information: 
   * - Check TOKEN
   * - Getting user information

   * Steps for getting Organization and Roles.
   * - User's role list
   * - Current working organization
   * - User default language
   * - Check user permission for sidebar data
   * - Load plugin: suspending
   * - Register user notification
   * 
  */
  public async initUserAccountAndOrganization() {
    // console.log("Start checking and loading user - organization");

    // Check token and user account
    let token = localStorage.getItem( APPCONSTS.LOCAL_STARAGE_KEYS.AUTH_TOKEN );
    if (!token)      return Promise.reject("Error: no authentication token");

    this.currentUser = await this.getUserInformation();

    if (!this.currentUser) {
      // Delete expired or wrong token  - processed in Error interceptor
      localStorage.removeItem( APPCONSTS.LOCAL_STARAGE_KEYS.AUTH_TOKEN );
      return Promise.reject("Error: cannot get user information");
    }
    
    try {
      // Load Organization and user  role list
      let rolelist_url =  this.app_service.Based_URLs.main + URIS.main.v145RoleList;
      this.org_roles = await this.app_service.getAPIPromise(rolelist_url);

      // Get personal organization
      let personal_org = await this.app_service.getOrganizationById(null);
      if (!personal_org) {
        // Create new personal organization here
        let payload = {
          "name": ((this.currentUser.name)? this.currentUser.name : String(this.currentUser.first_name) + " " + String(this.currentUser.last_name))
        }
        let url = this.app_service.Based_URLs.main + URIS.main.personal_organization_update;
        personal_org = await this.app_service.postAPI_Observable(url, payload).toPromise();
      }
      
      let root_role = { org_id: personal_org['id'], organization: personal_org, roles: null };
      this.org_roles.unshift(root_role);

      // Get user's working organization
      this.working_organization = this.getCurrentOrganization(this.org_roles);

      // Get user role in working organization
      if (this.working_organization.type==APPCONSTS.ORGANIZATION_TYPE_PERSONAL) {
        this.user_permissions = null;
      } else {
        let url_template = this.app_service.Based_URLs.auth + URIS.auth.permissionList;
        this.user_permissions = await this.app_service.getAPIPromise(url_template, 
          {org_id: this.working_organization.id});
      }
      // console.log("End checking and loading user - organization");

      return Promise.resolve("success init user and organization");
    } catch (err) {
      return Promise.reject(err);
    }
  }


  /**
   * This method is called when initialize application or after getting token (in login page)
   * 2 steps of checking: 
   * - Check TOKEN
   * - Getting user information
   * 
   * If failed: goto login page, otherwise: return current user
   * *
  public async checkUserAuthenicated() {
    let token = localStorage.getItem( APPCONSTS.LOCAL_STARAGE_KEYS.AUTH_TOKEN );
    if (!token) {
      this.router.navigate([APPCONSTS.LOGIN_PAGE]);
      return;
    }

    this.currentUser = await this.getUserInformation();
    // if (this.currentUser) {
    //   // Running user - redirect to default page
    //   this.router.navigate([APPCONSTS.DEFAULT_LOGGED_PAGE])
    // } else {

    if (!this.currentUser) {
      // Delete expired token - processed in Error interceptor
      localStorage.removeItem( APPCONSTS.LOCAL_STARAGE_KEYS.AUTH_TOKEN );

      // Goto login page
      this.router.navigate([APPCONSTS.LOGIN_PAGE]);
    }
    
    return this.currentUser;
  }

  /**
   * Return a Promise, support blocking call with await
   * */ 
  public getUserInformation() {
    let url = this.app_service.Based_URLs.auth + URIS.auth.user_infomation;
    return this.app_service.getAPIPromise(url);
  }

  login(username: string, password: string, success_cb=null, failed_cb=null) {
    let payload = { "username": username, "password": password };
    let url = this.app_service.Based_URLs.auth + URIS.auth.login;
    return this.app_service.postAPI(url, payload, function(res) {
      // console.log("Token: ", res);
      localStorage.setItem( APPCONSTS.LOCAL_STARAGE_KEYS.AUTH_TOKEN, res.token );
      if (success_cb)     success_cb(res);
    }, function (err) {
      if (failed_cb)      failed_cb(err);
    });
  }

  /**
   * This method check if current user has permissions, return true; otherwise return false 
   * Function return true if:
   * - current working organization is private 
   * - required_permissions is emty or null
   * - working user has a permission in required_permissions array
  */
  hasPermissions(required_permissions) {
    // Require no role, then return true
    if (!required_permissions || !required_permissions.length)        return true;

    let working_org = this.working_organization;
    if (!working_org)   return false
    if (working_org.type == APPCONSTS.ORGANIZATION_TYPE_PERSONAL)       return true;

    // User has not any role, return false
    if (!this.user_permissions || !this.user_permissions.length)      return false;
    for (let i=0; i< required_permissions.length; i++) {
      let permission = required_permissions[i];
      for (let key in this.user_permissions) {
        if (this.user_permissions[key]['permission_id']==permission)     return true;
      }
      
    }
    return false;
  }

  /**
   * Check and set visibility for navigation bar's data
   * - Base on user permission and data defined in navigation bar, set item visibility
  */
  public checkSidebarVisibility(navItems: INavData[]) {
    if (!navItems)    return;

    for (let i=0; i<navItems.length; i++) {
      let navItem = navItems[i];
      // console.log("Required permissons: ", navItem.permissions);
      let visibility = this.hasPermissions(navItem.permissions);
      if (!visibility) {
        navItem.attributes = {
          style: "display: none"
        }
      }
    }
  }

  // Need to reset application when user sign-out
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem( APPCONSTS.LOCAL_STARAGE_KEYS.AUTH_TOKEN );
    localStorage.removeItem( APPCONSTS.LOCAL_STARAGE_KEYS.WORKING_ORG_ID );
    localStorage.removeItem( APPCONSTS.LOCAL_STARAGE_KEYS.INVITATION_LIST_KEY );
  }

  /**
   * Load necessary application data here and all user configuration.
   * This function is call after user logged in.
   * - User's role list
   * - Current working organization
   * - User default language
   * - Check user permission for sidebar data
   * - Load plugin: suspending
   * - Register user notification
   *
  public async loadUserConfiguration() {
    try {
      // Load Organization and user  role list
      let rolelist_url =  this.app_service.Based_URLs.main + URIS.main.v145RoleList;
      this.org_roles = await this.app_service.getAPIPromise(rolelist_url);

      // Get personal organization
      let personal_org = await this.app_service.getOrganizationById(null);
      if (!personal_org) {
        // Create new personal organization here
        let payload = {
          "name": ((this.currentUser.name)? this.currentUser.name : String(this.currentUser.first_name) + " " + String(this.currentUser.last_name))
        }
        let url = this.app_service.Based_URLs.main + URIS.main.personal_organization_update;
        personal_org = await this.app_service.postAPI_Observable(url, payload).toPromise();
      }
      
      let root_role = { org_id: personal_org['id'], organization: personal_org, roles: null };
      this.org_roles.unshift(root_role);

      // Get user's working organization
      this.working_organization = this.getCurrentOrganization(this.org_roles);

      // Get user role in working organization
      if (this.working_organization.type==APPCONSTS.ORGANIZATION_TYPE_PERSONAL) {
        this.user_permissions = null;
      } else {
        let url_template = this.app_service.Based_URLs.auth + URIS.auth.permissionList;
        this.user_permissions = await this.app_service.getAPIPromise(url_template, 
          {org_id: this.working_organization.id});
      }

      return Promise.resolve("success");
    } catch (err) {
      return Promise.reject(err);
    }
  
  }

  /**
   * - Get current working organization for current user
   * - If user's enterprise organization id is exist in local storage, search in org list
   * Else: return personal organization
   */ 
  public getCurrentOrganization(org_roles) {
    // Load working enterprise by org_id
    let org_id = localStorage.getItem( APPCONSTS.LOCAL_STARAGE_KEYS.WORKING_ORG_ID );
    if (org_id) {
      for (let i=0; i<org_roles.length; i++) {
        if (org_id==org_roles[i].org_id)     return org_roles[i].organization
      }
    }

    //org_id is null or cannot search org_id in org list, then return personal organization
    return org_roles[0].organization;
  }

  /**
   * - Set current working organization for current user
   */
  public setCurrentOrganization(org) {
    if (org) {
      let current_org_id = this.working_organization.id;
      if (current_org_id == org.id)   return;

      let org_id = "";
      if (org.type == APPCONSTS.ORGANIZATION_TYPE_ENTERPRISE)   org_id = org.id;
      localStorage.setItem( APPCONSTS.LOCAL_STARAGE_KEYS.WORKING_ORG_ID, org_id);

      location.reload();  // Reload application and reload permissions
    }
  }

}
