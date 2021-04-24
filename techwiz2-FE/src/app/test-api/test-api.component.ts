import { Component, OnInit } from '@angular/core';
import { TestApiService } from '../_service/test-api.service';
import { AuthenticationService } from './../_service/authentication.service';
@Component({
  selector: 'app-test-api',
  templateUrl: './test-api.component.html',
  styleUrls: ['./test-api.component.css']
})
export class TestApiComponent implements OnInit {

  constructor(
    private test: TestApiService
  ) { }

  ngOnInit(): void {
    this.test.getApi().subscribe(
      data => {
        console.log(data);
        
      }
    )
  }

}
