import { Component, Input } from '@angular/core';

import { Product } from '../shared/product.model';

@Component({
  selector: 'ax-product-list',
  styleUrls: [ './product-list.component.scss' ],
  templateUrl: './product-list.component.html'
})
export class ProductListComponent {
  @Input() products: Product[];
}
