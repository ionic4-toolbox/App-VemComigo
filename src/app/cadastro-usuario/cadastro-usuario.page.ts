import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DestinoService } from '../service/destinos.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { LoadingService } from '../service/loading.service';
import { AlertService } from '../service/alert.service';
import { UserService } from '../service/user.service';
import { User } from '../models/user.model';

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
    private storage: Storage,
    private userService: UserService
  ) {
    this.cadUserForm = this.fb.group(
      {
        destino: [''],
        horarioOrigemSaida: [''],
        numCelular: [''],
        meioTransporte: [''],
        pontoEncontro: [''],
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
        
        // Cadastrando os dados do usuario que vem desta tela
        let objUser = JSON.parse(data);
        // console.log(objUser.user, objUser.user.uid, objUser.user.email);
        this.updateUser(objUser.user.uid, objUser.user.email, this.cadUserForm.value.numCelular);

        // Cadastrando o destino do usuário
        this.cadUserForm.controls['idUser'].setValue({'userId': data});
        this.destinoService.addDestino(this.cadUserForm.value);
        this.router.navigateByUrl('/login');
        this.alertService.presentAlert('', 'Usuário cadastrado com sucesso!', ['OK'])

      }
    );
  }

  updateUser(pId: string, pEmail: string, pTel: string): void {
    let user = { id: pId, nome: '', email: pEmail, telefone: pTel };
    console.log(user);
    this.userService.addUsers(user).then(
      data => {
        console.log('Resultado da inserção: ', data);
      },
      error => console.log('Erros encontrados: ', error)
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
