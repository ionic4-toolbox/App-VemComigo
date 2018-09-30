import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutPage } from '../about/about.page';
import { BuscaPage } from '../busca/busca.page';
import { ContactPage } from '../contact/contact.page';
import { PerfilPage } from '../perfil/perfil.page';
import { TabsPage } from './tabs.page';

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
        path: 'about',
        outlet: 'about',
        component: AboutPage
      },
      {
        path: 'contact',
        outlet: 'contact',
        component: ContactPage
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
