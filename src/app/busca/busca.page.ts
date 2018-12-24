import { User } from './../models/user.model';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { Destino } from './../models/destino.model';
import { DestinoService } from '../service/destinos.service';
import { LoadingService } from './../service/loading.service';
import { AlertService } from './../service/alert.service';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.page.html',
  styleUrls: ['./busca.page.scss'],
})
export class BuscaPage implements OnInit {
  btnBuscar = true;
  destinos: Destino[];
  MostraBtnVoltar: boolean;
  user: User;

  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private destinoService: DestinoService,
    private storage: Storage
  ) { }

  ionViewWillEnter() {
    console.log('Carreguei a página + ionViewWillEnter()')
    this.loadingService.present();
    this.MostraBtnVoltar = false;

    // Pegando os dados de quem esta logado 
    this.storage.get('userAtual').then((user)=> {
      this.user = user;
      console.log(user.destino);
      // Buscando os destinos
      this.destinoService.getDestinos(user.destino).subscribe(
        (data: any) => {
          this.destinos = data;
          console.log(data);
          this.loadingService.dismiss();
        },
        error => {
          this.alertService.presentAlert('Atenção', 'Erro ao buscar os destinos: ' + error, ['OK'])
        });
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
