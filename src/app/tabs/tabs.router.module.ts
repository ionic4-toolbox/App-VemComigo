import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AjudaPage } from '../ajuda/ajuda.page';
import { BuscaPage } from '../busca/busca.page';
import { PerfilPage } from '../perfil/perfil.page';
import { TabsPage } from './tabs.page';
import { QuemSomosPage } from '../quem-somos/quem-somos.page';
import { ResultadoBuscasPage } from '../resultado-buscas/resultado-buscas.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/(busca:busca)',
        pathMatch: 'full',
      },
      {
        path: 'perfil',
        outlet: 'perfil',
        component: PerfilPage
      },
      {
        path: 'busca',
        outlet: 'busca',
        component: BuscaPage
      },
      {
        path: 'resultado',
        outlet: 'resultado',
        component: ResultadoBuscasPage
      },
      {
        path: 'ajuda',
        outlet: 'ajuda',
        component: AjudaPage
      },
      {
        path: 'quem-somos',
        outlet: 'quem-somos',
        component: QuemSomosPage
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home/tabs/(busca:busca)',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
