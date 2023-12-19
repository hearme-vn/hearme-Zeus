/**
 * @license hearme 
 * @copyright 2017-2020 https://hearme.vn 
 * @author Thuc VX <thuc@hearme.vn>
 * @date 24 Apr 2020
 * @purpose container component for anonymous - un-logged user
 */

import {Component } from '@angular/core';
import { Router } from '@angular/router';
// import { navItems } from '@app/_nav';
import { TranslateService } from '@ngx-translate/core';

import { APPService, URIS, APPCONSTS, AuthenticationService, I18nService } from '@app/_services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './anyone-layout.component.html'
})
export class AnyoneLayoutComponent {
  // public sidebarMinimized = false;
  
  /**
   * this properties is language and localize service
  */
  // private i18n: I18nService;    // For use in template

  /**
   * List of all supported languages in this application
   * - This list is defined in APPCONSTS constant
   * - This variable will be used in template to make list of language selection
  */
  public langs: any;           // For use in template

  constructor( 
    private i18n: I18nService
    ) { 
    this.langs = APPCONSTS.APP_LANGS;
  }

}
