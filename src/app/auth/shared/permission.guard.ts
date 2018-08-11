import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router
} from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class PermissionGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let hasPermission = false;

    if (
      route &&
      Object.prototype.hasOwnProperty.call(route, 'data') && route.data &&
      Object.prototype.hasOwnProperty.call(route.data, 'requiredPermission') && route.data.requiredPermission &&
      typeof route.data.requiredPermission === 'string'
    ) {
      const permission: string = route.data.requiredPermission;

      hasPermission = this.authService.hasPermission(permission);

      if (!hasPermission) {
        this.router.navigate(['/error/403']);
      }
    } else {
      this.router.navigate(['/error/500']);
    }

    return hasPermission;
  }
}
