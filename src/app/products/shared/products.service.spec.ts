import { TestBed, inject } from '@angular/core/testing';
import { Apollo } from 'apollo-angular';
import { of, throwError } from 'rxjs';

import { Product } from './product.model';
import { ProductsService } from './products.service';

class ApolloStub {
  subscribe() { }
  watchQuery() { }
}

describe('ProductsService', () => {
  let apollo: Apollo;
  let productsService: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductsService,
        { provide: Apollo, useClass: ApolloStub }
      ]
    });
  });

  beforeEach(
    inject(
      [
        Apollo,
        ProductsService
      ],
      (
        _apollo: Apollo,
        _productsService: ProductsService
      ) => {
        apollo = _apollo;
        productsService = _productsService;
      }
    )
  );

  it('should be created', () => {
    expect(productsService).toBeTruthy();
  });

  describe('#getProductRegisteredSubscription$', () => {
    let apolloSubscribeSpy: jasmine.Spy;

    beforeEach(() => {
      apolloSubscribeSpy = spyOn(apollo, 'subscribe');
    });

    describe('On product registered', () => {
      const testProduct: Product = { description: 'Test product 001. ', id: 'TEST_PRODUCT_001', name: 'Test Product 001'};
      const payload = { data: { productRegistered: testProduct } };

      beforeEach(() => {
        apolloSubscribeSpy.and.returnValue(of(payload));
      });

      it('should emit registered product', () => {
        const productRegisteredSubscription = productsService.getProductRegisteredSubscription$().subscribe(
          (product: Product) => expect(product).toEqual(testProduct)
        );

        productRegisteredSubscription.unsubscribe();
      });
    });

    describe('On error subscribing product registration', () => {
      const testError = new Error('Test error');

      beforeEach(() => {
        apolloSubscribeSpy.and.returnValue(throwError(testError));
      });

      it('should emit an error', () => {
        const productRegisteredSubscription = productsService.getProductRegisteredSubscription$().subscribe({
          error: (error: Error) => expect(error).toEqual(testError)
        });

        productRegisteredSubscription.unsubscribe();
      });
    });
  });

  describe('#getPreoducts', () => {
    let apolloWatchQuerySpy: jasmine.Spy;

    beforeEach(() => {
      apolloWatchQuerySpy = spyOn(apollo, 'watchQuery');
    });

    describe('On products exists', () => {
      const testProducts: Product[] = [
        { description: 'Test product 001. ', id: 'TEST_PRODUCT_001', name: 'Test Product 001'},
        { description: 'Test product 002. ', id: 'TEST_PRODUCT_002', name: 'Test Product 002'},
        { description: 'Test product 003. ', id: 'TEST_PRODUCT_003', name: 'Test Product 003'}
      ];

      beforeEach(() => {
        apolloWatchQuerySpy.and.returnValue({ valueChanges: of({ data : { products: testProducts } }) });
      });

      it('should emit products', () => {
        const getProductsSubscription = productsService.getProducts$().subscribe(
          (products: Product[]) => expect(products).toEqual(testProducts)
        );
        getProductsSubscription.unsubscribe();
      });
    });

    describe('On error getting products', () => {
      const testError = new Error('Test error');

      beforeEach(() => {
        apolloWatchQuerySpy.and.returnValue({ valueChanges: throwError(testError) });
      });

      it('should emit an error', () => {
        const getProductsSubscription = productsService.getProducts$().subscribe({
          error: (error: Error) => expect(error).toEqual(testError)
        });
        getProductsSubscription.unsubscribe();
      });
    });
  });
});
