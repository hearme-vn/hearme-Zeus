/**
 * @license hearme 
 * @copyright 2017-2020 https://hearme.vn 
 * @author Thuc VX <thuc@hearme.vn>
 * @date 2 Apr 2020
 * @purpose Checking user permission and decide user can use particular menu
 */

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService, APPService, APPCONSTS } from '@app/_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private app_service: APPService
  ) {
    // this.authenticationService.initUserAccountAndOrganization();
    // console.log("Finished init contructor for AuthGuard");
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // console.log("Enter canActive check");
    if (!this.authenticationService.currentUser)
      try {
        await this.authenticationService.initUserAccountAndOrganization();
      } catch (error) {
        console.log("Error: ", error);
      }

    // console.log("Start checking permission to enter routing");
    if (this.authenticationService.isAuthenicated()) {
      // console.log("Required permissions: ", route.data.permissions);

      // check if route is restricted by role
      if (route.data.permissions && 
        !this.authenticationService.hasPermissions(route.data.permissions)) {
          this.app_service.showMessageById("MSG.PERMISSION_DENIED", APPCONSTS.TOAST_TYPE_ERROR);
          
          // don't have permission so redirect to default logged page

          this.router.navigate([APPCONSTS.DEFAULT_LOGGED_PAGE]);
          return false;
      }
 
      // authorised so return true
      return true;
    }

    this.app_service.showMessageById("MSG.PERMISSION_DENIED", APPCONSTS.TOAST_TYPE_ERROR);
    // not logged in so redirect to login page with the return url
    this.router.navigate([APPCONSTS.LOGIN_PAGE], { queryParams: { returnUrl: state.url }});
    return false;
  }
}