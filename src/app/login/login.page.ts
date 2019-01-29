import { Router, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Facebook } from '@ionic-native/facebook/ngx';
import * as firebase from 'firebase/app';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from 'angularfire2/auth';

import { User } from '../models/user.model';
import { UserService } from '../service/user.service';
import { AlertService } from './../service/alert.service';
import { LoadingService } from './../service/loading.service';
import { AuthenticationService } from '../service/authentication.service';

const TOKEN_KEY = 'auth-token';

export class Model {
  constructor(objeto?) {
    Object.assign(this, objeto);
  }
}

export class Usuario extends Model {
  codigo: number;
  nome: string;
  email: string;
  login: string;
  senha: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})

export class LoginPage {
  loginForm: FormGroup;
  submitted = false;
  credentias: { email: any; password: any };
  loading: any;
  user: User;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    public alertService: AlertService,
    private navCtrl: NavController,
    public loadingService: LoadingService,
    public facebook: Facebook,
    private router: Router,
    private storage: Storage,
    private _firebaseAuth: AngularFireAuth,
    private userService: UserService
  ) {
    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onLogin() {
    this.submitted = true;
    this.credentias = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    if (this.loginForm.invalid) {
      return;
    } else {
      this.loadingService.present('Aguarde ...');
      this.authService.signWithEmail(this.credentias).then(
        data => {
          this.storage.set('userAtual', data);
        },
        error => {
          if (error.code === 'auth/wrong-password') {
            this.alertService.presentAlert('Atenção', 'Usuário ou senha invalido.', ['OK']);
          } else if (error.code === 'auth/user-not-found') {
            this.alertService.presentAlert('Atenção', 'Não há registro de usuário correspondente a este identificador.', ['OK']);
          } else {
            this.alertService.presentAlert('Atenção', 'Erro encontrado: ' + error.message, ['']);
          }
        }
      );
      this.navCtrl.navigateRoot('/home');
    }
  }

  facebookLogin() {

    let permissions = new Array<string>();
    permissions = ['public_profile', 'email'];

    return this.facebook.login(permissions)
      .then(response => {

        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);

        this._firebaseAuth.auth.signInWithCredential(facebookCredential).then((dados) => {

          const users = {
            id: dados.uid,
            nome: dados.displayName,
            email: dados.email,
            destino: '',
            horario_saida: '',
            telefone: '',
            transporte: '',
            ponto_encontro: ''
          };

          this.userService.addUsers(users).then(
            data => {
              // this.alertService.presentAlert('Atenção', 'Resultado da inserção: ' + data, ['OK']);
            },
            error => {
              this.alertService.presentAlert('Atenção', 'Error não foi possivel cadastrar o usuário' + error, ['OK']);
            }
          );

          this.authService.signInWithFacebook(dados);

          if ( users.id ) {
            let navigationExtras: NavigationExtras = {
              queryParams: { 'user': JSON.stringify(users) }
            };
            this.router.navigate(['cadastro-usuario'], navigationExtras);
          }

        });

      }).catch((error) => {
        this.alertService.presentAlert('Erro', 'Não foi possivel conectar no facebook', ['OK']);
      });
  }


  logar(usuario: Usuario) {
    this.router.navigateByUrl('/home');
    this.authService.signInWithFacebook(usuario);
  }

  facebookWeb() {
    this.authService.signInWithFacebookWeb();
  }


}
