import { Location } from '@angular/common';
import { Component } from '@angular/core';
import {
  TestBed,
  inject,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

class AuthServiceStub {
  isAuthenticated() { }
}

@Component({ template: '' })
class StubComponent { }

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    const routes: Routes = [
      { component: StubComponent, path: '401' }
    ];

    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes(routes) ],
      declarations: [ StubComponent ],
      providers: [
        AuthGuard,
        { provide: AuthService, useClass: AuthServiceStub }
      ]
    });
  });

  beforeEach(
    inject(
      [ AuthGuard, AuthService, Router ],
      (_authGuard: AuthGuard, _authService: AuthService, _router: Router) => {
        authGuard = _authGuard;
        authService = _authService;
        router = _router;
      }
    )
  );

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('canActivate()', () => {
    describe('User is authenticated', () => {
      beforeEach(() => {
        spyOn(authService, 'isAuthenticated').and.returnValue(true);
      });

      it('should return `true`', () => {
        expect(authGuard.canActivate()).toEqual(true);
      });
    });

    describe('User is not authenticated', () => {
      beforeEach(() => {
        spyOn(authService, 'isAuthenticated').and.returnValue(false);
      });

      it('should return `false`', () => {
        expect(authGuard.canActivate()).toEqual(false);
      });

      it('should navigate to `/401`', fakeAsync(inject(
        [ Location ],
        (location: Location) => {
          authGuard.canActivate();
          tick();
          expect(location.path()).toEqual('/401');
        }
      )));
    });
  });
});
