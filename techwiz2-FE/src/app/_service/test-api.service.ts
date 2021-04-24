import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestApiService {

  constructor(
    private http: HttpClient,

  ) { }

  getApi() {
    return this.http.get("http://localhost:8888/api/customer")
  }
}
