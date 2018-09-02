import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  async,
  ComponentFixture,
  inject,
  TestBed
} from '@angular/core/testing';
import {
  By,
  Meta,
  Title
} from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';

import { ProductListContainerComponent } from './product-list-container.component';
import { Product } from '../shared/product.model';
import { ProductsService } from '../shared/products.service';

class ProductsServiceStub {
  getProducts$() { return of(null); }
}

class ToastrServiceStub {
  clear() { }
  error() { }
}

describe('ProductListContainerComponent', () => {
  const testProducts: Product[] = [
    { description: 'Test product 001. ', id: 'TEST_PRODUCT_001', name: 'Test Product 001' },
    { description: 'Test product 002. ', id: 'TEST_PRODUCT_002', name: 'Test Product 002' },
    { description: 'Test product 003. ', id: 'TEST_PRODUCT_003', name: 'Test Product 003' }
  ];
  let component: ProductListContainerComponent;
  let fixture: ComponentFixture<ProductListContainerComponent>;
  let meta: Meta;
  let productsService: ProductsService;
  let title: Title;
  let toastrService: ToastrService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ ProductListContainerComponent ],
      providers: [
        { provide: ProductsService, useClass: ProductsServiceStub },
        { provide: ToastrService, useClass: ToastrServiceStub }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(
    inject(
      [
        Meta,
        ProductsService,
        Title,
        ToastrService
      ],
      (
        _meta: Meta,
        _productsService: ProductsService,
        _title: Title,
        _toastrService: ToastrService
      ) => {
        meta = _meta;
        productsService = _productsService;
        title = _title;
        toastrService = _toastrService;
      })
  );

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should call #settMeta', () => {
      spyOn((component as any), 'setMeta');
      component.ngOnInit();
      expect((component as any).setMeta).toHaveBeenCalled();
    });

    describe('Products Subscription', () => {
      let getProductsSpy;

      beforeEach(() => {
        getProductsSpy = spyOn(productsService, 'getProducts$');
      });

      it('should subscribe to ProductsService#getProducts$', () => {
        getProductsSpy.and.returnValue(of(null));
        component.ngOnInit();
        expect(productsService.getProducts$).toHaveBeenCalled();
      });

      describe('On products received', () => {
        beforeEach(() => {
          getProductsSpy.and.returnValue(of(testProducts));
        });

        it('should clear products error', () => {
          component.getProductsError = new Error('Test error');
          component.ngOnInit();
          expect(component.getProductsError).toBeFalsy();
        });

        it('should update products', () => {
          component.ngOnInit();
          expect(component.products).toEqual(testProducts);
        });

        it('should set `isLoading` to `false`', () => {
          component.ngOnInit();
          expect(component.isLoading).toEqual(false);
        });
      });

      describe('On error subscribing products', () => {
        const testError = new Error('Test error');
        beforeEach(() => {
          getProductsSpy.and.returnValue(throwError(testError));
        });

        it('should show an error notification', () => {
          spyOn(toastrService, 'error');
          component.ngOnInit();
          expect(toastrService.error).toHaveBeenCalled();
        });

        it('should update products error', () => {
          component.ngOnInit();
          expect(component.getProductsError).toEqual(testError);
        });

        it('should set `isLoading` to `false`', () => {
          component.ngOnInit();
          expect(component.isLoading).toEqual(false);
        });
      });
    });
  });

  describe('#ngOnDestroy', () => {
    it('should unsubscribe products subscription', () => {
      spyOn((component as any), 'unsubscribe');
      component.ngOnDestroy();
      expect((component as any).unsubscribe).toHaveBeenCalledWith((component as any).productsSubscription);
    });

    it('should clear notifications', () => {
      spyOn(toastrService, 'clear');
      component.ngOnDestroy();
      expect(toastrService.clear).toHaveBeenCalled();
    });
  });

  describe('#setMeta', () => {
    it('should set title', () => {
      spyOn(title, 'setTitle');
      (component as any).setMeta();
      expect(title.setTitle).toHaveBeenCalled();
    });

    it('should add meta tags', () => {
      spyOn(meta, 'addTags');
      (component as any).setMeta();
      expect(meta.addTags).toHaveBeenCalled();
    });
  });

  describe('Product list container', () => {
    describe('Platform is server', () => {
      beforeEach(() => {
        component.isPlatformServer = true;
        fixture.detectChanges();
      });

      it('should show a progress spinner container with message "Loading Product List..."', () => {
        const progressSpinnerContainerDebugElement = fixture.debugElement.query(By.css('ax-progress-spinner-container'));
        expect(!!progressSpinnerContainerDebugElement).toBeTruthy();
        expect(progressSpinnerContainerDebugElement.properties['message']).toEqual('Loading Product List...');
      });
    });

    describe('Platform is not server', () => {
      beforeEach(() => {
        component.isPlatformServer = false;
        fixture.detectChanges();
      });

      describe('Component is loading', () => {
        beforeEach(() => {
          component.isLoading = true;
          fixture.detectChanges();
        });

        it('should show a progress spinner with message "Loading Product List..."', () => {
          const progressSpinnerDebugElement = fixture.debugElement.query(By.css('ax-progress-spinner'));
          expect(!!progressSpinnerDebugElement).toBeTruthy();
          expect(progressSpinnerDebugElement.properties['message']).toEqual('Loading Product List...');
        });
      });

      describe('Component is not loading', () => {
        beforeEach(() => {
          component.isLoading = false;
          fixture.detectChanges();
        });

        it('should show an error message when encounter error getting products', () => {
          component.getProductsError = new Error('Test Error');
          fixture.detectChanges();
          const getProductsErrorMessageDebugElement = fixture.debugElement.query(By.css('#message-error-get-products'));
          expect(!!getProductsErrorMessageDebugElement).toBeTruthy();
        });

        it('should show product list only when at least one product exists', () => {
          let productListDebugElement = fixture.debugElement.query(By.css('ax-product-list'));
          expect(!!productListDebugElement).toBeFalsy();

          component.products = testProducts;
          fixture.detectChanges();
          productListDebugElement = fixture.debugElement.query(By.css('ax-product-list'));
          expect(!!productListDebugElement).toBeTruthy();
        });
      });
    });
  });
});
