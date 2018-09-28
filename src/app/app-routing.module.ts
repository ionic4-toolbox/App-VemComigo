import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { 
    path: 'home', 
    loadChildren: './tabs/tabs.module#TabsPageModule'
  },
  { 
    path: 'login',
    loadChildren: './login/login.module#LoginPageModule'
  },
  { 
    path: '**', 
    loadChildren: './page-not-found/page-not-found.module#PageNotFoundPageModule'
  },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
