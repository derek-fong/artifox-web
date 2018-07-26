import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TopToolbarComponent } from './top-toolbar.component';

describe('TopToolbarComponent', () => {
  let component: TopToolbarComponent;
  let fixture: ComponentFixture<TopToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopToolbarComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('#onToggleSidenav', () => {
    it('should emit `toggleSidenav` event', () => {
      spyOn(component.toggleSidenav, 'emit');
      component.onToggleSidenav();
      expect(component.toggleSidenav.emit).toHaveBeenCalled();
    });
  });

  describe('Toolbar', () => {
    let toolbarDebugElement: DebugElement;

    beforeEach(() => {
      toolbarDebugElement = fixture.debugElement.query(By.css('mat-toolbar'));
    });

    it('should be created', () => {
      expect(!!toolbarDebugElement).toBeTruthy();
    });

    describe('Sidenav button', () => {
      let sidenavButtonDebugElement: DebugElement;

      beforeEach(() => {
        sidenavButtonDebugElement = toolbarDebugElement.query(By.css('#sidenav-button'));
      });

      it('should be created', () => {
        expect(!!sidenavButtonDebugElement).toBeTruthy();
      });

      it('should call #onToggleSidenav on click', () => {
        spyOn(component, 'onToggleSidenav');
        sidenavButtonDebugElement.nativeElement.click();
        expect(component.onToggleSidenav).toHaveBeenCalled();
      });
    });
  });
});
