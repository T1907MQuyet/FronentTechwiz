import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(
    // (2)
    private http: HttpClient
  ) { }

  // (1)
  CreateOrderInDb(val) {
    return this.http.post("ccd", val);
  }
}
