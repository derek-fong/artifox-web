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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { SidenavComponent } from './sidenav/sidenav.component';
import { TopToolbarComponent } from './top-toolbar/top-toolbar.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    ToastrModule.forRoot(),
  ],
  declarations: [
    TopToolbarComponent,
    SidenavComponent
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
