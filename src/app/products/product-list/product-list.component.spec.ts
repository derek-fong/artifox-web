import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { By } from '@angular/platform-browser';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductListComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('Product list', () => {
    const productListElementId = 'product-list';

    it('should show when there is one or more product', () => {
      component.products = [
        { description: 'Test product 001. ', id: 'TEST_PRODUCT_001', name: 'Test Product 001' },
        { description: 'Test product 002. ', id: 'TEST_PRODUCT_002', name: 'Test Product 002' },
        { description: 'Test product 003. ', id: 'TEST_PRODUCT_003', name: 'Test Product 003' }
      ];
      fixture.detectChanges();
      const productListDebugElement = fixture.debugElement.query(By.css(`#${productListElementId}`));
      expect(!!productListDebugElement).toBeTruthy();
    });

    it('should not show when there is no product', () => {
      component.products = [ ];
      fixture.detectChanges();
      const productListDebugElement = fixture.debugElement.query(By.css(`#${productListElementId}`));
      expect(!!productListDebugElement).toBeFalsy();
    });
  });
});
