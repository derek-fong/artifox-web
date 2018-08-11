import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  async,
  ComponentFixture,
  inject,
  TestBed
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { SidenavComponent } from './sidenav.component';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ SidenavComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('#onNavigate', () => {
    const path = 'test_path';
    let router: Router;

    beforeEach(inject([ Router ], (_router: Router) => {
      router = _router;
      component.sidenavElement = { close: () => {} } as any;
      spyOn(router, 'navigate');
    }));

    it('should navigate to path specified', () => {
      component.onNavigate(path);
      expect(router.navigate).toHaveBeenCalledWith([ path ]);
    });

    it('should call `sidenavElement#close`', () => {
      spyOn(component.sidenavElement, 'close');
      component.onNavigate(path);
      expect(component.sidenavElement.close).toHaveBeenCalled();
    });
  });

  describe('Nav list', () => {
    let navListDebugElement: DebugElement;

    beforeEach(() => {
      navListDebugElement = fixture.debugElement.query(By.css('mat-nav-list'));
    });

    it('should be created', () => {
      expect(!!navListDebugElement).toBeTruthy();
    });

    describe('`Home` list item', () => {
      let homeListItemDebugElement: DebugElement;

      beforeEach(() => {
        homeListItemDebugElement = navListDebugElement.query(By.css('#home-list-item'));
      });

      it('should be created', () => {
        expect(!!homeListItemDebugElement).toBeTruthy();
      });

      it('should navigate to index page on click', () => {
        spyOn(component, 'onNavigate');
        homeListItemDebugElement.nativeElement.click();
        expect(component.onNavigate).toHaveBeenCalledWith('');
      });
    });

    describe('`Dashboard` list item', () => {
      let dashboardListItemDebugElement: DebugElement;

      beforeEach(() => {
        dashboardListItemDebugElement = navListDebugElement.query(By.css('#dashboard-list-item'));
      });

      it('should be created', () => {
        expect(!!dashboardListItemDebugElement).toBeTruthy();
      });

      it('should navigate to `/dashboard` on click', () => {
        spyOn(component, 'onNavigate');
        dashboardListItemDebugElement.nativeElement.click();
        expect(component.onNavigate).toHaveBeenCalledWith('/dashboard');
      });
    });
  });
});
