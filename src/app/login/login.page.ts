import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from '../service/authentication.service';

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
    private navCtrl: NavController
  ) {

    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ngOnInit() { }


  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Atenção',
      // subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
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

      this.authService.signWithEmail(this.credentias).then(
        () => {
          console.log('Logado');
        },
        error => {
          console.log('Erros encontrados: ', error.code);

          if (error.code === 'auth/wrong-password') {
            console.log(error.message);
          } else if ( error.code === 'auth/user-not-found' ) {
            console.log(error.message);
          } else {
            console.log(error.message);
          }
        }
      );
      // this.presentAlert();
      this.navCtrl.navigateRoot('/home');
    }
  }

}
