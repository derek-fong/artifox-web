import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthCallbackContainerComponent } from './auth-callback-container/auth-callback-container.component';

const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'callback',
        component: AuthCallbackContainerComponent
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AuthRoutingModule { }
