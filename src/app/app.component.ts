import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID
} from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'ax-root',
  styleUrls: [ './app.component.scss' ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private swUpdate: SwUpdate
  ) { }

  ngOnInit(): void {
    /* istanbul ignore else */
    if (isPlatformBrowser(this.platformId) && this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('New version available. Load New Version?')) {
          this.reload();
        }
      });
    }
  }

  /**
   * Reload.
   */
  /* istanbul ignore next */
  private reload(): void {
    window.location.reload();
  }
}
