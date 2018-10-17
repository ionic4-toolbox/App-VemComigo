import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ResultadoBuscasPage } from './resultado-buscas.page';
import { DestinoService } from '../service/destinos.service';

const routes: Routes = [
  {
    path: '',
    component: ResultadoBuscasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ResultadoBuscasPage],
  providers: [DestinoService]
})
export class ResultadoBuscasPageModule {}
