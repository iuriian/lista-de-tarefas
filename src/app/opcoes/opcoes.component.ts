import { Component, OnInit, Input } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { PopoverController, ModalController } from '@ionic/angular';
import { ModalEditarComponent } from '../modal-editar/modal-editar.component';

@Component({
  selector: 'app-opcoes',
  templateUrl: './opcoes.component.html',
  styleUrls: ['./opcoes.component.scss'],
})
export class OpcoesComponent implements OnInit {

  @Input() value: string;
  private db: any;
  private ref: any;

  constructor(
    private opcoes: PopoverController,
    private modalController: ModalController
  ) {

    if (this.db === undefined) {
      this.db = firebase.firestore();
    }

    this.ref = this.db.collection('tarefas');

  }

  ngOnInit() {
  }

  // Remove a tarefa no banco de dados
  public deletarTarefa() {
    this.ref.doc(this.value)
      .delete()
      .then(() => this.opcoes.dismiss())
      .catch(error => console.log(error));
  }

  // Abre o modal de cadastro
  async abrirModalEditar() {
    const modal = await this.modalController.create({
      component: ModalEditarComponent,
      componentProps: { value: this.value }
    });

    return await modal.present();
  }

}
