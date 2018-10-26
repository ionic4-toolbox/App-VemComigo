import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { Camera } from '@ionic-native/camera/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';

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
