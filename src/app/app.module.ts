import { isPlatformBrowser } from '@angular/common';
import {
  Inject,
  NgModule,
  PLATFORM_ID
} from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth/shared/auth.service';
import { CoreModule } from './core/core.module';

@NgModule({
  imports: [
    CoreModule,
    AppRoutingModule
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.authService.handleAuthentication();
    }
  }
}
