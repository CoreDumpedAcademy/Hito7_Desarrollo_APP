import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteuserPage } from './deleteuser.page';

describe('DeleteuserPage', () => {
  let component: DeleteuserPage;
  let fixture: ComponentFixture<DeleteuserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteuserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteuserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
