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

  getProductById(id) {
    return this.http.get(environment.apiUrl + "product/" + id);
  }
  getAllProductByCategoryDetails(id) {
    return this.http.get(environment.apiUrl + "product/category?cate_id=" + id);
  }

  getAllProductBymenuDetails(id) {
    return this.http.get(environment.apiUrl + "product/category?cate_id=" + id);
  }
  getProductDetail(id) {
    return this.http.get(environment.apiUrl + "product/" + id);
  }

  containValueSearch = {
    name: '',
    minPrice: 0,
    maxPrice: 0
  }
  setValueBySearch(name, minPrice, maxPrice) {
    return this.containValueSearch = {
      name: name.toLowerCase(),
      minPrice: minPrice,
      maxPrice: maxPrice
    }
  }

  getValueBySearch() {
    console.log(this.containValueSearch);
    
    return this.containValueSearch;
  }
}