import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { ListProductComponent } from './view/product/list-product/list-product.component';
import { HomePageComponent } from './view/home-page/home-page.component';
import { ListCategoryComponent } from './view/Category/list-category/list-category.component';
import { ListProductByCategory } from './view/product/list-product/list-product-byCategory.component';
import { ProductDetailComponent } from './view/product/product-detail/product-detail.component';
import { RestaurantComponent } from './view/home-page/restaurant/restaurant.component';


@NgModule({
  declarations: [
    HomeComponent, HeaderComponent,
    FooterComponent,
    ListProductComponent, HomePageComponent, ListCategoryComponent,
    ListProductByCategory,
    ProductDetailComponent,
    RestaurantComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule
  ]
})
export class HomeModule { }
