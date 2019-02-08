import { User } from './../models/user.model';
import { Component } from '@angular/core';
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
  styleUrls: ['./busca.page.scss']
})
export class BuscaPage {
  btnBuscar = true;
  destinos: Destino[];
  MostraBtnVoltar: boolean;
  user: User[];

  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private destinoService: DestinoService,
    private userService: UserService,
    private storage: Storage
  ) {}

  ionViewWillEnter() {
    this.loadingService.present();
    this.MostraBtnVoltar = false;
    this.btnBuscar = true;
    // this.getUser();
  }

  getUser() {
    // Pegando os dados de quem esta logado
    this.storage.get('userAtual').then((user: any) => {
      const usuario = JSON.parse(user);
      let filterUser: User[];
      if ( usuario ) {
        this.userService.getUsersMatch(usuario.email, usuario.destino).subscribe(
          dados => {
            filterUser = dados.filter(data => usuario.email !== data.email);
            this.user = filterUser;
          },
          error => {
            this.alertService.presentAlert('Atenção', 'Erro ao buscar os destinos: ' + error, ['OK']);
          }
        );
      }
    });
  }

  exibirBusca(pMostraBusca: boolean, pMostraBtnVoltar: boolean) {
    this.getUser();
    this.btnBuscar = pMostraBusca;
    this.MostraBtnVoltar = pMostraBtnVoltar;
  }

  verificaDados() {
    return this.user.length;
  }

  editar() {
    this.navCtrl.navigateRoot('/home/tabs/(perfil:perfil)');
  }

  ajuda() {
    this.navCtrl.navigateRoot('/home/tabs/(ajuda:ajuda)');
  }

}
