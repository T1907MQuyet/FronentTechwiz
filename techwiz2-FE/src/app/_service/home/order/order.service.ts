import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { order } from 'src/app/_model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }
  newOrder = order;

  pushOrder(orderDetail: any) {
    if(order.length == 0) {
      order.push(orderDetail);
    }
    else {
      for (let i = 0; i < order.length; i++) {
        if (order[i].order_id == orderDetail.order_id) {

          order[i].order_count = orderDetail.order_count + order[i].order_count;
          this.upgradeOrder(order[i]);
          break;
        }

        else if (i == order.length - 1) {
          order.push(orderDetail);
        }

      };
    }
    
  }

  upgradeOrder(orderDetail: any) {
    for(let i = 0; i < order.length; i++) {
      if (order[i].order_id == orderDetail.order_id) {
        order[i] = orderDetail;
        break;      
      }
    }
  }

  getAllOrder() {
    return this.newOrder;
  }
}
