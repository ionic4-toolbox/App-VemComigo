import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuemSomosPage } from './quem-somos.page';

describe('QuemSomosPage', () => {
  let component: QuemSomosPage;
  let fixture: ComponentFixture<QuemSomosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuemSomosPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuemSomosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
