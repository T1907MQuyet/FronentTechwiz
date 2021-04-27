import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { order, Order } from 'src/app/_model/order';
import { MenuService } from 'src/app/_service/home/menu/menu.service';
import { ProductService } from 'src/app/_service/home/product/product.service';

@Component({
  selector: 'app-list-product-menu',
  templateUrl: './../../list-product.component.html',
  styleUrls: ['./../../list-product.component.css']
})
export class ListProductMenuComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private product: ProductService,
    private menuService: MenuService,
    private route: ActivatedRoute

  ) { }
  isMenu = true;
  ListCategoryActive = [];
  err = '';
  listMenuActive;
  ListmenuDetailActive = [];
  listMenuandMenuDetail = [];
  contain;

  ngOnInit(): void {
    // this.getAllActive();
    console.log(this.ListCategoryActive);
    
    this.getAllMenuActiveAndMenuDetail();
    this.Get_product_menu_detail();
  }

  getAllActive() {
    this.product.getAllProductActive().subscribe(
      data => {
        this.contain = data;
        // Delete or add discount if discount > 0
        let i = -1;
        this.contain.forEach(e => {
          this.ListCategoryActive.push(e)
        });
        this.contain.forEach(e => {
          i++;
          if (e.discount > 0) {
            this.ListCategoryActive[i].price = e.price *= ((100 - e.discount) / 100)
          }
          else {
            delete e.discount;
            this.ListCategoryActive[i] = e;
          }
        });
      }

    )
  }
  getAllMenuActiveAndMenuDetail() {
    this.menuService.getAllMenu().subscribe(
      data => {        
        this.listMenuActive = data;
        for (let i = 0; i < this.listMenuActive.length; i++) {
          this.menuService.getAllmenuDetailBymenuID(this.listMenuActive[i].menu_id).subscribe(
            data => {
              // this.ListCategoryDetailActive[i] = data;
              this.ListmenuDetailActive[i] = data;
              this.listMenuandMenuDetail.push(
                {
                  menuName: this.listMenuActive[i].menu_name,
                  menuDetail: this.ListmenuDetailActive[i]
                }
              )
            }
          )
        }

      }


    )
  }
  Get_product_menu_detail() {
    if (this.route.snapshot.paramMap.get("id")) {
      this.menuService.product_menu_detail(this.route.snapshot.paramMap.get("id")).subscribe(
        data => {
          this.contain = data;
          this.contain.forEach(e => {
            console.log(e.product_id);

            this.product.getProductById(e.product_id).subscribe(
              data => {
                console.log(data);

                this.ListCategoryActive.push(data)
              }
            )
          });


        }
      )
    }

    else {
      this.getAllActive();
    }
    
  }

  listOrderInLocal = new BehaviorSubject<Order>(JSON.parse(localStorage.getItem('order'))).value;

  AddtoCartByListproduct(val) {
    console.log(val);
    
    // if (this.isAdd == false) {
    //   //// order.push
    //   // let orderDetail = {
    //   //   "order_id": this.inforProduct.product_id,

    //   //   "product_id": this.inforProduct.product_id,
    //   //   "product_name": this.inforProduct.product_name,
    //   //   "image": this.inforProduct.image,
    //   //   "price": this.inforProduct.price,
    //   //   "discount": this.inforProduct.discount,

    //   //   "order_count": this.quantity,
    //   // }
    //   // this.showAlert = true;
    //   // this.offsau2s();
    //   // console.log(orderDetail);

    //   // this.orderSv.pushOrder(orderDetail);
    //   // this.isAdd = true;
    // }

    // else {
    //   // this.setValueForOrderInListOrderLocal();
    //   console.log(order);

    //   order.forEach(e => {
    //     console.log(e);

    //     if (e.order_id == this.inforProduct.product_id) {
    //       this.showAlert = !this.showAlert;
    //       e.order_count = this.quantity + e.order_count;
    //       this.orderSv.upgradeOrderInLocal(e);

    //       this.offsau2s();

    //     }
    //   })
    // }
  }

  setValueForOrderInListOrderLocal() {
    for (const key in this.listOrderInLocal) {
      if (Object.prototype.hasOwnProperty.call(this.listOrderInLocal, key)) {
        const element = this.listOrderInLocal[key];
        order.push(element)
      }
    }
  }
}