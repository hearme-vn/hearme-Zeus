/**
 * @license hearme 
 * @copyright 2017-2020 https://hearme.vn 
 * @author Thuc VX <thuc@hearme.vn>
 * @date 2 Apr 2020
 * @purpose container component for all main pages (main application features)
 */

import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { navItems } from '@app/_nav';
// import { TranslateService } from '@ngx-translate/core';

import { APPService, URIS, APPCONSTS, AuthenticationService, I18nService } from '@app/_services';
import {NotificationModel} from '@app/_models/notification.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['default-layout.component.css']
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = navItems;

  // private role_list;            // Role and organization
  /**
   * Keep data for header in template
   * */
  public header = null;

  /**
   * this properties is language and localize service
  */
  public i18n: I18nService;    // For use in template

  /**
   * List of all supported languages in this application
   * - This list is defined in APPCONSTS constant
   * - This variable will be used in template to make list of language selection
  */
  public langs: any;           // For use in template

  /**
   * sidde bar's visibility
   * - Default is false.
   * - Side bar is visible after application loads and processes _nav.ts data
  */
  public sidebar_visibility = false;

  notifyCount = 0;
  lstNotify: NotificationModel[] = [];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private app_service: APPService,
    // private i18nService: I18nService

    ) {

    // this.authenticationService.checkUserAuthenicated();
    let isAuthenticated = this.authenticationService.isAuthenicated();
    if (!isAuthenticated)   return;

    this.i18n = this.app_service.i18n;
    this.langs = APPCONSTS.APP_LANGS;

    this.initContainerData();
  }

  /**
   * - Load necessary all user configuration
   * - Init application data here; setup data for container
   */
  public initContainerData() {
    // this.role_list = this.authenticationService.org_roles;
    // Set user language
    this.i18n.setUserLanguage(this.authenticationService.currentUser['default_lang']);

    // Register update default language function
    this.i18n.hook_register(this.app_service.updateUserDefaultLanguage.bind(this.app_service));

    // Configure header
    this.setheader(this.authenticationService.working_organization);

    // Configure sidebar
    this.authenticationService.checkSidebarVisibility(this.navItems);
    this.sidebar_visibility = true;
  }

  /**
   * From working organization, setting data for header
   * - header logo
   * - brand text if there is not logo
   * 
  */
  private setheader(working_org) {
    if (!working_org)   return;

    if (working_org.logo) {
      let logo_url = this.app_service.Based_URLs.imgs + working_org.logo;
      this.header = {
        brandFull: {src: logo_url , alt: 'hearme feedback system'},
        brandMinimized: {src: logo_url, alt: 'hearme feedback system'},
        brandText: null
      } 
    } else {
      this.header = {
        brandFull: null,
        brandMinimized: null,
        brandText: {icon: working_org.name, text:working_org.name}
      }
    }
  }

  /**
   * Setting sidebar menu for user, decide which menu can be displayed in sidebar
   */
  public setSidebar() {

  }

  // Support change organization
  changeOrganization(role) {
    let org = role.organization;

    // console.log("selected organization: ", org.id);
    let current_org_id = this.authenticationService.working_organization.id;
    if (current_org_id == org.id)   return;

    let org_id = "";
    // this.authenticationService.working_organization = org;
    // this.authenticationService.user_roles = role.roles;
    if (org.type == APPCONSTS.ORGANIZATION_TYPE_ENTERPRISE)   org_id = org.id;
    localStorage.setItem( APPCONSTS.LOCAL_STARAGE_KEYS.WORKING_ORG_ID, org_id);

    location.reload();  // Reload application and reload permissions
    return false;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate([APPCONSTS.LOGIN_PAGE]);
    return false;
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  getNotifyCount() {
    this.notifyCount = 0;
    const notify_count = this.app_service.Based_URLs.main + URIS.main.notify_count;
    this.app_service.postAPI(notify_count, {status: 0}, function(res) {
      this.notifyCount = res.count;
    }.bind(this));
  }
  getNotify() {
    this.lstNotify = [];
    const param = {
      offset: 0,
      limit: 10
    };
    const notify_list = this.app_service.Based_URLs.main + URIS.main.notify_list;
    this.app_service.postAPI(notify_list, param, function(res) {
      this.lstNotify = res;
    }.bind(this));
  }
  getNotifyContent(type, str): string {
    const notifyContentMaxLength = type === 0 ? 35 : 60;
    if (str && str.length > notifyContentMaxLength) {
      return str.substring(0, notifyContentMaxLength) + '...';
    }
    return str;
  }

  ngOnInit() {
    this.getNotifyCount();
    this.getNotify();
  }

  gotoNotifyPage() {
    this.router.navigate([APPCONSTS.NOTIFY_PAGE]);
  }
}
