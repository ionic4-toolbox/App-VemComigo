import { User } from './../models/user.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DestinoService } from '../service/destinos.service';
import { Router, ActivatedRoute } from '@angular/router';

import { Transporte } from '../models/transporte.model';
import { LoadingService } from '../service/loading.service';
import { AlertService } from '../service/alert.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.page.html',
  styleUrls: ['./cadastro-usuario.page.scss']
})
export class CadastroUsuarioPage implements OnInit {
  cadUserForm: FormGroup;
  isLoading = false;
  bairros: Object;
  transporte: Transporte[];

  user = {
      id: '',
      nome: '',
      email: '',
      destino: '',
      horario_saida: '',
      telefone: '',
      transporte: '',
      ponto_encontro: '',
      horarioOrigemSaida: ''
  };

  constructor(
    private fb: FormBuilder,
    private destinoService: DestinoService,
    public alertService: AlertService,
    public loadingService: LoadingService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {
    this.cadUserForm = this.fb.group({
      destino: [''],
      horarioOrigemSaida: [''],
      numCelular: [''],
      meioTransporte: [''],
      pontoEncontro: [''],
      user: ['']
    });
  }

  ngOnInit() {

    // Carregando os meios de transporte
    this.transporte = [{ id: 1, nome: 'Carro'}, { id: 2, nome: 'Ônibus'}];

    // Pega os dados do registro inserido na tela de cadastro de usuario
    this.activatedRoute.queryParams.subscribe(params => {
      const pUser = JSON.parse(params['user']);
      this.user.id = pUser.user['uid'] || 0;
      this.user.nome = pUser.user['displayName'];
      this.user.email = pUser.user['email'];
      this.user.telefone = pUser.user['phoneNumber'] || 0;

    });

    // Carrega a listagem de bairros
    this.getBairros();
  }

  onSubmit() {
    // Mudando o valor do numero do telefone de acordo com o formulario de destino
    this.user.destino = this.cadUserForm.value.destino;
    this.user.horarioOrigemSaida = this.cadUserForm.value.horarioOrigemSaida;
    this.user.telefone = this.cadUserForm.value.numCelular;
    this.user.transporte = this.cadUserForm.value.meioTransporte;
    this.user.ponto_encontro = this.cadUserForm.value.pontoEncontro;

    // Cadastrando os dados do usuario que vem desta tela
    this.addUser();

    // Cadastrando o destino do usuário
    this.cadUserForm.controls['user'].setValue(this.user);
    this.destinoService.addDestino(this.cadUserForm.value);
    this.router.navigateByUrl('/login');
    this.alertService.presentAlert('', 'Usuário cadastrado com sucesso!', ['OK']);
  }

  addUser(): void {

    this.userService.addUsers(this.user).then(
      data => {
        // console.log('Resultado da inserção: ', data);
      },
      error => {
        this.alertService.presentAlert('', 'Não foi possível adicionar o usuário: ' + error, ['OK']);
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
      error => {
        this.alertService.presentAlert('', 'Desculpe não foi possível carregar os dados!' + error, ['OK']);
      }
    );
  }
}
