import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public tarefaFormulario: FormGroup;

  public tarefas: any[] = [
    {
      id: 1,
      nome: 'desenvolver front',
      status: 'ativo'
    },
    {
      id: 2,
      nome: 'estilizar front',
      status: 'ativo'
    },
    {
      id: 3,
      nome: 'desenvolver integração',
      status: 'ativo'
    },
    {
      id: 4,
      nome: 'desenvolver filtros',
      status: 'ativo'
    },
    {
      id: 5,
      nome: 'desenvolver diretivas',
      status: 'ativo'
    },
    {
      id: 6,
      nome: 'desenvolver endpoints',
      status: 'ativo'
    }
  ];

  constructor() {
    this.criarFormulario();
  }

  private criarFormulario() {
    this.tarefaFormulario = new FormGroup({
      'nome': new FormControl('')
    });
  }

  public cadastrarTarefa() {
    const obj = {
      id: this.tarefas[this.tarefas.length - 1].id + 1,
      nome: this.tarefaFormulario.value.nome
    };
    this.tarefas.push(obj);
    this.tarefaFormulario.reset();
  }

  public tarefaCompleta(tarefa) {
    console.log(tarefa);
  }

  public deletarTarefa(id) {
    this.tarefas = this.tarefas.filter(element => {
      return element.id !== id;
    });
    if (this.tarefas.length === 0) {
      this.tarefas = [];
    }
  }
}
