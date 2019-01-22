import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { Camera } from '@ionic-native/camera/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { NgxViacepModule } from '@brunoc/ngx-viacep';

import { PerfilPage } from './perfil.page';
import { UserService } from '../service/user.service';
import { IonicSelectableModule } from 'ionic-selectable';
import { BrMaskerModule } from 'br-mask';

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
    ]),
    NgxViacepModule,
    IonicSelectableModule,
    BrMaskerModule
  ],
  providers: [
    UserService,
    Camera,
    Facebook
  ],
  declarations: [
    PerfilPage
  ]
})
export class PerfilPageModule {}
