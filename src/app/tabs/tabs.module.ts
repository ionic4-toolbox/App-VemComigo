import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { QuemSomosPageModule } from '../quem-somos/quem-somos.module';
import { AjudaPageModule } from '../ajuda/ajuda.module';
import { PerfilPageModule } from '../perfil/perfil.module';
import { BuscaPageModule } from '../busca/busca.module';
import { ResultadoBuscasPageModule } from '../resultado-buscas/resultado-buscas.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    AjudaPageModule,
    BuscaPageModule,
    QuemSomosPageModule,
    PerfilPageModule,
    ResultadoBuscasPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
