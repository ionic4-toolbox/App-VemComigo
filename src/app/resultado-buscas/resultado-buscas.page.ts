import { Component, OnInit } from '@angular/core';
import { DestinoService } from '../service/destinos.service';
import { Destino } from './../models/destino.model';

@Component({
  selector: 'app-resultado-buscas',
  templateUrl: './resultado-buscas.page.html',
  styleUrls: ['./resultado-buscas.page.scss'],
})
export class ResultadoBuscasPage implements OnInit {
  destinos: Destino[];

  constructor(private destinoService: DestinoService) { }

  ngOnInit() {
    this.destinoService.getDestinos().subscribe(data => this.destinos = data);
  }

}
