import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/_service/home/category/category.service';
import { ProductService } from 'src/app/_service/home/product/product.service';

@Component({
  selector: 'app-list-category-detail',
  templateUrl: './../list-product/list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductByCategory implements OnInit {

  constructor(
    private category: CategoryService,
    private activatedRoute: ActivatedRoute,
    private product: ProductService
  ) { }
  ListCategoryActive;
  ngOnInit(): void {    
    this.getAllcategoryDetailByCategoryID(this.activatedRoute.snapshot.paramMap.get('id'));
  }
  getAllcategoryDetailByCategoryID(id) {    
    this.product.getAllProductByCategoryDetails(id).subscribe(
      data => {
        const contain = data;
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
