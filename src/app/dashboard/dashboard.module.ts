import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardContainerComponent } from './dashboard-container/dashboard-container.component';

@NgModule({
  imports: [ DashboardRoutingModule ],
  declarations: [ DashboardContainerComponent ]
})
export class DashboardModule { }
