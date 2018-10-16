import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { User } from "../models/user.model";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { UserService } from "../service/user.service";
import { AuthenticationService } from "../service/authentication.service";

@Component({
  selector: "app-perfil",
  templateUrl: "perfil.page.html",
  styleUrls: ["perfil.page.scss"]
})
export class PerfilPage {
  
  user: User[];
  perfilForm: FormGroup;
  submitted = false;
  // private user: Observable<firebase.User>;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {

    this.perfilForm = fb.group({
      nome: [''],
      sobrenome: [''],
      turma: [''],
      horario: [''],
      email: [''],
      telefone: ['']
    });
  
  }

  onCreate() {
    console.log('teste');
    this.submitted = true;
    
    if (this.perfilForm.invalid) {
      return;
    } else {
      console.log('Cadastrar perfil: ', this.perfilForm.value);
      this.userService.addUsers(this.perfilForm.value); 
    }

  }  

  logout() {
    console.log('Logout()');
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }

}
