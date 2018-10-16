import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  signupError: string;
  registerForm: FormGroup;
  submitted = false;

  constructor(
    fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private alertController: AlertController,
    private router: Router
  ) {
    this.registerForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      passwordConfirmation: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      header: 'Cadastro de usuário',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {

    this.submitted = true;

    // Se o form é invalido pula fora
    if (this.registerForm.invalid) {
      return;
    } else {
      const data = this.registerForm.value;
      const credentials = {
        email: data.email,
        password: data.password
      };
      console.log(credentials);
      this.authenticationService.signUp(credentials).then(
        () => {
          console.log('cadastrado', data);
          // this.presentAlert('Usuário cadastrado com sucesso!');
          this.router.navigateByUrl('cadastro-usuario');
        },
        error => {
          this.signupError = error.message;
          console.log('Erros encontrados: ', this.signupError);
          this.presentAlert('O endereço de e-mail já está sendo usado por outra conta.');
          this.registerForm.reset();
        }
      );
    }

  }

}
