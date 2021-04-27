import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/_service/home/category/category.service';
import { order } from 'src/app/_model/order';
import { OrderService } from 'src/app/_service/home/order/order.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_service/Authentication.Service';
import { User } from 'src/app/_model/User';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MenuService } from 'src/app/_service/home/menu/menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private category: CategoryService,
    private orderService: OrderService,
    private authentication: AuthenticationService,
    private router: Router,
    private formBuild: FormBuilder,
    private menuService: MenuService
  ) { }

  isLogin = false;
  ListCategoryActive;
  ListCategoryDetailActive = [];
  listCategoryandCateDetail = [];

  ListmenuActive;
  ListmenuDetailActive = [];
  listmenuandCateDetail = [];
  userInfor;
  ngOnInit(): void {
    this.getAllcategoryActive();
    this.getAllMenuActiveAndMenuDetail();
    let checkLogin = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser'))).value;
    
    if (checkLogin) {
      let idUser = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser'))).value.customer_id;
      this.authentication.getUserById(idUser).subscribe(
        data => {
          this.isLogin = true;
          let contain = data;          
          this.userInfor = contain;
        }
      )
    }

  }

  getAllcategoryActive() {
    this.category.getAllcategoryActive().subscribe(
      data => {
        this.ListCategoryActive = data;
        for (let i = 0; i < this.ListCategoryActive.length; i++) {
          // console.log(this.ListCategoryActive[i].cate_id);

          this.category.getAllcategoryDetailByCategoryID(this.ListCategoryActive[i].cate_id).subscribe(
            data => {
              // this.ListCategoryDetailActive[i] = data;
              this.ListCategoryDetailActive[i] = data;
              this.listCategoryandCateDetail.push(
                {
                  categoryName: this.ListCategoryActive[i].cate_name,
                  categoryDetail: this.ListCategoryDetailActive[i]
                }
              )
            }
          )
        }

      }
    )
  }

  getAllMenuActiveAndMenuDetail() {
    this.menuService.getAllMenu().subscribe(
      data => {
        this.ListmenuActive = data;

        for (let i = 0; i < this.ListmenuActive.length; i++) {

          this.menuService.getAllmenuDetailBymenuID(this.ListmenuActive[i].menu_id).subscribe(
            data => {
              // this.ListCategoryDetailActive[i] = data;
              this.ListmenuDetailActive[i] = data;
              this.listmenuandCateDetail.push(
                {
                  menuName: this.ListmenuActive[i].menu_name,
                  menuDetail: this.ListmenuDetailActive[i]
                }
              )
            }
          )
        }

      }


    )
  }

  logout() {
    this.authentication.logout();
    this.isLogin = false;
    this.router.navigate(['/login']);
  }

  isnavMobile= false;
  showNavMobile() {
    this.isnavMobile = !this.isnavMobile
  }

  
}
