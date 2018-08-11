import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeContainerComponent } from './home/home-container/home-container.component';

const routes: Routes = [
  {
    component: HomeContainerComponent,
    path: '',
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
