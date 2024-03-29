import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AjudaPage } from './ajuda.page';
import { HttpModule } from '@angular/http';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: AjudaPage }]),
    HttpModule
  ],
  declarations: [AjudaPage]
})
export class AjudaPageModule {}
