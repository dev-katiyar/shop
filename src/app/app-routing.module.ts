import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminModule } from './admin/admin.module';
import { LoginComponent } from './core/components/login/login.component';
import { ProductsComponent } from './shopping/components/products/products.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'login', component: LoginComponent },

  { path: 'admin', loadChildren: () => AdminModule},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
