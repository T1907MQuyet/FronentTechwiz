import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/_service/home/category/category.service';
import { ProductService } from 'src/app/_service/home/product/product.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(
    private category: CategoryService,
    private formBuild: FormBuilder,
    private productService: ProductService,
    private rout: Router
    ) { }

  ListCategoryActive;
  ListCategoryDetailActive = [];
  formSearch: FormGroup;

  listCategoryandCateDetail = [
    {
      categoryName: '',
      categoryDetail: []
    }
  ]
  maxPriceInDb = 100;

  ngOnInit(): void {
    this.getAllcategoryActive();
    this.getAllProductActive();
    

    this.formSearch = this.formBuild.group({
      search: [null],
      minPrice: [0],
      maxPrice: [0]
    })
  }

  getAllcategoryActive() {
    this.category.getAllcategoryActive().subscribe(
      data => {
        this.ListCategoryActive = data;
        for (let i = 0; i < this.ListCategoryActive.length; i++) {

          this.category.getAllcategoryDetailByCategoryID(this.ListCategoryActive[i].cate_id).subscribe(
            data => {
              this.ListCategoryDetailActive[i] = data;
              this.listCategoryandCateDetail.push(
                {
                  categoryName: this.ListCategoryActive[i].cate_name,
                  categoryDetail: this.ListCategoryDetailActive[i]
                }
              )
            }
          )
        }

      }
    )
  }

  getAllProductActive() {
    this.productService.getAllProductActive().subscribe(
      data => {
        this.ListCategoryActive = data;
        // Delete or add discount if discount > 0
        let i = -1;
        let maxPriceInDb = 0;
        this.ListCategoryActive.forEach(e => {
          i++;
          if (e.price > maxPriceInDb) {
            maxPriceInDb = e.price;
            this.formSearch.controls.maxPrice.patchValue(maxPriceInDb);
          }
          else {
            
          }
        });
      }

    )
  }


  onSearch(val) {
    console.log(val);
    
    this.productService.setValueBySearch(val.search, val.minPrice, val.maxPrice);
    this.rout.navigate(["/list-product-result"]);
  }
}
