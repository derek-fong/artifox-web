import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthCallbackContainerComponent } from './auth-callback-container.component';

describe('AuthCallbackContainerComponent', () => {
  let component: AuthCallbackContainerComponent;
  let fixture: ComponentFixture<AuthCallbackContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthCallbackContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthCallbackContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
