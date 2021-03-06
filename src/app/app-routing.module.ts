import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/shared/auth.guard';
import { HomeContainerComponent } from './home/home-container/home-container.component';

const routes: Routes = [
  {
    component: HomeContainerComponent,
    path: '',
  },
  {
    canActivate: [ AuthGuard ],
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    path: 'dashboard'
  },
  {
    loadChildren: './http-status/http-status.module#HttpStatusModule',
    path: 'error'
  },
  {
    path: '**',
    redirectTo: '/error/404'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
