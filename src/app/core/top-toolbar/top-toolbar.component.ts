import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'ax-top-toolbar',
  styleUrls: [ './top-toolbar.component.scss' ],
  templateUrl: './top-toolbar.component.html'
})
export class TopToolbarComponent {
  @Output() toggleSidenav = new EventEmitter();

  /**
   * Toggle sidenav event handler.
   */
  onToggleSidenav(): void {
    this.toggleSidenav.emit();
  }
}
