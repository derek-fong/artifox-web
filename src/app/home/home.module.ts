import { NgModule } from '@angular/core';

import { HomeContainerComponent } from './home-container/home-container.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [ SharedModule ],
  declarations: [ HomeContainerComponent ],
  exports: [ HomeContainerComponent ]
})
export class HomeModule { }
