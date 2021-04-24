import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

}
