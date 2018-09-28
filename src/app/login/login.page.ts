import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
// import { AuthenticationService } from '../../services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { User } from '../../model/user.model';
import { LoadingController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  // user: User[];
  credentias: { email: any; password: any };
  loading: any;

  constructor(
    private fb: FormBuilder,
    // private authService: AuthenticationService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private navCtrl: NavController
  ) {

    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ngOnInit() { }

  onLogin() {
    console.log('Teste');
    this.navCtrl.navigateRoot('/home');
  }

}
