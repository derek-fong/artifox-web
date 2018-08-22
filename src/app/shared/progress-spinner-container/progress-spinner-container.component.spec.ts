import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ProgressSpinnerContainerComponent } from './progress-spinner-container.component';

describe('ProgressSpinnerContainerComponent', () => {
  let component: ProgressSpinnerContainerComponent;
  let fixture: ComponentFixture<ProgressSpinnerContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressSpinnerContainerComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressSpinnerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should contain progress spinner element', () => {
    const progressSpinnerDebugElement = fixture.debugElement.query(By.css('ax-progress-spinner'));
    expect(!!progressSpinnerDebugElement).toBeTruthy();
  });
});
