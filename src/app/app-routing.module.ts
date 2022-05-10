import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AddProductComponent } from './components/add-product/add-product.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
  {
    path: 'products',
    component: ProductsPageComponent,
  },
  {
    path: 'admin-panel',
    component: AdminPanelComponent,

    children: [
      {
        path: 'user-list',
        component: ErrorPageComponent,
      },
      {
        path: 'product-list',
        component: AddProductComponent,
      },
      {
        path: 'statistics',
        component: ErrorPageComponent,
      },
    ],
  },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
