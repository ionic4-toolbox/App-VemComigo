import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DestinoService } from '../service/destinos.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Bairro } from '../models/bairro.model';

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
    // Lista todos os destinos encontrados
    this.getBairros();
    console.log(this.bairros);
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
        // this.cadUserForm.controls['idUser'].setValue({'userId': data});
        console.log(this.cadUserForm.value);
        // , this.cadUserForm.value.idUser
        this.destinoService.addDestino(this.cadUserForm.value);
        // .then(

        //   data => {

        //     this.router.navigateByUrl('/login');
        //     this.presentAlert();

        //   },

        //   error => console.log('Erros encontrados: ', error)
        // );

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
