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
import { ListProductByCategory } from './view/product/list-product/categoryCompoent/list-product-byCategory.component';
import { ListProductResultComponent } from './view/product/list-product/categoryCompoent/list-product-result.component';
import { ListProductMenuComponent } from './view/product/list-product/menuComponent/list-product-menu/list-product-menu.component';

import { ProductDetailComponent } from './view/product/product-detail/product-detail.component';
import { RestaurantComponent } from './view/home-page/restaurant/restaurant.component';
import { OrderDetailComponent } from './view/order-detail/order-detail.component';
import { CheckoutComponent } from './view/checkout/checkout.component';
import { LoginComponent } from './authen/login/login.component';
import { RegisterComponent } from './authen/register/register.component';
import { ProfileControllComponent } from './customer/profile-controll/profile-controll.component';
import { PasswordControllComponent } from './customer/password-controll/password-controll.component';
import { OrdersByCustomerComponent } from './customer/orders-by-customer/orders-by-customer.component';
import { EditprofileComponent } from './customer/editprofile/editprofile.component';
import { AboutComponent } from './view/about/about.component';
import { ContactComponent } from './view/contact/contact.component';


@NgModule({
  declarations: [
    HomeComponent, HeaderComponent,
    FooterComponent,
    ListProductComponent, HomePageComponent, ListCategoryComponent,
    ListProductByCategory,
    ProductDetailComponent,
    RestaurantComponent,
    OrderDetailComponent,
    CheckoutComponent,
    LoginComponent,
    RegisterComponent,
    ProfileControllComponent,
    PasswordControllComponent,
    OrdersByCustomerComponent,
    EditprofileComponent,
    AboutComponent,
    ListProductResultComponent,
    ListProductMenuComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
