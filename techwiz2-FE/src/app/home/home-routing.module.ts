import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { ListProductByCategory } from './view/product/list-product/list-product-byCategory.component';
import { HomePageComponent } from './view/home-page/home-page.component';
import { ListProductComponent } from './view/product/list-product/list-product.component';
import { ProductDetailComponent } from './view/product/product-detail/product-detail.component';

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
