import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestApiComponent } from './test-api/test-api.component';

const routes: Routes = [
  {
    path: '', component: TestApiComponent
  },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
