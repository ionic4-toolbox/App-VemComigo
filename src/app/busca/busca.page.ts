import { Component, OnInit } from '@angular/core';
import { DestinoService } from '../service/destinos.service';
import { Destino } from './../models/destino.model';
import { NavController } from '@ionic/angular';
import { PerfilPage } from '../perfil/perfil.page';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.page.html',
  styleUrls: ['./busca.page.scss'],
})
export class BuscaPage implements OnInit {
  btnBuscar = true;
  destinos: Destino[];
  MostraBtnVoltar: boolean;

  constructor(
    private destinoService: DestinoService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.MostraBtnVoltar = false;
    this.destinoService.getDestinos().subscribe(
      (data: any) => {
        this.destinos = data;
      },
      error => {
        console.log('Erro ao buscar os destinos');
      });
  }

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
