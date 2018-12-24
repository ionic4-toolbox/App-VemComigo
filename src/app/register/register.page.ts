import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from './../service/alert.service';

import { Credenciais } from '../models/credenciais.model';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage {
  signupError = '';
  submitted = false;
  credenciais: Credenciais;
  registerForm: FormGroup;

  constructor(
    fb: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private authenticationService: AuthenticationService
  ) {
    this.registerForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      passwordConfirmation: ['', Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
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
            let navigationExtras: NavigationExtras = {
              queryParams: { 'user': JSON.stringify(data) }
            };
            this.router.navigate(['cadastro-usuario'], navigationExtras);
          }
          
        },
        error => {
          this.signupError = error.message;
          this.alertService.presentAlert('Atenção', 'O endereço de e-mail já está sendo usado por outra conta.', ['OK']);
          this.registerForm.reset();
        }
      );
    }
  }

}
