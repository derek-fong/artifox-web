import { NgModule } from '@angular/core';
import {MatListModule} from '@angular/material/list';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductListContainerComponent } from './product-list-container/product-list-container.component';
import { ProductsService } from './shared/products.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    MatListModule,
    ProductsRoutingModule,
    SharedModule
  ],
  declarations: [
    ProductListComponent,
    ProductListContainerComponent
  ],
  providers: [ ProductsService ]
})
export class ProductsModule { }
