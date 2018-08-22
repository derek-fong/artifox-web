import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ProgressSpinnerComponent } from './progress-spinner.component';

describe('ProgressSpinnerComponent', () => {
  let component: ProgressSpinnerComponent;
  let fixture: ComponentFixture<ProgressSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressSpinnerComponent ],
      schemas: [ NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('Platform is server', () => {
    beforeEach(() => {
      component.isPlatformServer = true;
      fixture.detectChanges();
    });

    it('should show simple progress spinner', () => {
      const spinnerDebugElement = fixture.debugElement.query(By.css('#progress-spinner'));
      expect(!!spinnerDebugElement).toBeTruthy();
    });

    it('should not show Angular Material spinner', () => {
      const spinnerDebugElement = fixture.debugElement.query(By.css('mat-spinner'));
      expect(!!spinnerDebugElement).toBeFalsy();
    });
  });

  describe('Platform is not server', () => {
    beforeEach(() => {
      component.isPlatformServer = false;
      fixture.detectChanges();
    });

    it('should show Angular Material spinner', () => {
      const spinnerDebugElement = fixture.debugElement.query(By.css('mat-spinner'));
      expect(!!spinnerDebugElement).toBeTruthy();
    });

    it('should not simple progress spinner', () => {
      const spinnerDebugElement = fixture.debugElement.query(By.css('#progress-spinner'));
      expect(!!spinnerDebugElement).toBeFalsy();
    });
  });

  it('should show input message only when defined', () => {
    let messageDebugElement: DebugElement;

    component.message = 'Test Message';
    fixture.detectChanges();
    messageDebugElement = fixture.debugElement.query(By.css('#message'));
    expect(!!messageDebugElement).toBeTruthy();

    component.message = '';
    fixture.detectChanges();
    messageDebugElement = fixture.debugElement.query(By.css('#message'));
    expect(!!messageDebugElement).toBeFalsy();
  });
});
