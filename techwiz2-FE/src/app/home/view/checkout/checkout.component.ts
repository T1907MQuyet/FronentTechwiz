import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/_service/Authentication.Service';
import { OrderService } from 'src/app/_service/home/order/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(
    private authen: AuthenticationService,
    private orderService: OrderService,
    private formBuilder: FormBuilder
  ) { }
  listOrder = [];
  selected = true;
  formCheckout: FormGroup;
  totalPrice = 0;
  succesAlert = false;

  isDisable = false; order_id = 0;

  ngOnInit(): void {
    let i = -1;
    // get all item in order list in local
    for (const key in this.orderService.listOrderInLocal) {
      i++;
      if (Object.prototype.hasOwnProperty.call(this.orderService.listOrderInLocal, key)) {
        const element = this.orderService.listOrderInLocal[key];
        element.id = i;
        this.listOrder.push(element);
      }
    }

    // caculatosr total price
    this.listOrder.forEach(e => {
      this.totalPrice = (e.price * e.order_count) + this.totalPrice;
    });
    this.formCheckoutFunciton();

    this.getOrderIDLengthInDb(); // goi de lay id cuoi cug de biet id gan vao orderDetail
  }

  formCheckoutFunciton() {
    this.formCheckout = this.formBuilder.group({
      fullname: ['', [Validators.required, Validators.minLength(5), Validators.pattern("^[a-zA-z ]*$")]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      payment: ['', [Validators.required]],
      note: ['']
    })
  }
  get formCheckoutF() { return this.formCheckout.controls; }

  clickisDis = false;
  // (1)
  createOrder(val) {
    // (2)    
    if (this.formCheckout.status != 'INVALID') {
      let data = {
        "fullname": val.fullname,
        "order_email": val.email,
        "order_address": val.address,
        "order_note": val.note,
        "status": 1,
        "payment": val.payment,
        "total_price": this.totalPrice,

        "customer": {
          "customer_id": this.authen.currentUserValue.customer_id
        }
      }

      this.orderService.CreateOrderInDb(data).subscribe(
        data => {
          if (this.createOrderDetail()) {
            localStorage.removeItem('order');
            this.succesAlert = true;
          }
        }
      )

      this.clickisDis = false;
    }
    else {
      this.formCheckoutF.fullname.errors.required = true;
      this.formCheckoutF.email.errors.required = true;
      this.formCheckoutF.address.errors.required = true;
      this.formCheckoutF.payment.errors.required = true;
      this.clickisDis = true;
    }
  }

  createOrderDetail() {

    let currentOrderIDInDb = this.order_id;

    try {
      this.listOrder.forEach(e => {
        let data = {
          "quantity": e.order_count,
          "price": e.price,
          "product_id": e.product_id,
          "order_id": currentOrderIDInDb += 1
        }
        this.orderService.CreateOrderDetailInDb(data).subscribe(
          () => {
            console.log(currentOrderIDInDb);

          }
        )
        currentOrderIDInDb -= 1;
      })
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }




  getOrderIDLengthInDb() {
    this.orderService.getAllOrderIndb().subscribe(
      data => {
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            const element = data[key];
            this.order_id++;
          }
        }
      }
    )
  }
}
