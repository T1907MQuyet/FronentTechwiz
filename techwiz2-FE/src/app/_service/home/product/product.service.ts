import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/_model/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private http: HttpClient
  ) { }

  getAllProductActive() {
    return this.http.get(environment.apiUrl + "product");
  }

  getAllProductByCategoryDetails(id) {
    return this.http.get(environment.apiUrl + "product/category?cate_id=" + id);
  }

  getProductDetail(id) {
    return this.http.get(environment.apiUrl + "product/" + id);
  }
}
