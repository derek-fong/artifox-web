import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth/shared/auth.service';
import { CoreModule } from './core/core.module';
import { HttpStatusModule } from './http-status/http-status.module';

@NgModule({
  imports: [
    CoreModule,
    AppRoutingModule,
    HttpStatusModule
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

  constructor(private authService: AuthService) {
    this.authService.handleAuthentication();
  }
}
