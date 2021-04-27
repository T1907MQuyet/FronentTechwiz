import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from 'src/app/_service/home/menu/menu.service';
import { ProductService } from 'src/app/_service/home/product/product.service';

@Component({
  selector: 'app-list-product-menu',
  templateUrl: './../../list-product.component.html',
  styleUrls: ['./../../list-product.component.css']
})
export class ListProductMenuComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private product: ProductService,
    private menuService: MenuService,
    private route: ActivatedRoute

  ) { }
  isMenu = true;
  ListCategoryActive = [];
  err = '';
  listMenuActive;
  ListmenuDetailActive = [];
  listMenuandMenuDetail = [];
  contain;

  ngOnInit(): void {
    // this.getAllActive();
    console.log(this.ListCategoryActive);
    
    this.getAllMenuActiveAndMenuDetail();
    this.Get_product_menu_detail();
  }

  getAllActive() {
    this.product.getAllProductActive().subscribe(
      data => {
        this.contain = data;
        // Delete or add discount if discount > 0
        let i = -1;
        this.contain.forEach(e => {
          this.ListCategoryActive.push(e)
        });
        this.contain.forEach(e => {
          i++;
          if (e.discount > 0) {
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
    this.menuService.getAllMenu().subscribe(
      data => {        
        this.listMenuActive = data;
        for (let i = 0; i < this.listMenuActive.length; i++) {
          this.menuService.getAllmenuDetailBymenuID(this.listMenuActive[i].menu_id).subscribe(
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
  Get_product_menu_detail() {
    if (this.route.snapshot.paramMap.get("id")) {
      this.menuService.product_menu_detail(this.route.snapshot.paramMap.get("id")).subscribe(
        data => {
          this.contain = data;
          this.contain.forEach(e => {
            console.log(e.product_id);

            this.product.getProductById(e.product_id).subscribe(
              data => {
                console.log(data);

                this.ListCategoryActive.push(data)
              }
            )
          });


        }
      )
    }

    else {
      this.getAllActive();
    }
    
  }
}