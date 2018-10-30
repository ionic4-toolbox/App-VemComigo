import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

import { User } from '../models/user.model';

import { UserService } from '../service/user.service';
import { AuthenticationService } from '../service/authentication.service';
import { Storage } from '@ionic/storage';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

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
    private alertController: AlertController,
    private camera: Camera,
    private facebook: Facebook,
    private storage: Storage,
  ) {
    this.perfilForm = fb.group({
      id: [''],
      nome: [''],
      Destino: [''],
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

    let dadosUser = this.storage.get('userCurrent').then(
      (data: any) => {
        
        if (data) {
          console.log('Valor do usuario logado' + data);
 
          // this.userService.getUsersId(data.email || data['email']).subscribe(users => {
          //   this.user = users[0];
          //   if (users[0]) {
          //     if (this.user['$key']) {
          //       this.perfilForm.reset();
          //       this.perfilForm.controls['id'].setValue(this.user['$key']);
          //       this.perfilForm.controls['nome'].setValue(this.user['nome']);
          //       this.perfilForm.controls['Destino'].setValue(this.user['Destino']);
          //       this.perfilForm.controls['horario'].setValue(this.user['horario']);
          //       this.perfilForm.controls['email'].setValue(this.user['email']);
          //       this.perfilForm.controls['telefone'].setValue(this.user['telefone']);
          //     }
          //   } else {
          //     this.router.navigate(['login']);
          //   }
          // });
        }

      }
    )
    alert()

    // this.authenticationService.getProfile().subscribe(data => {
    //   // alert(JSON.stringify(data));
    //   if (data) {
    //     this.userService.getUsersId(data.email || data['email']).subscribe(users => {
    //       this.user = users[0];
    //       if (users[0]) {
    //         if (this.user['$key']) {
    //           this.perfilForm.reset();
    //           this.perfilForm.controls['id'].setValue(this.user['$key']);
    //           this.perfilForm.controls['nome'].setValue(this.user['nome']);
    //           this.perfilForm.controls['Destino'].setValue(this.user['Destino']);
    //           this.perfilForm.controls['horario'].setValue(this.user['horario']);
    //           this.perfilForm.controls['email'].setValue(this.user['email']);
    //           this.perfilForm.controls['telefone'].setValue(this.user['telefone']);
    //         }
    //       } else {
    //         this.router.navigate(['login']);
    //       }
    //     });
    //   }
    // });

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

  deletarperfil(mostrarMsg: boolean) {

    if (!mostrarMsg) {
      this.presentAlertConfirm();
    } else {
      this.userService.deleteUsers(this.user['$key']).then(
        () => {
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
