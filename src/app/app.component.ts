import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { APPCONSTS, I18nService, APPService, AuthenticationService } from '@app/_services';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(private router: Router,
    private app_service: APPService,
    private authen_service: AuthenticationService
    ) { 
  }

  /*
  // For initializing the directive/component,
  // after Angular first displays the data-bound properties 
  // and sets the directive/component's input properties
  */
  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  // Post Init; after first page is loaded
  ngAfterViewInit() {

  }

}
