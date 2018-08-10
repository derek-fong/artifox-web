import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  async,
  ComponentFixture,
  inject,
  TestBed
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TopToolbarComponent } from './top-toolbar.component';
import { AuthService } from '../../auth/shared/auth.service';

class AuthServiceStub {
  isAuthenticated() { }
  login() { }
  logout() { }
}

describe('TopToolbarComponent', () => {
  let authService: AuthService;
  let component: TopToolbarComponent;
  let fixture: ComponentFixture<TopToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopToolbarComponent ],
      providers: [
        { provide: AuthService, useClass: AuthServiceStub }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(inject([ AuthService ], (_authService: AuthService) => {
    authService = _authService;
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('#isAuthenticated', () => {
    it('should call AuthService#isAuthenticated', () => {
      spyOn(authService, 'isAuthenticated');
      component.isAuthenticated();
      expect(authService.isAuthenticated).toHaveBeenCalled();
    });
  });

  describe('#onToggleSidenav', () => {
    it('should emit `toggleSidenav` event', () => {
      spyOn(component.toggleSidenav, 'emit');
      component.onToggleSidenav();
      expect(component.toggleSidenav.emit).toHaveBeenCalled();
    });
  });

  describe('#onLogin', () => {
    it('should call AuthService#login', () => {
      spyOn(authService, 'login');
      component.onLogin();
      expect(authService.login).toHaveBeenCalled();
    });
  });

  describe('#onLogout', () => {
    it('should call AuthService#logout', () => {
      spyOn(authService, 'logout');
      component.onLogout();
      expect(authService.logout).toHaveBeenCalled();
    });
  });

  describe('Toolbar', () => {
    let toolbarDebugElement: DebugElement;

    beforeEach(() => {
      toolbarDebugElement = fixture.debugElement.query(By.css('mat-toolbar'));
    });

    it('should be created', () => {
      expect(!!toolbarDebugElement).toBeTruthy();
    });

    describe('Sidenav button', () => {
      const sidenavButtonElementId = '#sidenav-button';
      let sidenavButtonDebugElement: DebugElement;

      describe('User is authenticated', () => {
        beforeEach(() => {
          spyOn(component, 'isAuthenticated').and.returnValue(true);
          fixture.detectChanges();
          sidenavButtonDebugElement = toolbarDebugElement.query(By.css(sidenavButtonElementId));
        });

        it('should be created', () => {
          expect(!!sidenavButtonDebugElement).toBeTruthy();
        });

        it('should call #onToggleSidenav on click', () => {
          spyOn(component, 'onToggleSidenav');
          sidenavButtonDebugElement.nativeElement.click();
          expect(component.onToggleSidenav).toHaveBeenCalled();
        });
      });

      describe('User is not authenticated', () => {
        beforeEach(() => {
          spyOn(component, 'isAuthenticated').and.returnValue(false);
          fixture.detectChanges();
          sidenavButtonDebugElement = toolbarDebugElement.query(By.css(sidenavButtonElementId));
        });

        it('should not be created', () => {
          expect(!!sidenavButtonDebugElement).toBeFalsy();
        });
      });
    });

    describe('Logout button', () => {
      const logoutButtonElementId = '#logout-button';
      let logoutButtonDebugElement: DebugElement;

      describe('User is authenticated', () => {
        beforeEach(() => {
          spyOn(component, 'isAuthenticated').and.returnValue(true);
          fixture.detectChanges();
          logoutButtonDebugElement = toolbarDebugElement.query(By.css(logoutButtonElementId));
        });

        it('should be created', () => {
          expect(!!logoutButtonDebugElement).toBeTruthy();
        });

        it('should call #onLogout on click', () => {
          spyOn(component, 'onLogout');
          logoutButtonDebugElement.nativeElement.click();
          expect(component.onLogout).toHaveBeenCalled();
        });
      });

      describe('User is not authenticated', () => {
        beforeEach(() => {
          spyOn(component, 'isAuthenticated').and.returnValue(false);
          fixture.detectChanges();
          logoutButtonDebugElement = toolbarDebugElement.query(By.css(logoutButtonElementId));
        });

        it('should not be created', () => {
          expect(!!logoutButtonDebugElement).toBeFalsy();
        });
      });
    });
  });
});
