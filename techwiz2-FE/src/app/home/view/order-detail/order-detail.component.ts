import { Component, OnInit } from '@angular/core';
import { order } from 'src/app/_model/order';
import { OrderService } from 'src/app/_service/home/order/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  constructor(
    private orderService: OrderService
  ) { }

  listOrder;
  totalPrice = 0;
  ngOnInit(): void {
    this.listOrder = this.orderService.getAllOrder();
    this.listOrder.forEach(e => {
      console.log(e);
      
      this.totalPrice = (e.price * e.order_count) + this.totalPrice;
      // this.totalPrice = this.totalPrice += 
    });
  }

  DeleteAnOrder(order_id) {
    let i = -1;
    order.forEach(e => {
      i++;
      
      if(e.order_id == order_id) {
        if(confirm("Are you ok?")) {
          order.splice(i, 1)
        }
      }
    })
  }

}
