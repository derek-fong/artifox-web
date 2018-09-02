import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/shared/auth.guard';
import { PermissionGuard } from './auth/shared/permission.guard';
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
    canActivate: [
      AuthGuard,
      PermissionGuard
    ],
    data: {
      requiredPermission: 'read:products'
    },
    loadChildren: './products/products.module#ProductsModule',
    path: 'products'
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
