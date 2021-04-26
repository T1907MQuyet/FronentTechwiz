import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { order } from 'src/app/_model/order';
import { User } from 'src/app/_model/User';
import { AuthenticationService } from 'src/app/_service/Authentication.Service';
import { OrderService } from 'src/app/_service/home/order/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  constructor(
    private orderService: OrderService,
    private authentication: AuthenticationService
  ) { }

  listOrder = [];
  isLogin = false;
  totalPrice = 0;
  ngOnInit(): void {
    // Check login true false
    let checkLogin = this.authentication.currentUserValue;
    if (checkLogin) {
      this.isLogin = true;
    }
    else {
      this.isLogin = false;
    }

    // loop order in localstore
    let i = -1;
    for (const key in this.orderService.listOrderInLocal) {
      i++;
      if (Object.prototype.hasOwnProperty.call(this.orderService.listOrderInLocal, key)) {
        const element = this.orderService.listOrderInLocal[key];
        element.id = i;
        this.listOrder.push(element);
      }
    }

    this.listOrder.forEach(e => {
      this.totalPrice = (e.price * e.order_count) + this.totalPrice;
    });
  }

  DeleteAnOrder(order_id) {
    for (let i = 0; i < this.listOrder.length; i++) {
      if (this.listOrder[i].id == order_id.id) {
        if (confirm("Are you ok?")) {
          this.listOrder.splice(i, 1);

          this.totalPrice = this.totalPrice - (order_id.price * order_id.order_count);

          this.removeAllOrderInLocal();
          localStorage.setItem('order', JSON.stringify(this.listOrder));
          break;
        }
      }
    }
  }

  removeAllOrderInLocal() {
    localStorage.removeItem('order');
  }

}
