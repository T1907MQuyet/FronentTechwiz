

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/_service/Authentication.Service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  formRegister: FormGroup;
  ngOnInit(): void {
    // createForm
    this.formRegister = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.pattern("^[a-zA-z ]*$")]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    })
  }
  get username() { return this.formRegister.get('username'); }
  get email() { return this.formRegister.get('email'); }
  get password() { return this.formRegister.get('password'); }

  // listDataEmail = [];
  error;
  succesAlert = false;
  register(val) {
    let data = {
      "username": val.username,
      "email": val.email,
      "password": val.password
    }

    this.authenticationService.register(data).subscribe(
      data => {
        this.error = '';
        this.succesAlert = true;
        // setTimeout(() => {
        //   this.router.navigate(["/login"]);
        // }, 1000);
      },

      err => {
        this.error = err.error.Errors;
        this.succesAlert = false;
      }

    )
    this.succesAlert = false;
  }

}
