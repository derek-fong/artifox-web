import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Http401Component } from './http-401/http-401.component';
import { Http403Component } from './http-403/http-403.component';
import { Http404Component } from './http-404/http-404.component';
import { Http500Component } from './http-500/http-500.component';

const routes: Routes = [
  {
    component: Http401Component,
    path: '401'
  },
  {
    component: Http403Component,
    path: '403'
  },
  {
    component: Http404Component,
    path: '404'
  },
  {
    component: Http500Component,
    path: '500'
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class HttpStatusRoutingModule { }
