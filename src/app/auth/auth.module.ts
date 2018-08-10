import { NgModule } from '@angular/core';
import { AuthService } from './shared/auth.service';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthCallbackContainerComponent } from './auth-callback-container/auth-callback-container.component';
import { AuthGuard } from './shared/auth.guard';
import { PermissionGuard } from './shared/permission.guard';

@NgModule({
  imports: [ AuthRoutingModule ],
  providers: [
    AuthGuard,
    AuthService,
    PermissionGuard
  ],
  declarations: [ AuthCallbackContainerComponent ]
})
export class AuthModule { }
