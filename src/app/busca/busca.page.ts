import { Component, OnInit } from '@angular/core';
import { DestinoService } from '../service/destinos.service';
import { Observable } from 'rxjs';
import { Destino } from './../models/destino.model';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.page.html',
  styleUrls: ['./busca.page.scss'],
})
export class BuscaPage implements OnInit {
  destinos: Destino[];

  constructor(private destinoService: DestinoService) { }

  ngOnInit() {
    this.destinoService.getDestinos().subscribe(data => {
      this.destinos = data;
      console.log(data);
    });
  }

}
