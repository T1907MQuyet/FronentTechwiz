import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order, order } from 'src/app/_model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }
  newOrder = order;
  listOrderInLocalRoot = new BehaviorSubject<Order>(JSON.parse(localStorage.getItem('order')));

  listOrderInLocal = new BehaviorSubject<Order>(JSON.parse(localStorage.getItem('order'))).value;

  pushOrder(orderDetail: any) {
    console.log(this.listOrderInLocalRoot.asObservable());
    
    if (this.listOrderInLocal == null) {
      order.push(orderDetail);
      console.log("11");
      localStorage.setItem('order', JSON.stringify(order));
    }
    else {
      this.pushOrderByListorderInLocal();
console.log("1");

      for (let i = 0; i < order.length; i++) {
        console.log(order[i]);

        // check if this product added, call upgradeOrder (count product up)
        if (order[i].order_id == orderDetail.order_id) {

          order[i].order_count = orderDetail.order_count + order[i].order_count;
          console.log(order);
          this.upgradeOrder(order[i]);
          console.log(order);
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
    console.log(orderDetail);
    
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
    console.log(order);

    return this.listOrderInLocal;
  }

  removeAllOrderInLocal() {
    localStorage.removeItem('order');
  }
}
