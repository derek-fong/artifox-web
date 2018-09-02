import * as jwtDecode from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
import {
  Inject,
  Injectable,
  PLATFORM_ID
} from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import {
  Auth0Callback,
  Auth0DecodedHash,
  Auth0Error,
  WebAuth
} from 'auth0-js';
import { ToastrService } from 'ngx-toastr';

import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
  private webAuth: WebAuth;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private apollo: Apollo,
    private router: Router,
    private toastrService: ToastrService
  ) {
    /* istanbul ignore else */
    if (isPlatformBrowser(this.platformId)) {
      const {
        audience,
        clientID,
        domain,
        redirectUri,
        responseType,
        scope
      } = environment.auth.auth0;

      this.webAuth = new WebAuth({
        audience,
        clientID,
        domain,
        redirectUri,
        responseType,
        scope
      });
    }
  }

  /**
   * Get ID token.
   * @returns {string} - ID Token.
   */
  getIdToken(): string {
    return localStorage.getItem('id_token');
  }

  /**
   * Handle authentications.
   */
  handleAuthentication(): void {
    /* istanbul ignore else */
    if (isPlatformBrowser(this.platformId)) {
      this.webAuth.parseHash(this.getAuthCallback());
    }
  }

  /**
   * Determine if current user has permission specified.
   * @param {string} permissionName - Permission name.
   * @returns {boolean} - `true` if current user has permission specified; `false` otherwise.
   */
  hasPermission(permissionName: string): boolean {
    let hasPermission = false;

    if (permissionName && typeof permissionName === 'string') {
      const token = this.getDecodedIdToken();

      if (token) {
        const appMetadataPropertyName = this.getAppMetadataPropertyName();

        if (
          Object.prototype.hasOwnProperty.call(token, appMetadataPropertyName) &&
          token[appMetadataPropertyName]
        ) {
          const appData = token[appMetadataPropertyName];

          if (appData && Object.prototype.hasOwnProperty.call(appData, 'authorization') && appData.authorization) {
            const authorization = appData.authorization;

            if (authorization && Object.prototype.hasOwnProperty.call(authorization, 'permissions') && authorization.permissions) {
              const permissions = authorization.permissions;

              hasPermission = permissions.includes(permissionName);
            }
          }
        }
      }
    }

    return hasPermission;
  }

  /**
   * Determine if current user is authenticated.
   * @returns {boolean} - `true` if current user is authenticated; `false` otherwise.
   */
  isAuthenticated(): boolean {
    let isAuthenticated = false;

    /* istanbul ignore else */
    if (isPlatformBrowser(this.platformId)) {
      const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');

      isAuthenticated = new Date().getTime() < expiresAt;
    }

    return isAuthenticated;
  }

  /**
   * Login.
   */
  login(): void {
    /* istanbul ignore else */
    if (isPlatformBrowser(this.platformId)) {
      this.webAuth.authorize();
    }
  }

  /**
   * Logout.
   */
  logout(): void {
    /* istanbul ignore else */
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('id_token');
      localStorage.removeItem('expires_at');
      this.apollo.getClient().resetStore();
      this.router.navigate([ '/' ]);
    }
  }

  /**
   * Get `app_metadata` property name in decoded JWT.
   * @returns {string|null} - `app_metadata` property name if details are valid; `null` otherwise.
   */
  private getAppMetadataPropertyName(): string | null {
    let appMetadataPropertyName: string = null;

    /* istanbul ignore else */
    if (
      environment &&
      Object.prototype.hasOwnProperty.call(environment, 'auth') && environment.auth &&
      Object.prototype.hasOwnProperty.call(environment.auth, 'auth0') && environment.auth.auth0 &&
      Object.prototype.hasOwnProperty.call(environment.auth.auth0, 'namespace') && environment.auth.auth0.namespace &&
      typeof environment.auth.auth0.namespace === 'string'
    ) {
      appMetadataPropertyName = `${environment.auth.auth0.namespace}/app_metadata`;
    }

    return appMetadataPropertyName;
  }

  /**
   * Get decoded ID token.
   * @returns {object|null} - Decoded ID token if valid; `null` otherwise.
   */
  private getDecodedIdToken(): object|null {
    let idToken = null;

    /* istanbul ignore else */
    if (isPlatformBrowser(this.platformId)) {
      const strIdToken = this.getIdToken();

      /* istanbul ignore else */
      if (strIdToken && typeof strIdToken === 'string') {
        try {
          idToken = jwtDecode(strIdToken);
        } catch (error) {
          this.toastrService.error('Invalid ID Token. ');
        }
      }
    }

    return idToken;
  }

  /**
   * Get token expiry in string format.
   * @param {number} expiresIn - Number of seconds until the access token expires
   * @returns {string} - Get token expiry in string format.
   */
  private getTokenExpiresAt(expiresIn: number): string {
    return JSON.stringify(expiresIn * 1000) + new Date().getTime();
  }

  /**
   * Get authentication callback.
   * @returns {Auth0Callback<Auth0DecodedHash>} - Authentication callback.
   */
  private getAuthCallback(): Auth0Callback<Auth0DecodedHash> {
    return (error: null | Auth0Error, auth0DecodedHash: Auth0DecodedHash): void  => {
      /* istanbul ignore else */
      if (isPlatformBrowser(this.platformId)) {
        if (
          auth0DecodedHash &&
          Object.prototype.hasOwnProperty.call(auth0DecodedHash, 'accessToken') && auth0DecodedHash.accessToken &&
          Object.prototype.hasOwnProperty.call(auth0DecodedHash, 'idToken') && auth0DecodedHash.idToken
        ) {
          localStorage.setItem('access_token', auth0DecodedHash.accessToken);
          localStorage.setItem('id_token', auth0DecodedHash.idToken);
          localStorage.setItem('expires_at', this.getTokenExpiresAt(auth0DecodedHash.expiresIn));
          window.location.hash = '';
          this.router.navigate(['/'])
            .then(() => this.reload());
        } else {
          /* istanbul ignore else */
          if (error) {
            this.router.navigate(['/'])
              .then(() => this.toastrService.error(error.name, error.description));
          }
        }
      }
    };
  }

  /**
   * Reload.
   */
  /* istanbul ignore next */
  private reload(): void {
    window.location.reload();
  }
}
