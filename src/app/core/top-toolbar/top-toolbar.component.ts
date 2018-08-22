import { isPlatformServer } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  Output,
  PLATFORM_ID
} from '@angular/core';

import { AuthService } from '../../auth/shared/auth.service';

@Component({
  selector: 'ax-top-toolbar',
  styleUrls: [ './top-toolbar.component.scss' ],
  templateUrl: './top-toolbar.component.html'
})
export class TopToolbarComponent {
  @Output() toggleSidenav = new EventEmitter();
  isPlatformServer: boolean = isPlatformServer(this.platformId);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService
  ) { }

  /**
   * Determine if current user is authenticated.
   * @returns {boolean} - `true` if current user is authenticated; `false` otherwise.
   */
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  /**
   * Toggle sidenav event handler.
   */
  onToggleSidenav(): void {
    this.toggleSidenav.emit();
  }

  /**
   * Login event handler.
   */
  onLogin(): void {
    this.authService.login();
  }

  /**
   * Logout event handler.
   */
  onLogout(): void {
    this.authService.logout();
  }
}
