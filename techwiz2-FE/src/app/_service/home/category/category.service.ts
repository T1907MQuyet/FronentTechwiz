import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/_model/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }

  getAllcategoryActive() {
    return this.http.get(environment.apiUrl + "category/status?status=1");
  }

  getAllcategoryDetailByCategoryID(id) {
    return this.http.get(environment.apiUrl + "categoryDetail/byCategory/?cate_id=" + id);
  }
}
