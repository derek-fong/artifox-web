import { Component } from '@angular/core';
import { TestBed, inject } from '@angular/core/testing';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from './auth.service';
import { PermissionGuard } from './permission.guard';

class AuthServiceStub {
  hasPermission() { }
}

@Component({ template: '' })
class StubComponent { }

describe('PermissionGuard', () => {
  let authService: AuthService;
  let permissionGuard: PermissionGuard;
  let router: Router;

  beforeEach(() => {
    const routes: Routes = [
      {
        children: [
          { component: StubComponent, path: '403' },
          { component: StubComponent, path: '500' }
        ],
        path: 'error'
      }
    ];

    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes(routes) ],
      declarations: [ StubComponent ],
      providers: [
        PermissionGuard,
        { provide: AuthService, useClass: AuthServiceStub }
      ]
    });
  });

  beforeEach(
    inject(
      [
        AuthService,
        PermissionGuard,
        Router
      ],
      (
        _authService: AuthService,
        _permissionGuard: PermissionGuard,
        _router: Router
      ) => {
        authService = _authService;
        permissionGuard = _permissionGuard;
        router = _router;
      }
    )
  );

  it('should be created', () => {
    expect(!!permissionGuard).toBeTruthy();
  });

  describe('#canActivate', () => {
    describe('Route data contains permission required', () => {
      const requiredPermission = 'TEST_PERMISSION_NAME';
      const route: any = {
        data: { requiredPermission }
      };

      describe('Current user has permission required', () => {
        beforeEach(() => {
          spyOn(authService, 'hasPermission').and.returnValue(true);
        });

        it('should return `true`', () => {
          expect(permissionGuard.canActivate(route)).toEqual(true);
        });
      });

      describe('Current user does not have permission required', () => {
        beforeEach(() => {
          spyOn(authService, 'hasPermission').and.returnValue(false);
        });

        it('should navigate to `/error/403`', () => {
          spyOn(router, 'navigate');
          permissionGuard.canActivate(route);
          expect(router.navigate).toHaveBeenCalledWith(['/error/403']);
        });

        it('should return `false`', () => {
          expect(permissionGuard.canActivate(route)).toEqual(false);
        });
      });
    });

    describe('Route data does not contain permission required', () => {
      const invalidRoute: any = {
        data: {
          otherProp: 'OTHER_VALUE'
        }
      };

      it('should navigate to `/error/500`', () => {
        spyOn(router, 'navigate');
        permissionGuard.canActivate(invalidRoute);
        expect(router.navigate).toHaveBeenCalledWith(['/error/500']);
      });

      it('should return `false`', () => {
        expect(permissionGuard.canActivate(invalidRoute)).toEqual(false);
      });
    });
  });
});
