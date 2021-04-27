import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/_model/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private http: HttpClient
  ) { }

  getAllMenu() {
    return this.http.get(environment.apiUrl + "menu");
  }

  

  getAllmenuDetailBymenuID(id) {
    return this.http.get(environment.apiUrl + "menuDetail/byMenu?menu_id=" + id);
  }


  product_menu_detail(id){
    return this.http.get(environment.apiUrl + "proMenuDetail/menuDetail?menu_id=" + id);

  }
}
