import { Destino } from './../models/destino.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

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
export class PerfilPage implements OnInit {
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
    private camera: Camera,
    private storage: Storage,
    public alertService: AlertService,
    public loadingService: LoadingService,
    private destinoService: DestinoService
  ) {

    this.perfilForm = fb.group({
      id: [''],
      nome: [''],
      destino: [""],
      horarioOrigemSaida: [''],
      email: [''],
      telefone: ['']
    });

  }

  portChange(event: {
    component: IonicSelectableComponent,
    value: any 
  }) {
    console.log('port:', event.value);
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
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'SIM',
          handler: () => {
            console.log('Confirm Okay');
            this.deletarperfil(true);
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnInit(): void {

    this.getBairros();


    this.storage.get('userCurrent').then(
      (data: any) => {
        const usuario = JSON.parse(data);
        this.userService.getUsersId(usuario.email || usuario.user.email).subscribe(users => {
          
          this.user = users[0];
          
          this.storage.set('userAtual', JSON.stringify(this.user));
          if (users) {
            console.log('Dados usuario: ', this.user.destino) 
            if (this.user['$key']) {
              this.perfilForm.reset();
              this.perfilForm.controls['id'].setValue(this.user['$key']);
              this.perfilForm.controls['nome'].setValue(this.user.nome);
              this.perfilForm.controls['destino'].patchValue(this.user.destino);
              this.perfilForm.controls['horarioOrigemSaida'].setValue(this.user.horario_saida);
              this.perfilForm.controls['email'].setValue(this.user.email);
              this.perfilForm.controls['telefone'].setValue(this.user.telefone);
              console.log('Dados usuario: ', this.perfilForm.value, this.user);
            }
          } else {
            this.router.navigate(['login']);
          }

          // Pegando o bairro cadastrado e setando no select - Erro não esta funcionando corrigir aqui
          // this.destinoService.getDestinosId(this.user['email']).subscribe(destinos => {
          //   this.destinos = destinos[0];
          //   this.perfilForm.controls['destino'].setValue(destinos[0].destino['id']);
           console.log('Destinos: ', this.perfilForm.controls['destino'].value);
          // })

        });
      }
    ).catch((error => {
      this.alertService.presentAlert('Atenção', 'Não foi possivel carregar os dados' + error, ['OK']);
    }));
  }

  get form () {
    return this.perfilForm.controls;
  }


  tirarFoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
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
        console.log(bairro)
        this.bairros = bairro;
        this.loadingService.dismiss();
      }, 
      error=> {
        this.alertService.presentAlert('', 'Desculpe não foi possível carregar os dados!', ['OK'])
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
        error => console.log('Error: ', error)
      );
    }

  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }

  
}
