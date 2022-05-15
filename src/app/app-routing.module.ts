import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { ProductListComponent } from './components/admin-panel/product-list/product-list.component';
import { UserListComponent } from './components/admin-panel/user-list/user-list.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

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
        component: UserListComponent,
      },
      {
        path: 'product-list',
        component: ProductListComponent,
      },
      {
        path: 'statistics',
        component: ErrorPageComponent,
      },
    ],
  },
  { path: 'cart', component: ShoppingCartComponent},
  { path: 'error', component: ErrorPageComponent},
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
