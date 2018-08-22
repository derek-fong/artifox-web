import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { HomeContainerComponent } from './home-container.component';

describe('HomeContainerComponent', () => {
  let component: HomeContainerComponent;
  let fixture: ComponentFixture<HomeContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ HomeContainerComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(!!component).toBeTruthy();
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

    it('should not show home container', () => {
      const dashboardContainerDebugElement = fixture.debugElement.query(By.css('#home-container'));
      expect(dashboardContainerDebugElement).toBeFalsy();
    });
  });

  describe('Platform is not server', () => {
    beforeEach(() => {
      component.isPlatformServer = false;
      fixture.detectChanges();
    });

    it('should show home container', () => {
      const dashboardContainerDebugElement = fixture.debugElement.query(By.css('#home-container'));
      expect(dashboardContainerDebugElement).toBeTruthy();
    });

    it('should not show progress spinner container', () => {
      const progressSpinnerContainerDebugElement = fixture.debugElement.query(By.css('ax-progress-spinner-container'));
      expect(progressSpinnerContainerDebugElement).toBeFalsy();
    });
  });
});
