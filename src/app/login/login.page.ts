import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AlertController } from "@ionic/angular";
import { AuthenticationService } from "../service/authentication.service";
import { LoadingController } from "@ionic/angular";
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook/ngx";
import * as firebase from "firebase/app";
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from "angularfire2/auth";

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
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
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
    public loadingController: LoadingController,
    public facebook: Facebook,
    private router: Router,
    private storage: Storage,
    private _firebaseAuth: AngularFireAuth
  ) {
    this.loginForm = fb.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

  ngOnInit() { }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      header: "Atenção",
      message: msg,
      buttons: ["OK"]
    });

    await alert.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: "Aguarde ...",
      duration: 2000
    });
    return await loading.present();
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
      this.presentLoading();
      this.authService.signWithEmail(this.credentias).then(
        () => {
          console.log("Logado");
        },
        error => {
          console.log("Erros encontrados: ", error.code);

          if (error.code === "auth/wrong-password") {
            this.presentAlert("Usuário ou senha invalido.");
          } else if (error.code === "auth/user-not-found") {
            this.presentAlert(
              "Não há registro de usuário correspondente a este identificador."
            );
          } else {
            this.presentAlert("Erro encontrado: " + error.message);
          }
        }
      );
      this.navCtrl.navigateRoot("/home");
    }
  }

  facebookLogin() {

    let permissions = new Array<string>();
    permissions = ["public_profile", "email"];

    return this.facebook.login(permissions)
      .then(response => {

        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);        
        this._firebaseAuth.auth.signInWithCredential(facebookCredential).then((dados) => {
          // Guardando os dados na sessão
          this.storage.set('userCurrent', JSON.stringify(dados));
          this.router.navigateByUrl("/home");
        });

      }).catch((error) => { alert('Error: ' + error); });
  }

  // Mobile
  // facebookLogin() {
  //   let permissions = new Array<string>();
  //   permissions = ["public_profile", "email"];

  //   this.facebook.login(permissions).then((response) => {
  //     let params = new Array<string>();

  //     this.facebook.api("/me?fields=name,email", params)
  //       .then(res => {

  //         //estou usando o model para criar os usuarios
  //         let usuario = new Usuario();
  //         usuario.nome = res.name;
  //         usuario.email = res.email;
  //         usuario.senha = res.id;
  //         usuario.login = res.email;

  //         // Salvando no storage


  //         alert(usuario);  
  //         this.logar(usuario);
  //         this.presentLoading();

  //       }, (error) => {
  //         alert(error);
  //         console.log('ERRO LOGIN: ', error);
  //       })
  //   }, (error) => {
  //     alert(error);
  //   });
  // }

  logar(usuario: Usuario) {
    this.router.navigateByUrl("/home");
    this.authService.signInWithFacebook(usuario);
  }

  facebookWeb() {
    this.authService.signInWithFacebook();
  }

}
