import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_service/Authentication.Service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  clickDis = false;
  returnUrl: string;
  alert_err = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['testlogin@gmail.com', Validators.required],
      password: ['testlogin', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    if (this.loginForm.status != 'INVALID') {
      this.authenticationService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
          data => {
            this.alert_err = '';
            window.location.assign("/");
          },
          error => {
            this.alert_err = error.error.message;
          });
      this.clickDis = false;
    }
    else {
      this.username.errors.required = true;
      this.password.errors.required = true;
      this.clickDis = true;
    }

  }

}
