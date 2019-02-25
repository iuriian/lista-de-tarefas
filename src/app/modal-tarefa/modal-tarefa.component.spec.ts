import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTarefaPage } from './modal-tarefa.page';

describe('ModalTarefaPage', () => {
  let component: ModalTarefaPage;
  let fixture: ComponentFixture<ModalTarefaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTarefaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTarefaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
