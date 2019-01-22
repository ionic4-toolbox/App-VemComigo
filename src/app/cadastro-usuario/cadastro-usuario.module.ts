import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NgxViacepModule } from '@brunoc/ngx-viacep';

import { CadastroUsuarioPage } from './cadastro-usuario.page';
import { DestinoService } from '../service/destinos.service';
import { HttpClientModule } from '@angular/common/http';
import { IonicSelectableModule } from 'ionic-selectable';
import { BrMaskerModule } from 'br-mask';

const routes: Routes = [
  {
    path: '',
    component: CadastroUsuarioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgxViacepModule,
    HttpClientModule,
    IonicSelectableModule,
    BrMaskerModule
  ],
  declarations: [CadastroUsuarioPage],
  providers: [DestinoService]
})
export class CadastroUsuarioPageModule {}
