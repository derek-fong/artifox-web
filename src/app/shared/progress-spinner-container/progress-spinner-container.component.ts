import { Component, Input } from '@angular/core';

@Component({
  selector: 'ax-progress-spinner-container',
  styleUrls: [ './progress-spinner-container.component.scss' ],
  templateUrl: './progress-spinner-container.component.html'
})
export class ProgressSpinnerContainerComponent {
  @Input() message: string;
}
