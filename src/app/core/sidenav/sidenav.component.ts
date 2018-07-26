import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'ax-sidenav',
  styleUrls: [ './sidenav.component.scss' ],
  templateUrl: './sidenav.component.html'
})
export class SidenavComponent {
  @Input() sidenavElement: MatSidenav;

  constructor(private router: Router) { }

  /**
   * Navigate event handler.
   * @param {string} path - Path to navigate to.
   */
  onNavigate(path: string): void {
    this.router.navigate([ path ]);
    this.sidenavElement.close();
  }
}
