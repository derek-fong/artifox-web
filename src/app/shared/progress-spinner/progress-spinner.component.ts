import { isPlatformServer } from '@angular/common';
import {
  Component,
  Inject,
  Input,
  PLATFORM_ID
} from '@angular/core';

@Component({
  selector: 'ax-progress-spinner',
  styleUrls: [ './progress-spinner.component.scss' ],
  templateUrl: './progress-spinner.component.html'
})
export class ProgressSpinnerComponent {
  @Input() message: string;
  isPlatformServer: boolean = isPlatformServer(this.platformId);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }
}
