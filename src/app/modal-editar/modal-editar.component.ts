import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { ModalController, NavParams, AlertController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-modal-editar',
  templateUrl: './modal-editar.component.html',
  styleUrls: ['./modal-editar.component.scss'],
})
export class ModalEditarComponent implements OnInit {

  @Input() value: string;
  public editarForm: FormGroup;
  private db: any;
  private ref: any;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private opcoes: PopoverController,
    private navParams: NavParams
  ) {

    if (this.db === undefined) {
      this.db = firebase.firestore();
    }

    this.ref = this.db.collection('tarefas');
    this.criarFormulario();
    this.value = this.navParams.data.value;
    this.recuperarTarefaEspecifica();
    this.opcoes.dismiss();
  }

  ngOnInit() {
  }

  public criarFormulario() {
    this.editarForm = new FormGroup({
      'nome': new FormControl(''),
      'prioridade': new FormControl('')
    });
  }

  public editarTarefa() {
    this.ref.doc(this.value)
      .update({
        nome: this.editarForm.value.nome,
        prioridade: this.editarForm.value.prioridade,
      })
      .then(() => {
        this.alerta('sucesso');
      })
      .catch((error) => console.log(error));
  }

  public recuperarTarefaEspecifica() {
    this.ref.doc(this.value)
      .get()
      .then(snapshot => {
        this.editarForm.patchValue({
          nome: snapshot.data().nome,
          prioridade: snapshot.data().prioridade,
        });
      })
      .catch(error => console.log(error));
  }

  async alerta(status: string) {
    const alerta = await this.alertController.create({
      message: (status === 'sucesso') ? 'Tarefa alterada com sucesso' : 'Houve um problema',
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

  public fecharModal() {
    this.modalController.dismiss();
  }

  get nome() {
    return this.editarForm.get('nome');
  }

  get prioridade() {
    return this.editarForm.get('prioridade');
  }
}
