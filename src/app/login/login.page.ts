import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from '../service/authentication.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  credentias: { email: any; password: any };
  loading: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    public alertController: AlertController,
    private navCtrl: NavController,
    public loadingController: LoadingController
  ) {

    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ngOnInit() { }


  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      header: 'Atenção',
      // subHeader: 'Subtitle',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Aguarde ...',
      duration: 2000
    });
    return await loading.present();
  }


  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onLogin() {

    this.submitted = true;
    this.credentias = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    if (this.loginForm.invalid) {
      return;
    } else {
      this.presentLoading();
      this.authService.signWithEmail(this.credentias).then(
        () => {
          console.log('Logado');
        },
        error => {
          console.log('Erros encontrados: ', error.code);

          if (error.code === 'auth/wrong-password') {
            // console.log(error.message);
            this.presentAlert('Usuário ou senha invalido.');
          } else if ( error.code === 'auth/user-not-found' ) {
            // console.log(error.message);
            this.presentAlert('Não há registro de usuário correspondente a este identificador.');
          } else {
            // console.log(error.message);
            this.presentAlert('Erro encontrado: ' + error.message);
          }
        }
      );
      // this.presentAlert();
      this.navCtrl.navigateRoot('/home');
    }
  }

  loginFacebook() {
    console.log('Login com facebook');
  }

}