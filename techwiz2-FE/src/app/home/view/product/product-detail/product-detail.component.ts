import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/app/_model/environment';
import { Order, order } from 'src/app/_model/order';
import { OrderService } from 'src/app/_service/home/order/order.service';
import { ProductService } from 'src/app/_service/home/product/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private orderSv: OrderService
  ) { }

  contain;
  listOrderInLocal = new BehaviorSubject<Order>(JSON.parse(localStorage.getItem('order'))).value;
  quantity = 1;
  inforProduct = {
    "product_id": 1,
    "product_name": "",
    "price": 0,
    "discount": 0,
    "descriptions": "",
    "status": 1,
    "priority": 1,
    "image": ""
  }
  showAlert = false;

  ngOnInit(): void {
    this.productService.getProductDetail(this.activatedRoute.snapshot.paramMap.get("id")).subscribe(
      data => {
        this.contain = data;
        this.inforProduct = {
          "product_id": this.contain.product_id,
          "product_name": this.contain.product_name,
          "price": this.contain.price,
          "discount": this.contain.discount,
          "descriptions": this.contain.descriptions,
          "status": this.contain.status,
          "priority": this.contain.priority,
          "image": this.contain.image
        }

        // Delete or add discount if discount > 0
        if (this.inforProduct.discount > 0) {
          this.inforProduct.price = this.inforProduct.price *= ((100 - this.inforProduct.discount) / 100)
        }
        else {
          delete this.inforProduct.discount;
        }

      }
    )

    // for (const key in this.listOrderInLocal) {
    //   if (Object.prototype.hasOwnProperty.call(this.listOrderInLocal, key)) {
    //     const element = this.listOrderInLocal[key];
    //     this.orderSv.pushOrder(element);
        
    //   }
    // }

  }


  plusOrMinus(bl, val) {
    if (bl) {
      this.quantity++;
    }
    else {
      if (this.quantity == 1) {
        return this.quantity;
      }
      else {
        return this.quantity--;
      }
    }
  }

  abs(val) {
    return this.quantity = Math.abs(val);
  }
  isAdd = false;
  AddtoCart() {
    if (this.isAdd == false) {
      // order.push(
      let orderDetail = {
        "order_id": this.inforProduct.product_id,

        "product_id": this.inforProduct.product_id,
        "product_name": this.inforProduct.product_name,
        "image": this.inforProduct.image,
        "price": this.inforProduct.price,
        "discount": this.inforProduct.discount,

        "order_count": this.quantity,
      }
      this.showAlert = true;
      this.offsau2s();
      console.log(orderDetail);
      
      this.orderSv.pushOrder(orderDetail);
      this.isAdd = true;
    }

    else {
      // this.setValueForOrderInListOrderLocal();
      console.log(order);
      
      order.forEach(e => {
        console.log(e);
        
        if (e.order_id == this.inforProduct.product_id) {
          this.showAlert = !this.showAlert;            
            e.order_count = this.quantity + e.order_count;            
            this.orderSv.upgradeOrderInLocal(e);            
          
            this.offsau2s();
          
        }
      })
    }
  }

  offsau2s() {
    setTimeout(() => {
      this.showAlert = false;
    }, 2000);
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
