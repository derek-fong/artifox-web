import { NgModule } from '@angular/core';

import { HttpStatusRoutingModule } from './http-status-routing.module';
import { Http401Component } from './http-401/http-401.component';
import { Http403Component } from './http-403/http-403.component';
import { Http404Component } from './http-404/http-404.component';
import { Http500Component } from './http-500/http-500.component';

@NgModule({
  imports: [ HttpStatusRoutingModule ],
  declarations: [
    Http401Component,
    Http403Component,
    Http404Component,
    Http500Component
  ]
})
export class HttpStatusModule { }
