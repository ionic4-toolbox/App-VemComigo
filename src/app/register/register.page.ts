import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from '../service/authentication.service';
import { User } from '../models/user.model';
import { Credenciais } from '../models/credenciais.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage {
  user: User;
  signupError = '';
  submitted = false;
  credenciais: Credenciais;
  registerForm: FormGroup;


  constructor(
    fb: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {
    this.registerForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      passwordConfirmation: ['', Validators.compose([Validators.required, Validators.minLength(6)])
      ]
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
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    } else {
      const data = this.registerForm.value;
      this.credenciais = { email: data.email, password: data.password };

      this.authenticationService.signUp(this.credenciais).then(
        (data: any) => {
          if ( data ) {
            this.cadastrarEmailUsuario(data.user.email, data.user.uid);

            this.router.navigateByUrl('cadastro-usuario');
          }
        },
        error => {
          this.signupError = error.message;
          this.presentAlert('O endereço de e-mail já está sendo usado por outra conta.');
          this.registerForm.reset();
        }
      );

    }
  }

  cadastrarEmailUsuario(pEmail: string, pUid: string): void {

    this.user = { id: pUid, nome: '', email: pEmail, telefone: '' };

    this.userService.addUsers(this.user).then(
      data => {
        console.log('Resultado da inserção: ', data);
      },
      error => console.log('Erros encontrados: ', error)
      );
  }

}
