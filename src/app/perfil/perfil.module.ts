import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { PerfilPage } from './perfil.page';
import { UserService } from '../service/user.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: PerfilPage
      }
    ])
  ],
  providers: [UserService],
  declarations: [PerfilPage]
})
export class PerfilPageModule {}
