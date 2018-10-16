import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DestinoService } from '../service/destinos.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.page.html',
  styleUrls: ['./cadastro-usuario.page.scss']
})
export class CadastroUsuarioPage implements OnInit {

  cadUserForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private destinoService: DestinoService,
    public alertController: AlertController,
    private router: Router
  ) {
    this.cadUserForm = this.fb.group(
      {
        origem: ['teste'],
        horarioOrigemSaida: ['teste'],
        numCelular: ['teste'],
        destino: ['teste'],
        horarioDestinoSaida: ['teste'],
      }
    );
  }

  ngOnInit() { }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Atenção',
      message: 'Usuário cadastrado com sucesso!',
      buttons: ['OK']
    });

    await alert.present();
  }

  onSubmit() {

    console.log('Dados do formulario: ', this.cadUserForm.value);
    this.destinoService.addDestino(this.cadUserForm.value).then(

      data => {
        console.log('Dados', data);
        this.router.navigateByUrl('/login');
        this.presentAlert();
      },
      error => console.log('Erros encontrados: ', error)
    );

  }

}
