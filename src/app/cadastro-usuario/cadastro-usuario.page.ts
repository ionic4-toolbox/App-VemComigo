import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DestinoService } from '../service/destinos.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.page.html',
  styleUrls: ['./cadastro-usuario.page.scss']
})
export class CadastroUsuarioPage implements OnInit {

  cadUserForm: FormGroup;
  bairros: any;

  constructor(
    private fb: FormBuilder,
    private destinoService: DestinoService,
    public alertController: AlertController,
    private router: Router,
    private storage: Storage
  ) {

    this.cadUserForm = this.fb.group(
      {
        destino: [''],
        horarioOrigemSaida: [''],
        numCelular: [''],
        idUser: ['']
      }
    );

  }

  ngOnInit() {
    this.getBairros();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Atenção',
      message: 'Usuário cadastrado com sucesso!',
      buttons: ['OK']
    });

    await alert.present();
  }

  onSubmit() {
    this.storage.get('userCad').then(
      (data: any) => {
        this.cadUserForm.controls['idUser'].setValue({'userId': data});
        this.destinoService.addDestino(this.cadUserForm.value);
        this.router.navigateByUrl('/login');
        this.presentAlert();
      }
    );

  }


  getBairros() {
    this.destinoService.getBairrosDestinos()
    .subscribe( data => this.bairros = data
      // (data: Bairro) => this.bairros = {
      //   id: data['id'],
      //   nome:  data['nome']
      // }
    );
  }

}
