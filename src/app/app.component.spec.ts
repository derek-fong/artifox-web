import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  async,
  ComponentFixture,
  inject,
  TestBed
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ServiceWorkerModule, SwUpdate } from '@angular/service-worker';
import { of } from 'rxjs';

import { AppComponent } from './app.component';

class SwUpdateStub {
  get isEnabled() { return false; }
  get available() { return of(null); }
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let swUpdate: SwUpdate;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ServiceWorkerModule.register('', { enabled: false })
      ],
      declarations: [ AppComponent ],
      providers: [
        { provide: SwUpdate, useClass: SwUpdateStub }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
  });

  beforeEach(inject([ SwUpdate ], (_swUpdate: SwUpdate) => {
    swUpdate = _swUpdate;
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    describe('Browser Platform', () => {
      describe('Service worker update is enabled', () => {
        beforeEach(() => {
          spyOnProperty(swUpdate, 'isEnabled').and.returnValue(true);
        });

        describe('when update is available', () => {
          let windowConfirmSpy: jasmine.Spy;

          beforeEach(() => {
            windowConfirmSpy = spyOn(window, 'confirm');
            spyOnProperty(swUpdate, 'available').and.returnValue(of(null));
          });

          it('should prompt for reload when new version is available', () => {
            component.ngOnInit();
            expect(window.confirm).toHaveBeenCalled();
          });

          it('should reload page once user confirmed', () => {
            windowConfirmSpy.and.returnValue(true);
            spyOn((component as any), 'reload');
            component.ngOnInit();
            expect((component as any).reload).toHaveBeenCalled();
          });
        });
      });
    });
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
