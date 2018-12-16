import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DestinoService } from '../service/destinos.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { LoadingService } from '../service/loading.service';
import { AlertService } from '../service/alert.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.page.html',
  styleUrls: ['./cadastro-usuario.page.scss']
})

export class CadastroUsuarioPage implements OnInit {
  
  cadUserForm: FormGroup;
  isLoading = false;
  bairros: Object;

  constructor(
    private fb: FormBuilder,
    private destinoService: DestinoService,
    public alertService: AlertService,
    public loadingService: LoadingService,
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

  onSubmit() {
    this.storage.get('userCad').then(
      (data: any) => {
        this.cadUserForm.controls['idUser'].setValue({'userId': data});
        this.destinoService.addDestino(this.cadUserForm.value);
        this.router.navigateByUrl('/login');
        this.alertService.presentAlert('', 'Usuário cadastrado com sucesso!', ['OK'])
      }
    );
  }

  getBairros() {
    this.loadingService.present();
      
    this.destinoService.getBairrosDestinos().subscribe(
      bairro => {
        this.bairros = bairro;
        this.loadingService.dismiss();
      }, 
      error=> {
        this.alertService.presentAlert('', 'Desculpe não foi possível carregar os dados!', ['OK'])
      } 
    );
  }

}
