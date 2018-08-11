import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ServiceWorkerModule.register('', { enabled: false }) ],
      declarations: [ AppComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('Top toolbar', () => {
    let topToolbarDebugElement: DebugElement;

    beforeEach(() => {
      topToolbarDebugElement = fixture.debugElement.query(By.css('ax-top-toolbar'));
    });

    it('should be created', () => {
      expect(!!topToolbarDebugElement).toBeTruthy();
    });
  });

  describe('Sidenav container', () => {
    let sidenavContainerDebugElement: DebugElement;

    beforeEach(() => {
      sidenavContainerDebugElement = fixture.debugElement.query(By.css('mat-sidenav-container'));
    });

    it('should be created', () => {
      expect(!!sidenavContainerDebugElement).toBeTruthy();
    });

    describe('Sidenav', () => {
      let sidenavDebugElement: DebugElement;

      beforeEach(() => {
        sidenavDebugElement = sidenavContainerDebugElement.query(By.css('mat-sidenav'));
      });

      it('should be created', () => {
        expect(!!sidenavDebugElement).toBeTruthy();
      });
    });

    describe('Sidenav content', () => {
      let sidenavContentDebugElement: DebugElement;

      beforeEach(() => {
        sidenavContentDebugElement = sidenavContainerDebugElement.query(By.css('mat-sidenav-content'));
      });

      it('should be created', () => {
        expect(!!sidenavContentDebugElement).toBeTruthy();
      });

      it('should contain `router-outlet`', () => {
        expect(!!sidenavContentDebugElement.query(By.css('router-outlet'))).toBeTruthy();
      });
    });
  });
});
