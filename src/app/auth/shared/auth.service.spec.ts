import { Location } from '@angular/common';
import {
  fakeAsync,
  inject,
  TestBed,
  tick
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Apollo } from 'apollo-angular';
import { Auth0DecodedHash } from 'auth0-js';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from './auth.service';

class ApolloStub {
  getClient() {
    return {
      resetStore() { }
    };
  }
}

class ToastrServiceStub {
  error() { }
}

describe('AuthService', () => {
  let apollo: Apollo;
  let authService: AuthService;
  let location: Location;
  let router: Router;
  let toastrService: ToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [
        AuthService,
        { provide: Apollo, useClass: ApolloStub },
        { provide: ToastrService, useClass: ToastrServiceStub }
      ]
    });
  });

  beforeEach(
    inject(
      [
        Apollo,
        AuthService,
        Location,
        Router,
        ToastrService
      ],
      (
        _apollo: Apollo,
        _authService: AuthService,
        _location: Location,
        _router: Router,
        _toastrService: ToastrService
      ) => {
        apollo = _apollo,
        authService = _authService;
        location = _location;
        router = _router;
        toastrService = _toastrService;
      }
    )
  );

  beforeEach(() => {
    spyOn((authService as any), 'reload');
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('#getIdToken', () => {
    it('should get ID token from local storage', () => {
      spyOn(localStorage, 'getItem');
      authService.getIdToken();
      expect(localStorage.getItem).toHaveBeenCalledWith('id_token');
    });
  });

  describe('#handleAuthentication', () => {
    it('should call WebAuth#parseHash', () => {
      spyOn((authService as any).webAuth, 'parseHash');
      authService.handleAuthentication();
      expect((authService as any).webAuth.parseHash).toHaveBeenCalled();
    });
  });

  describe('#hasPermission', () => {
    describe('Valid permission name', () => {
      const permissionName = 'TEST_PERMISSION_NAME';
      let getDecodedIdTokenSpy;

      beforeEach(() => {
        getDecodedIdTokenSpy = spyOn((authService as any), 'getDecodedIdToken');
      });

      describe('ID Token is defined', () => {
        const appMetadataName = 'http://testNamespace/app_metadata';
        let token;

        beforeEach(() => {
          token = { };
          getDecodedIdTokenSpy.and.returnValue(token);
          spyOn((authService as any), 'getAppMetadataPropertyName').and.returnValue(appMetadataName);
        });

        describe('Valid `app_metadata` property name', () => {
          beforeEach(() => {
            token[appMetadataName] = { };
            getDecodedIdTokenSpy.and.returnValue(token);
          });

          describe('`app_metadata` has `authorization` property', () => {
            beforeEach(() => {
              token[appMetadataName] = {
                'authorization': { }
              };
              getDecodedIdTokenSpy.and.returnValue(token);
            });

            describe('`authorization` object has `permissions` property', () => {
              beforeEach(() => {
                token[appMetadataName] = {
                  'authorization': {
                    'permissions': [ ]
                  }
                };
                getDecodedIdTokenSpy.and.returnValue(token);
              });

              describe('Token has permission specified', () => {
                beforeEach(() => {
                  token[appMetadataName] = {
                    'authorization': {
                      'permissions': [ permissionName, 'OTHER_PERMISSION' ]
                    }
                  };
                  getDecodedIdTokenSpy.and.returnValue(token);
                });

                it('should return `true`', () => {
                  expect(authService.hasPermission(permissionName)).toEqual(true);
                });
              });

              describe('token does not have permission specified', () => {
                beforeEach(() => {
                  token[appMetadataName] = {
                    'authorization': {
                      'permissions': [ 'OTHER_PERMISSION_1', 'OTHER_PERMISSION_2' ]
                    }
                  };
                  getDecodedIdTokenSpy.and.returnValue(token);
                });

                it('should return `false`', () => {
                  expect(authService.hasPermission(permissionName)).toEqual(false);
                });
              });
            });

            describe('`authorization` object does not have `permission` property', () => {
              beforeEach(() => {
                token[appMetadataName] = {
                  'authorization': {
                    'otherProp': 'OTHER_VALUE'
                  }
                };
                getDecodedIdTokenSpy.and.returnValue(token);
              });

              it('should return `false`', () => {
                expect(authService.hasPermission(permissionName)).toEqual(false);
              });
            });
          });

          describe('`app_metadata` does not have `authorization` property', () => {
            beforeEach(() => {
              token[appMetadataName] = { 'otherProp': 'OTHER_VALUE' };
              getDecodedIdTokenSpy.and.returnValue(token);
            });

            it('should return `false`', () => {
              expect(authService.hasPermission(permissionName)).toEqual(false);
            });
          });
        });

        describe('Invalid `app_metadata` property name', () => {
          beforeEach(() => {
            const invalidAppMetadataName = 'invalidAppMetadataName';

            token[invalidAppMetadataName] = { 'SOME_PROP': 'SOME_VALUE' };
            getDecodedIdTokenSpy.and.returnValue(token);
          });

          it('should return `false', () => {
            expect(authService.hasPermission(permissionName)).toEqual(false);
          });
        });
      });

      describe('ID Token is not defined', () => {
        beforeEach(() => {
          getDecodedIdTokenSpy.and.returnValue(null);
        });

        it('should return `false`', () => {
          expect(authService.hasPermission(permissionName)).toEqual(false);
        });
      });
    });

    describe('Invalid permission name', () => {
      const invalidPermissionName: string = null;

      it('should return `false`', () => {
        expect(authService.hasPermission(invalidPermissionName)).toEqual(false);
      });
    });
  });

  describe('#isAuthenticated', () => {
    it('should return `true` if user authentication is not expired', () => {
      const expiresAt = new Date().getTime() + 100000;

      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(expiresAt));
      expect(authService.isAuthenticated()).toEqual(true);
    });

    it('should return `false` if user authentication has expired', () => {
      const expiresAt = new Date().getTime() * -1;

      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(expiresAt));
      expect(authService.isAuthenticated()).toEqual(false);
    });

    it('should return `false` if user user authentication expiry date is undefined', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);
      expect(authService.isAuthenticated()).toEqual(false);
    });
  });

  describe('#login', () => {
    it('should call `WebAuth#authorize`', () => {
      spyOn((authService as any).webAuth, 'authorize');
      authService.login();
      expect((authService as any).webAuth.authorize).toHaveBeenCalled();
    });
  });

  describe('#logout', () => {
    it('should remove `access_token` from local storage', () => {
      spyOn(localStorage, 'removeItem');
      authService.logout();
      expect(localStorage.removeItem).toHaveBeenCalledWith('access_token');
    });

    it('should remove `id_token` from local storage', () => {
      spyOn(localStorage, 'removeItem');
      authService.logout();
      expect(localStorage.removeItem).toHaveBeenCalledWith('id_token');
    });

    it('should remove `expires_at` from local storage', () => {
      spyOn(localStorage, 'removeItem');
      authService.logout();
      expect(localStorage.removeItem).toHaveBeenCalledWith('expires_at');
    });

    it('should clear Apollo caches', () => {
      spyOn(apollo, 'getClient').and.returnValue({ resetStore: () => { } });
      spyOn(apollo.getClient(), 'resetStore');
      authService.logout();
      expect(apollo.getClient().resetStore).toHaveBeenCalled();
    });

    it('should navigate to `/`', fakeAsync(() => {
      authService.logout();
      tick();
      expect(location.path()).toEqual('/');
    }));
  });

  describe('#getAppMetadataPropertyName', () => {
    it('should return `app_metadata` property name', () => {
      expect((authService as any).getAppMetadataPropertyName()).toBeDefined();
    });
  });

  describe('#getDecodedIdToken', () => {
    describe('String ID token is defined', () => {
      describe('Valid ID token', () => {
        const payload = {
          sub: '1234567890',
          name: 'Test User'
        };

        beforeEach(() => {
          const idToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlc3QgVXNlciJ9.fhmKwGJQt-KgGcjEjeZz9Ghy79_95R2FsMBtVl2YVuo';

          spyOn(localStorage, 'getItem').and.returnValue(idToken);
        });

        it('should return decoded ID token', () => {
          expect((authService as any).getDecodedIdToken()).toEqual(payload);
        });
      });

      describe('Invalid ID token', () => {
        beforeEach(() => {
          const invalidIdToken = 'INVALID_ID_TOKEN';

          spyOn(localStorage, 'getItem').and.returnValue(invalidIdToken);
        });

        it('should return `null`', () => {
          const invalidDecidedToken = (authService as any).getDecodedIdToken();
          expect(invalidDecidedToken).toEqual(null);

        });

        it('should show an error toast', () => {
          spyOn(toastrService, 'error');
          (authService as any).getDecodedIdToken();
          expect(toastrService.error).toHaveBeenCalledWith('Invalid ID Token. ');
        });
      });
    });

    describe('String ID token is undefined', () => {
      beforeEach(() => {
        spyOn(localStorage, 'getItem').and.returnValue(null);
      });

      it('should return `null`', () => {
        expect((authService as any).getDecodedIdToken()).toEqual(null);
      });
    });
  });

  describe('#getTokenExpiresAt', () => {
    it('should return token expiry in string format', () => {
      expect((authService as any).getTokenExpiresAt(123)).toBeDefined();
    });
  });

  describe('#getAuthCallback', () => {
    describe('Valid decoded hash', () => {
      const tokenExpiresIn = new Date().getTime();
      const auth0DecodedHash: Auth0DecodedHash = {
        accessToken: 'TEST_ACCESS_TOKEN',
        expiresIn: tokenExpiresIn,
        idToken: 'TEST_ID_TOKEN',
      };

      it('should add `access_token` to localStorage', () => {
        spyOn(localStorage, 'setItem');
        (authService as any).getAuthCallback()(null, auth0DecodedHash);
        expect(localStorage.setItem).toHaveBeenCalledWith('access_token', auth0DecodedHash.accessToken);
      });

      it('should add `id_token` to localStorage', () => {
        spyOn(localStorage, 'setItem');
        (authService as any).getAuthCallback()(null, auth0DecodedHash);
        expect(localStorage.setItem).toHaveBeenCalledWith('id_token', auth0DecodedHash.idToken);
      });

      it('should add `expires_at` to localStorage', () => {
        spyOn(localStorage, 'setItem');
        (authService as any).getAuthCallback()(null, auth0DecodedHash);
        expect((localStorage.setItem as any).calls.mostRecent().args[0]).toEqual('expires_at');
      });

      it('should navigate to app root', () => {
        spyOn(router, 'navigate').and.returnValue(Promise.resolve());
        (authService as any).getAuthCallback()(null, auth0DecodedHash);
        expect(router.navigate).toHaveBeenCalledWith(['/']);
      });
    });

    describe('Invalid decoded hash', () => {
      const auth0Error = { name: 'TEST_ERROR', description: 'Test error. ' };

      beforeEach(() => {
        spyOn(router, 'navigate').and.returnValue(Promise.resolve());
      });

      it('should navigate to app root', () => {
        (authService as any).getAuthCallback()(auth0Error, null);
        expect(router.navigate).toHaveBeenCalledWith(['/']);
      });

      it('should show an error toast', fakeAsync(() => {
        spyOn(toastrService, 'error');
        (authService as any).getAuthCallback()(auth0Error, null);
        tick();
        expect(toastrService.error).toHaveBeenCalledWith(auth0Error.name, auth0Error.description);
      }));
    });
  });
});
