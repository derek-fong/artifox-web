import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { DashboardContainerComponent } from './dashboard-container.component';

describe('DashboardContainerComponent', () => {
  let component: DashboardContainerComponent;
  let fixture: ComponentFixture<DashboardContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ DashboardContainerComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should call #setMeta', () => {
      spyOn((component as any), 'setMeta');
      component.ngOnInit();
      expect((component as any).setMeta).toHaveBeenCalled();
    });
  });

  describe('Platform is server', () => {
    beforeEach(() => {
      component.isPlatformServer = true;
      fixture.detectChanges();
    });

    it('should show progress spinner container', () => {
      const progressSpinnerContainerDebugElement = fixture.debugElement.query(By.css('ax-progress-spinner-container'));
      expect(progressSpinnerContainerDebugElement).toBeTruthy();
    });

    it('should not show dashboard container', () => {
      const dashboardContainerDebugElement = fixture.debugElement.query(By.css('#dashboard-container'));
      expect(dashboardContainerDebugElement).toBeFalsy();
    });
  });

  describe('Platform is not server', () => {
    beforeEach(() => {
      component.isPlatformServer = false;
      fixture.detectChanges();
    });

    it('should show dashboard container', () => {
      const dashboardContainerDebugElement = fixture.debugElement.query(By.css('#dashboard-container'));
      expect(dashboardContainerDebugElement).toBeTruthy();
    });

    it('should not show progress spinner container', () => {
      const progressSpinnerContainerDebugElement = fixture.debugElement.query(By.css('ax-progress-spinner-container'));
      expect(progressSpinnerContainerDebugElement).toBeFalsy();
    });
  });
});
