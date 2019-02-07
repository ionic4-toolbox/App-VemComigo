import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';

import { User } from '../models/user.model';
import { UserService } from '../service/user.service';
import { AuthenticationService } from '../service/authentication.service';
import { AlertService } from '../service/alert.service';
import { LoadingService } from '../service/loading.service';
import { DestinoService } from '../service/destinos.service';
import { Bairro } from '../models/bairro.model';
import { IonicSelectableComponent } from 'ionic-selectable';


@Component({
  selector: 'app-perfil',
  templateUrl: 'perfil.page.html',
  styleUrls: ['perfil.page.scss']
})
export class PerfilPage {
  perfilForm: FormGroup;
  submitted = false;
  user: User;
  destinos: Object;
  ports: Bairro[];
  port: Bairro;
  bairros: Object;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private alertController: AlertController,
    private storage: Storage,
    public alertService: AlertService,
    public loadingService: LoadingService,
    private destinoService: DestinoService
  ) {

    this.perfilForm = fb.group({
      id: [''],
      nome: [''],
      destino: [''],
      horarioOrigemSaida: [''],
      email: [''],
      telefone: ['']
    });

  }

  portChange(event: {
    component: IonicSelectableComponent,
    value: any;
  }) {
    // console.log('port:', event.value);
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Deletar perfil',
      message: 'Você gostaria de deletar seu perfil?',
      buttons: [
        {
          text: 'NÃO',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'SIM',
          handler: () => {
            this.deletarperfil(true);
          }
        }
      ]
    });

    await alert.present();
  }

  ionViewWillEnter() {

    this.getBairros();
    this.storage.get('userCurrent').then(
      (data: any) => {
        const usuario = JSON.parse(data);
        this.userService.getUsersId(usuario.email || usuario.user.email).subscribe(users => {

          this.user = users[0];
          this.storage.set('userAtual', JSON.stringify(this.user));

          if (users) {

            if (this.user['$key']) {
              this.perfilForm.reset();
              this.perfilForm.controls['id'].setValue(this.user['$key']);
              this.perfilForm.controls['nome'].setValue(this.user.nome);
              this.perfilForm.controls['destino'].patchValue(this.user.destino);
              this.perfilForm.controls['horarioOrigemSaida'].setValue(this.user.horarioOrigemSaida);
              this.perfilForm.controls['email'].setValue(this.user.email);
              this.perfilForm.controls['telefone'].setValue(this.user.telefone);
            }

          } else {
            this.router.navigate(['login']);
          }

        });
      }
    ).catch((error => {
      this.alertService.presentAlert('Atenção', 'Não foi possivel carregar os dados' + error, ['OK']);
    }));


  }

  get form () {
    return this.perfilForm.controls;
  }

  onUpdate() {
    this.submitted = true;

    if (this.perfilForm.invalid) {
      return;
    } else {
      this.loadingService.present('Atualizando os dados. Aguarde ...');

      this.userService.updateUser(this.perfilForm.value.id, this.perfilForm.value).then(
        sucesso => {
          this.alertService.presentAlert('Perfil', 'Perfil atualizado com sucesso!', ['OK']);
          this.loadingService.dismiss();
        },
        error => {
          this.alertService.presentAlert('Perfil', 'Perfil não foi atualizado! ' + error, ['OK']);
        }
      );

    }
  }

  getBairros() {
    this.loadingService.present();

    this.destinoService.getBairrosDestinos().subscribe(
      bairro => {
        this.bairros = bairro;
        this.loadingService.dismiss();
      },
      error => {
        this.alertService.presentAlert('', 'Desculpe não foi possível carregar os dados!', ['OK']);
      }
    );
  }

  deletarperfil(mostrarMsg: boolean) {
    if (!mostrarMsg) {
      this.presentAlertConfirm();
    } else {
      this.userService.deleteUsers(this.user['$key']).then(
        () => {
          // Chamando a função para deletar o usuario da tabela de autenticacao do firestone
          this.authenticationService.deleteProfile();
          this.router.navigate(['login']);
        },
        error => {
          this.alertService.presentAlert('', 'Desculpe não foi possível deletar o perfil! ' + error, ['OK']);
        }
      );
    }

  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }

}
