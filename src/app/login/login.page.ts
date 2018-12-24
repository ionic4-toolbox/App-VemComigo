import { Router } from '@angular/router';
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

export class LoginPage implements OnInit {
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

  ngOnInit() { }

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
      this.loadingService.present('Aguarde ...')
      this.authService.signWithEmail(this.credentias).then(
        data => {
          console.log('Logado' + data);
          this.storage.set('userAtual', data)
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
        // alert('Dados: ' + JSON.stringify(response));
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
        this._firebaseAuth.auth.signInWithCredential(facebookCredential).then((dados) => {
          // alert('Dados: ' + JSON.stringify(dados));
          // Cadastrando o usuario que veio do facebook
          const users = {
            id: dados.uid,
            nome: dados.displayName,
            sobrenome: dados.displayName,
            turma: '',
            horario: '',
            email: dados.email,
            telefone: 99999999
          };

          // alert('dados: ' + JSON.stringify(users));

          this.userService.addUsers(users).then(
            data => {
              console.log('Resultado da inserção: ', data);
            },
            error => console.log('Erros encontrados: ', error)
          );

          // Guardando os dados na sessão
          // this.storage.set('userCurrent', JSON.stringify(dados));
          this.authService.signInWithFacebook(dados);
          this.router.navigateByUrl('/home');
          // this.router.navigateByUrl('/home');
        });

      }).catch((error) => { alert('Error: ' + error); });
  }

  logar(usuario: Usuario) {
    this.router.navigateByUrl('/home');
    this.authService.signInWithFacebook(usuario);
  }

  facebookWeb() {
    this.authService.signInWithFacebookWeb();
  }


}
