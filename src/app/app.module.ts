import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth/shared/auth.service';
import { CoreModule } from './core/core.module';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    CoreModule,
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

  constructor(private authService: AuthService) {
    this.authService.handleAuthentication();
  }
}
