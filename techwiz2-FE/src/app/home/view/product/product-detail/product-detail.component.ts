import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/app/_model/environment';
import { order } from 'src/app/_model/order';
import { ProductService } from 'src/app/_service/home/product/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) { }

  contain;

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
      order.push(
        {
          "order_id": this.inforProduct.product_id,

          "product_id": this.inforProduct.product_id,
          "product_name": this.inforProduct.product_name,
          "image": this.inforProduct.image,
          "price": this.inforProduct.price,
          "discount": this.inforProduct.discount,

          "order_count": this.quantity,
        }
      )
      
      this.isAdd = true;
    }

    else {
      order.forEach(e => {
        if (e.order_id == this.inforProduct.product_id) {
          e.order_count = this.quantity + e.order_count;
          
        }
      })
    }



  }
}
