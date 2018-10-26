import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './service/auth-guard.service';

const routes: Routes = [
  {
    path: 'home',
    // canActivate: [AuthGuardService],
    loadChildren: './tabs/tabs.module#TabsPageModule'
  },
  {
    path: 'register',
    loadChildren: './register/register.module#RegisterPageModule'
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginPageModule'
  },
  {
    path: 'profile',
    loadChildren: './profile/profile.module#ProfilePageModule'
  },
  {
    path: 'Busca',
    loadChildren: './busca/busca.module#BuscaPageModule'
  },
  {
    path: 'cadastro-usuario',
    loadChildren: './cadastro-usuario/cadastro-usuario.module#CadastroUsuarioPageModule'
  },
  {
    path: 'resultado-buscas',
    loadChildren: './resultado-buscas/resultado-buscas.module#ResultadoBuscasPageModule' 
  },
  {
    path: '',
    redirectTo: 'cadastro-usuario',
    pathMatch: 'full'
  },
  {
    path: '**',
    loadChildren: './page-not-found/page-not-found.module#PageNotFoundPageModule'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
