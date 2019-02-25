import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-modal-tarefa',
  templateUrl: './modal-tarefa.component.html',
  styleUrls: ['./modal-tarefa.component.scss'],
})
export class ModalTarefaComponent implements OnInit {

  public tarefaFormulario: FormGroup;
  private db: any;
  private ref: any;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController
  ) {

    if (this.db === undefined) {
      this.db = firebase.firestore();
    }

    this.ref = this.db.collection('tarefas');
    this.criarFormulario();

  }

  ngOnInit() {}

  private criarFormulario() {
    this.tarefaFormulario = new FormGroup({
      'nome': new FormControl('', [Validators.required]),
      'prioridade': new FormControl('', [Validators.required]),
    });
  }

  // Insere a tarefa no banco de dados
  public cadastrarTarefa() {
    this.ref.add({
      nome: this.tarefaFormulario.value.nome,
      prioridade: this.tarefaFormulario.value.prioridade
    })
    .then(() => {
      this.tarefaFormulario.reset();
      this.alerta('sucesso');
    }, err => {
      console.log(err);
    })
    .catch(error => {
      console.log(error);
      this.alerta('erro');
    });
  }

  public fecharModal() {
    this.modalController.dismiss();
  }

  async alerta(status: string) {
    const alerta = await this.alertController.create({
      message: (status === 'sucesso') ? 'Tarefa adicionada com sucesso' : 'Houve um problema',
      buttons: [{
        handler: () => {
          if (status === 'sucesso') {
            this.fecharModal();
          }
        },
        text: 'OK',
        role: 'cancel'
      }]
    });

    await alerta.present();
  }

  get nome() {
    return this.tarefaFormulario.get('nome');
  }

  get prioridade() {
    return this.tarefaFormulario.get('prioridade');
  }
}
