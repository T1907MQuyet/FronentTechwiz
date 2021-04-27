import { Component, OnInit } from '@angular/core';
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
    private menuService: MenuService
  ) { }
  isMenu = false;
  ListCategoryActive;
  listMenuActive;
  ListmenuDetailActive = [];
  listMenuandMenuDetail = [];
  err = '';
  ngOnInit(): void {
    this.productService.getAllProductActive().subscribe(
      data => {
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


    this.getAllMenuActiveAndMenuDetail();
  }

  getAllMenuActiveAndMenuDetail() {
    this.menuService.getAllMenu().subscribe(
      data => {
        this.listMenuActive = data;
        console.log(this.listMenuActive);
        
        for (let i = 0; i < this.listMenuActive.length; i++) {
          console.log(this.listMenuActive[i]);

          this.menuService.getAllmenuDetailBymenuID(this.listMenuActive[i].menu_id).subscribe(
            data => {
              console.log(data);

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
