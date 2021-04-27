import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from 'src/app/_service/home/menu/menu.service';
import { ProductService } from 'src/app/_service/home/product/product.service';

@Component({
    selector: 'app-list-product-result',
    templateUrl: './../list-product.component.html',
    styleUrls: ['./../list-product.component.css']
})
export class ListProductResultComponent implements OnInit {

    constructor(
        private productService: ProductService,
        private menuService: MenuService,
        private route: ActivatedRoute
    ) { }
    isMenu = false;
    ListCategoryActive = [];
    contain;
    err = '';

    listCategoryActive;
    ListcategoryDetailActive = [];
    listCategoryandCategoryDetail = [];
    valuebySearch = this.productService.getValueBySearch();
    ngOnInit(): void {
        this.productService.getAllProductActive().subscribe(
            data => {
                this.contain = data;
                
                this.contain.forEach(e => {
                    if ((e.product_name.toLowerCase().indexOf(this.valuebySearch.name) > -1) &&
                        (e.price > this.valuebySearch.minPrice) &&
                        (e.price < this.valuebySearch.maxPrice)
                    ) {
                        this.ListCategoryActive.push(e);
                        this.err = '';
                    }
                    else {
                        this.err = 'No products matched';
                    }
                });
                // Delete or add discount if discount > 0
                let i = -1;
                this.ListCategoryActive.forEach(e => {
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
        this.getAllMenuActiveAndMenuDetail();
        // this.Get_product_menu_detail();
    }

    Get_product_menu_detail() {
        this.menuService.product_menu_detail(this.route.snapshot.paramMap.get("id")).subscribe(
            data => {
                console.log(data);
                
            }
        )
    }

    getAllMenuActiveAndMenuDetail() {
        this.menuService.getAllMenu().subscribe(
            data => {
                this.listCategoryActive = data;

                for (let i = 0; i < this.listCategoryActive.length; i++) {

                    this.menuService.getAllmenuDetailBymenuID(this.listCategoryActive[i].menu_id).subscribe(
                        data => {

                            // this.ListCategoryDetailActive[i] = data;
                            this.ListcategoryDetailActive[i] = data;
                            this.listCategoryandCategoryDetail.push(
                                {
                                    menuName: this.listCategoryActive[i].menu_name,
                                    menuDetail: this.ListcategoryDetailActive[i]
                                }
                            )
                        }
                    )
                }

            }


        )
    }



}
