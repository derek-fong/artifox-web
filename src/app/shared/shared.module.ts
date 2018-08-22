import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule } from '@angular/material';

import { ProgressSpinnerContainerComponent } from './progress-spinner-container/progress-spinner-container.component';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    ProgressSpinnerContainerComponent,
    ProgressSpinnerComponent
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    ProgressSpinnerContainerComponent,
    ProgressSpinnerComponent
  ]
})
export class SharedModule { }
