import * as jwtDecode from 'jwt-decode';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router,
    private toastrService: ToastrService
  ) {
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

  /**
   * Handle authentications.
   */
  handleAuthentication(): void {
    this.webAuth.parseHash(this.getAuthCallback());
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
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');

    return new Date().getTime() < expiresAt;
  }

  /**
   * Login.
   */
  login(): void {
    this.webAuth.authorize();
  }

  /**
   * Logout.
   */
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.router.navigate([ '/' ]);
  }

  /**
   * Get `app_metadata` property name in decoded JWT.
   * @returns {string|null} - `app_metadata` property name if details are valid; `null` otherwise.
   */
  private getAppMetadataPropertyName(): string | null {
    let appMetadataPropertyName: string = null;

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
    const strIdToken = localStorage.getItem('id_token');
    let idToken = null;

    if (strIdToken && typeof strIdToken === 'string') {
      try {
        idToken = jwtDecode(strIdToken);
      } catch (error) {
        this.toastrService.error('Invalid ID Token');
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
      if (
        auth0DecodedHash &&
        Object.prototype.hasOwnProperty.call(auth0DecodedHash, 'accessToken') && auth0DecodedHash.accessToken &&
        Object.prototype.hasOwnProperty.call(auth0DecodedHash, 'idToken') && auth0DecodedHash.idToken
      ) {
        localStorage.setItem('access_token', auth0DecodedHash.accessToken);
        localStorage.setItem('id_token', auth0DecodedHash.idToken);
        localStorage.setItem('expires_at', this.getTokenExpiresAt(auth0DecodedHash.expiresIn));
        window.location.hash = '';
        this.router.navigate(['/']);
      } else if (error) {
        this.router.navigate(['/']).then(() => {
          this.toastrService.error(error.name, error.description);
        });
      }
    };
  }
}
