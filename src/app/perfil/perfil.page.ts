import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from '../models/user.model';

import { UserService } from '../service/user.service';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-perfil',
  templateUrl: 'perfil.page.html',
  styleUrls: ['perfil.page.scss']
})
export class PerfilPage implements OnInit {
  perfilForm: FormGroup;
  submitted = false;
  user: User;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.perfilForm = fb.group({
      id: [''],
      nome: [''],
      sobrenome: [''],
      turma: [''],
      horario: [''],
      email: [''],
      telefone: ['']
    });
  }

  ngOnInit(): void {
    this.authenticationService.getProfile().subscribe(data => {
      if (data) {
        this.userService.getUsersId(data.email).subscribe(users => {
          const user = users[0];
          this.perfilForm.controls['id'].setValue(user.id);
          this.perfilForm.controls['nome'].setValue(user.nome);
          this.perfilForm.controls['sobrenome'].setValue(user.sobrenome);
          this.perfilForm.controls['turma'].setValue(user.turma);
          this.perfilForm.controls['horario'].setValue(user.horario);
          this.perfilForm.controls['email'].setValue(user.email);
          this.perfilForm.controls['telefone'].setValue(user.telefone);
        });
      }
    });
  }

  onUpdate() {
    this.submitted = true;

    if (this.perfilForm.invalid) {
      return;
    } else {

      this.userService.updateUser(this.perfilForm.value.id, this.perfilForm.value).then(
        data => {
          console.log('Resultado: ', data);
        },
        error => console.log('Error: ', error)
      );

    }
  }

  logout() {
    console.log('Logout()');
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }

}
