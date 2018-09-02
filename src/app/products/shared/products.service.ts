import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from './product.model';

@Injectable()
export class ProductsService {

  constructor(private apollo: Apollo) { }

  /**
   * Get product registered subscription.
   * @returns {Observable<Product>} - RxJS Observable, with registered product.
   */
  getProductRegisteredSubscription$(): Observable<Product> {
    const query = gql`
      subscription productRegistered {
        productRegistered {
          id
          name
          description
        }
      }
    `;

    return this.apollo.subscribe({ query })
      .pipe(
        map(({ data }) => {
          let result: Product;

          /* istanbul ignore else */
          if (data && Object.prototype.hasOwnProperty.call(data, 'productRegistered')) {
            result = data.productRegistered;
          }

          return result;
        })
      );
  }

  /**
   * Get products.
   * @returns {Observable<Product[]>} - RxJS Observable; which completes with products.
   */
  getProducts$(): Observable<Product[]> {
    const query = gql`
      query Products {
        products {
          description
          id
          name
        }
      }
    `;

    return this.apollo
      .watchQuery<Product[]>({ query })
      .valueChanges
      .pipe(map((result: any) => result.data && result.data.products));
  }
}
