import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

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
    private router: Router,
    private alertController: AlertController
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

  async presentAlert(title: string, msg: string, btn: Array<string> = ['OK', 'CANCELAR']) {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: btn
    });

    await alert.present();
  }

  ngOnInit(): void {

    this.authenticationService.getProfile().subscribe(data => {
      console.log('Email: ', data.email);
      if (data) {
        this.userService.getUsersId(data.email).subscribe(users => {
          this.user = users[0];
          if (users[0]) {
            if (this.user['$key']) {
              this.perfilForm.reset();
              this.perfilForm.controls['id'].setValue(this.user['$key']);
              this.perfilForm.controls['nome'].setValue(this.user['nome']);
              this.perfilForm.controls['sobrenome'].setValue(this.user['sobrenome']);
              this.perfilForm.controls['turma'].setValue(this.user['turma']);
              this.perfilForm.controls['horario'].setValue(this.user['horario']);
              this.perfilForm.controls['email'].setValue(this.user['email']);
              this.perfilForm.controls['telefone'].setValue(this.user['telefone']);
              console.log(this.perfilForm.value);
            }
          } else {
            this.router.navigate(['login']);
          }

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
          this.presentAlert('Perfil', 'Perfil atualizado com sucesso!', ['OK']);
        },
        error => {
          this.presentAlert('Perfil', 'Perfil não foi atualizado! ' + error, ['OK']);
        }
      );

    }
  }

  deletarperfil() {
    this.userService.deleteUsers(this.user.id).then(
      () => {
        this.presentAlert('Deletar Perfil', 'Você gostaria de deletar seu perfil');
        this.router.navigate(['login']);
      },
      error => console.log('Error: ', error)
    );
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }

}
