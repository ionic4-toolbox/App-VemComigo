import { Component, OnInit } from '@angular/core';
import { DestinoService } from '../service/destinos.service';
import { Destino } from './../models/destino.model';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.page.html',
  styleUrls: ['./busca.page.scss'],
})
export class BuscaPage implements OnInit {
  btnBuscar = true;
  destinos: Destino[];

  constructor(private destinoService: DestinoService) { }

  ngOnInit() {
    this.destinoService.getDestinos().subscribe(data => {
      this.destinos = data;
      console.log(data);
    });
  }

  exibirBusca(param: boolean) {
    this.btnBuscar = false;
  }
}
