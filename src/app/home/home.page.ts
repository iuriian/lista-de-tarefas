import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ModalTarefaComponent } from '../modal-tarefa/modal-tarefa.component';
import { ModalController, PopoverController } from '@ionic/angular';
import { OpcoesComponent } from '../opcoes/opcoes.component';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public tarefaFormulario: FormGroup;
  private db: any;
  private ref: any;
  public tarefas: any[] = [];
  public mensagem: string;

  constructor(
    private modalController: ModalController,
    private popoverController: PopoverController
  ) {

    if (this.db === undefined) {
      this.db = firebase.firestore();
    }

    this.ref = this.db.collection('tarefas');
    this.recuperarTarefas();

  }

  // Recupera as tarefas do banco de dados e adiciona ouvintes
  public recuperarTarefas() {
    this.ref.onSnapshot(querySnapshot => {
        if (querySnapshot.size > 0) {
          this.tarefas = [];
          querySnapshot.forEach(doc => {
            const obj = doc.data();
            obj.id = doc.id;
            this.tarefas.push(obj);
          });
        } else {
          this.tarefas = [];
          this.mensagem = 'Não há tarefas cadastradas';
        }
      }, error => console.log('erro', error));
  }

  // Abre o modal de cadastro
  async abrirModal() {
    const modal = await this.modalController.create({
      component: ModalTarefaComponent
    });

    modal.present();
  }

  // Abre as opções de editar e excluir
  async mostrarOpcoes(id) {
    const popover = await this.popoverController.create({
      component: OpcoesComponent,
      componentProps: {
        value: id
      },
      translucent: true
    });
    return await popover.present();
  }
}
