import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { ModalTarefaComponent } from '../modal-tarefa/modal-tarefa.component';
import { OpcoesComponent } from '../opcoes/opcoes.component';
import { ModalEditarComponent } from '../modal-editar/modal-editar.component';

@NgModule({
  entryComponents: [
    ModalTarefaComponent,
    OpcoesComponent,
    ModalEditarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [
    HomePage,
    ModalTarefaComponent,
    OpcoesComponent,
    ModalEditarComponent
  ]
})
export class HomePageModule {}
