import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/_service/home/category/category.service';
import { MenuService } from 'src/app/_service/home/menu/menu.service';
import { ProductService } from 'src/app/_service/home/product/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private menuService: MenuService,
    private category: CategoryService
  ) { }
  isMenu = false;
  ListCategoryActive = [];
  listMenuActive;
  ListmenuDetailActive = [];
  listMenuandMenuDetail = [];
  err = '';
  contain;
  ngOnInit(): void {
    this.productService.getAllProductActive().subscribe(
      data => {
        this.contain = data;
        this.contain.forEach(e => {
          this.ListCategoryActive.push(e); this.err = '';
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


    this.getAllMenuActiveAndMenuDetail();
  }

  getAllMenuActiveAndMenuDetail() {
    this.menuService.getAllMenu().subscribe(
      data => {
        this.listMenuActive = data;
        console.log(this.listMenuActive);
        
        for (let i = 0; i < this.listMenuActive.length; i++) {
          console.log(this.listMenuActive[i]);

          this.category.getAllcategoryDetailByCategoryID(this.listMenuActive[i].cate_id).subscribe(
            data => {

              // this.ListCategoryDetailActive[i] = data;
              this.ListmenuDetailActive[i] = data;
              this.listMenuandMenuDetail.push(
                {
                  menuName: this.listMenuActive[i].menu_name,
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
