import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/app/_model/environment';
import { Order, order } from 'src/app/_model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient
  ) { }


  newOrder = order;
  listOrderInLocalRoot = new BehaviorSubject<Order>(JSON.parse(localStorage.getItem('order')));

  listOrderInLocal = new BehaviorSubject<Order>(JSON.parse(localStorage.getItem('order'))).value;

  pushOrder(orderDetail: any) {
    
    if (this.listOrderInLocal == null) {
      order.push(orderDetail);
      localStorage.setItem('order', JSON.stringify(order));
    }
    else {
      this.pushOrderByListorderInLocal();

      for (let i = 0; i < order.length; i++) {

        // check if this product added, call upgradeOrder (count product up)
        if (order[i].order_id == orderDetail.order_id) {

          order[i].order_count = orderDetail.order_count + order[i].order_count;
          this.upgradeOrder(order[i]);
          break;
        }
        // check if order item cuoi cung van ko phai product vua add, thi push vao arr
        else if (i == order.length - 1) {
          order.push(orderDetail);
        }

      };
      this.removeAllOrderInLocal();
      localStorage.setItem('order', JSON.stringify(order));

    }

    this.getAllOrder()
  }

  upgradeOrder(orderDetail: any) {
    for (let i = 0; i < order.length; i++) {
      if (order[i].order_id == orderDetail.order_id) {
        order[i] = orderDetail;
        break;
      }
    }
  }

  upgradeOrderInLocal(orderDetail) {    
    for (let i = 0; i < order.length; i++) {
      // check if this product added, call upgradeOrder (count product up)
      if (order[i].order_id == orderDetail.order_id) {
        console.log(order[i]);
        
        // order[i].order_count = orderDetail.order_count + order[i].order_count;
        console.log(order);
        this.upgradeOrder(order[i]);
        console.log(order);
        break;
      }
    };
    this.removeAllOrderInLocal();
    localStorage.setItem('order', JSON.stringify(order));

  }

  pushOrderByListorderInLocal() {
    for (const key in this.listOrderInLocal) {
      if (Object.prototype.hasOwnProperty.call(this.listOrderInLocal, key)) {
        const element = this.listOrderInLocal[key];
        order.push(element)
      }
    }
  }

  getAllOrder() {
    return this.listOrderInLocal;
  }

  removeAllOrderInLocal() {
    localStorage.removeItem('order');
  }


  CreateOrderInDb(val) {
    return this.http.post(environment.apiUrl + "orders", val);
  }

  getAllOrderIndb() {
    return this.http.get(environment.apiUrl + "orders");
  }

  CreateOrderDetailInDb(val) {
    return this.http.post(environment.apiUrl + "orderDetail", val);
  }
}
