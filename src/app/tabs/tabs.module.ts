import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { ContactPageModule } from '../contact/contact.module';
import { AboutPageModule } from '../about/about.module';
import { PerfilPageModule } from '../perfil/perfil.module';
import { BuscaPageModule } from '../busca/busca.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    AboutPageModule,
    BuscaPageModule,
    ContactPageModule,
    PerfilPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
