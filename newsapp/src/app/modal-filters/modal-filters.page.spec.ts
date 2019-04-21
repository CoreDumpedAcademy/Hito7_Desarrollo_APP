import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFiltersPage } from './modal-filters.page';

describe('ModalFiltersPage', () => {
  let component: ModalFiltersPage;
  let fixture: ComponentFixture<ModalFiltersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFiltersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFiltersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
