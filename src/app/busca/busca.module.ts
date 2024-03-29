import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BuscaPage } from './busca.page';
import { DestinoService } from '../service/destinos.service';

const routes: Routes = [
  {
    path: '',
    component: BuscaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BuscaPage],
  providers: [DestinoService]
})
export class BuscaPageModule {}
