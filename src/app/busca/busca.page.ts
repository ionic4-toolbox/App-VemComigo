import { User } from './../models/user.model';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { Destino } from './../models/destino.model';
import { DestinoService } from '../service/destinos.service';
import { LoadingService } from './../service/loading.service';
import { AlertService } from './../service/alert.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.page.html',
  styleUrls: ['./busca.page.scss'],
})
export class BuscaPage implements OnInit {
  btnBuscar = true;
  destinos: Destino[];
  MostraBtnVoltar: boolean;
  user: User[];
  filterDados: User[];
  filterUser: User[];
  
  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private destinoService: DestinoService,
    private userService: UserService,
    private storage: Storage
  ) { }

  ionViewWillEnter() {

    this.loadingService.present();
    this.MostraBtnVoltar = false;

    // Pegando os dados de quem esta logado
    this.storage.get('userAtual').then((user) => {
      const usuario = JSON.parse(user);
      console.log('dados user: ', usuario.email, usuario.destino.nome);

      this.userService.getUsersMatch(usuario.email, usuario.destino).subscribe(dados => {

        this.filterUser = dados.filter((data) => {
          console.log('xxx: ', data.email, usuario.ssds, data.email !== usuario.email);
          return data.email !== usuario.destino;
        });
        console.log('teste', this.filterUser);
        this.user = this.filterUser;
      });

      // Buscando os dados de acordo com a seguinte regra:
      /*
        Buscar todos os usuarios diferentes do usuario logado, mas que tem o destino em comum
      */

      // this.userService.getUsers().subscribe(dados => {
      //   this.user = dados;
      //   this.loadingService.dismiss();
      // }, error => {
      //   this.alertService.presentAlert('Atenção', 'Erro ao buscar os destinos: ' + error, ['OK']);
      // });

      // this.destinoService.getDestinos().subscribe(
      //   (data: any) => {
      //     this.destinos = data;
      //     this.loadingService.dismiss();
      //   },
      //   error => {
      //     this.alertService.presentAlert('Atenção', 'Erro ao buscar os destinos: ' + error, ['OK'])
      //   });

    });

  }

  ionViewDidLoad() {}

  ngOnInit() {}

  exibirBusca(pMostraBusca: boolean, pMostraBtnVoltar: boolean) {
    this.btnBuscar = pMostraBusca;
    this.MostraBtnVoltar = pMostraBtnVoltar;
  }

  editar() {
    this.navCtrl.navigateRoot('/home/tabs/(perfil:perfil)');
  }

  ajuda() {
    this.navCtrl.navigateRoot('/home/tabs/(ajuda:ajuda)');
  }

}
