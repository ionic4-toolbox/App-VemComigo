import { Component } from "@angular/core";
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: "app-perfil",
  templateUrl: "perfil.page.html",
  styleUrls: ["perfil.page.scss"]
})
export class PerfilPage {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  logout() {
    console.log('Logout()');
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }
}
