import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { UserService } from './user.service';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private user: Observable<firebase.User>;
  authenticationState = new BehaviorSubject(false);

  constructor(
    private storage: Storage,
    private plt: Platform,
    private _firebaseAuth: AngularFireAuth,
    private userService: UserService
  ) {
    this.user = _firebaseAuth.authState;
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    });
  }

  signUp(credentials) {
    return this._firebaseAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
  }

  signWithEmail(credentials) {
    return this._firebaseAuth.auth
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(data => {

        console.log('Dados: ', data);

        this.storage.set('userCurrent', JSON.stringify(data));
        this.storage.set(TOKEN_KEY, 'Bearer 1234567').then(() => {
          this.authenticationState.next(true);
        });
      });
  }

  signInWithGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    ).then(
      () => {
        this.storage.set(TOKEN_KEY, 'Bearer 1234567').then(() => {
          this.authenticationState.next(true);
        });
      }
    );
  }

  signInWithFacebook(data?: any): void {
    // alert('signInWithFacebook: ' + JSON.stringify(data))
    this.storage.set('userCurrent', JSON.stringify(data)).then(() => {
      this.authenticationState.next(true);
    });
    this.storage.set(TOKEN_KEY, 'Bearer 1234567').then(() => {
      this.authenticationState.next(true);
    });

  }

  signInWithFacebookWeb() {

    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    ).then(
      (dados: any) => {

        const dadosList = dados;

        // Cadastrando o usuario que veio do facebook
        const users = {
          id: dadosList.user.uid,
          nome: dadosList.user.displayName,
          sobrenome: dadosList.user.displayName,
          turma: '',
          horario: '',
          email: dadosList.user.email,
          telefone: 99999999
        };

        console.log('dados: ', dadosList.user);
        console.log('Destino: ', users);

        this.userService.addUsers(users).then(
          data => {
            console.log('Resultado da inserção: ', data);
          },
          error => console.log('Erros encontrados: ', error)
        );

        this.storage.set('userCurrent', JSON.stringify(dados)).then(() => {
          this.authenticationState.next(true);
        });

        this.storage.set(TOKEN_KEY, 'Bearer 1234567').then(() => {
          this.authenticationState.next(true);
        });

      }

    );

  }

  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  getProfile() {
    return this.user;
  }

}
