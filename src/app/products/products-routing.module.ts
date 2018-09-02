import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListContainerComponent } from './product-list-container/product-list-container.component';

const routes: Routes = [
  {
    component: ProductListContainerComponent,
    path: ''
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ProductsRoutingModule { }
