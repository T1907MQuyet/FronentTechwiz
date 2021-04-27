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
  ngOnInit(): void {
    // this.getAllproductByMenuID(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getAllMenuActiveAndMenuDetail();
    this.Get_product_menu_detail();
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
  contain;  
  Get_product_menu_detail() {
    this.menuService.product_menu_detail(this.route.snapshot.paramMap.get("id")).subscribe(
      data => {
        this.contain = data;
        this.contain.forEach(e => {
          console.log(e.product_id);
          
          this.product.getProductById(e.product_id).subscribe(
            data => {
              this.ListCategoryActive.push(data)
            }
          )
        });
        

      }
    )
  }
}