import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_service/Authentication.Service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private authentication: AuthenticationService,
  ) { }
  isLogin = false;

  ngOnInit(): void {
    if (this.authentication.currentUserValue != null) {
      this.isLogin = true;
    }
    else {
      this.isLogin = false;
    }
  }



}
