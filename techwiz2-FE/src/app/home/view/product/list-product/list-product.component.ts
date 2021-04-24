import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_service/home/product/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  constructor(
    private productService: ProductService
  ) { }

  ListCategoryActive;
  ngOnInit(): void {
    this.productService.getAllProductActive().subscribe(
      data =>{
        this.ListCategoryActive = data;
        // Delete or add discount if discount > 0
        let i = -1;
        this.ListCategoryActive.forEach(e => {
          i++;
          if (e.discount > 0) {
            console.log(i);

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

}
