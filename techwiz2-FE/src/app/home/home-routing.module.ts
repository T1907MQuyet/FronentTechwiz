import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { ListProductByCategory } from './view/product/list-product/list-product-byCategory.component';
import { HomePageComponent } from './view/home-page/home-page.component';
import { ListProductComponent } from './view/product/list-product/list-product.component';
import { ProductDetailComponent } from './view/product/product-detail/product-detail.component';
import { OrderDetailComponent } from './view/order-detail/order-detail.component';
import { LoginComponent } from './authen/login/login.component';
import { RegisterComponent } from './authen/register/register.component';
import { ProfileControllComponent } from './customer/profile-controll/profile-controll.component';
import { EditprofileComponent } from './customer/editprofile/editprofile.component';
import { PasswordControllComponent } from './customer/password-controll/password-controll.component';
import { OrdersByCustomerComponent } from './customer/orders-by-customer/orders-by-customer.component';
import { AuthGuardGuard } from '../_helpers/auth.guard';
import { CheckoutComponent } from './view/checkout/checkout.component';
import {AboutComponent} from './view/about/about.component';
import {ContactComponent} from './view/contact/contact.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [{
      path: '', component: HomePageComponent,
    },
    {
      path: 'list-product', component: ListProductComponent,
    },
    {
      path: 'category/category-detail/id/:id', component: ListProductByCategory
    },
    {
      path: 'product-detail/id/:id', component: ProductDetailComponent
    },
    {
      path: 'order', component: OrderDetailComponent
    },
      {
        canActivate: [AuthGuardGuard],
        path: 'checkout', component: CheckoutComponent
      },
    {
      path: 'login', component: LoginComponent
    },
      {
        path: 'about', component: AboutComponent
      },
      {
        path: 'contact', component: ContactComponent
      },
    {
      path: 'register', component: RegisterComponent
    },
    {
      canActivate: [AuthGuardGuard],
      path: 'profile', component: ProfileControllComponent,
      children: [
        {
          path: '', component: EditprofileComponent
        },
        {
          path: 'edit', component: EditprofileComponent
        },
        {
          path: 'list-order', component: OrdersByCustomerComponent
        },
        {
          path: 'change-pass', component: PasswordControllComponent
        }
      ]
    },


    {
      path: '**', component: HomePageComponent,
    }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
