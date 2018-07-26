import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Http500Component } from './http-500.component';

describe('Http500Component', () => {
  let component: Http500Component;
  let fixture: ComponentFixture<Http500Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Http500Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Http500Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
