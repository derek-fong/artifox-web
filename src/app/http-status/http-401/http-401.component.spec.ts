import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Http401Component } from './http-401.component';

describe('Http401Component', () => {
  let component: Http401Component;
  let fixture: ComponentFixture<Http401Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Http401Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Http401Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
