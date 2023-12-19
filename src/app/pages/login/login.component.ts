import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { APPCONSTS, AuthenticationService } from '@app/_services';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent { 
  loginForm: FormGroup;
  returnUrl: string;
  loading = false;
  submitted = false;
  error = '';

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService
  ) { 
      // redirect to home if already logged in
      if (this.authenticationService.isAuthenicated()) { 
          this.router.navigate([APPCONSTS.DEFAULT_LOGGED_PAGE]);
      }
  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });

  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }
  
  onSubmit() {
    this.loading = true;
    // console.log("Login information: ", this.f.username.value, this.f.password.value );
    this.authenticationService.login( this.f.username.value, this.f.password.value,
      function(data) {
        // GOTO return URL
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';

        if (this.returnUrl)
          this.router.navigate([this.returnUrl]);
        else
          this.router.navigate([APPCONSTS.DEFAULT_LOGGED_PAGE]);

      }.bind(this), 
      function(err) {
        // console.log("Error is: ", err);
      }
    );

    this.loading = false;
  }

  forgot_password() {

  }

}
