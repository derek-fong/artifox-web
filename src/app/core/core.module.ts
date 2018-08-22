import { CommonModule } from '@angular/common';
import {
  NgModule,
  Optional,
  SkipSelf
} from '@angular/core';
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ToastrModule } from 'ngx-toastr';

import { SidenavComponent } from './sidenav/sidenav.component';
import { TopToolbarComponent } from './top-toolbar/top-toolbar.component';
import { AuthModule } from '../auth/auth.module';
import { HomeModule } from '../home/home.module';
import { environment } from '../../environments/environment';

@NgModule({
  imports: [
    AuthModule,
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: environment.appId }),
    CommonModule,
    HomeModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    ToastrModule.forRoot()
  ],
  declarations: [
    SidenavComponent,
    TopToolbarComponent
  ],
  exports: [
    MatSidenavModule,
    SidenavComponent,
    ToastrModule,
    TopToolbarComponent
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only. ');
    }
  }
}
