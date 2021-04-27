import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/_service/home/category/category.service';
import { MenuService } from 'src/app/_service/home/menu/menu.service';
import { ProductService } from 'src/app/_service/home/product/product.service';

@Component({
  selector: 'app-list-category-detail',
  templateUrl: './../list-product.component.html',
  styleUrls: ['./../list-product.component.css']
})
export class ListProductByCategory implements OnInit {

  constructor(
    private category: CategoryService,
    private activatedRoute: ActivatedRoute,
    private product: ProductService,
    private menuService: MenuService
  ) { }
  isMenu = false;
  contain;
  ListCategoryActive = [];
  err = '';
  listMenuActive;
  ListmenuDetailActive = [];
  listMenuandMenuDetail = [];
  ngOnInit(): void {
    this.getAllcategoryDetailByCategoryID(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getAllMenuActiveAndMenuDetail();
  }
  getAllcategoryDetailByCategoryID(id) {
    this.product.getAllProductByCategoryDetails(id).subscribe(
      data => {
        this.contain = data;

        this.contain.forEach(e => {
          this.ListCategoryActive.push(e)
        });
        

        // Delete or add discount if discount > 0
        let i = -1;
        this.contain.forEach(e => {
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

  getAllMenuActiveAndMenuDetail() {
    this.category.getAllcategoryActive().subscribe(
      data => {
        this.listMenuActive = data;
        console.log(this.listMenuActive);

        for (let i = 0; i < this.listMenuActive.length; i++) {

          this.category.getAllcategoryDetailByCategoryID(this.listMenuActive[i].cate_id).subscribe(
            data => {              
              // this.ListCategoryDetailActive[i] = data;
              this.ListmenuDetailActive[i] = data;
              
              this.listMenuandMenuDetail.push(
                {
                  menuName: this.listMenuActive[i].cate_name,
                  menuDetail: this.ListmenuDetailActive[i]
                }
              )

            }
          )
        }
        

      }


    )
  }
}
