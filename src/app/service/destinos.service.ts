import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Destino } from '../models/destino.model';
import { Viagens } from './../models/viagens.model';
import { config } from '../app.config';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DestinoService {
  configUrl = 'http://servicodados.ibge.gov.br/api/v1/localidades/estados/35/municipios';

  // colecction
  private _destinoCollection: AngularFirestoreCollection<Destino>;
  private destinoDoc: AngularFirestoreDocument<Destino>;
  private _viagensCollection: AngularFirestoreCollection<Viagens>;
  private viagensDoc: AngularFirestoreDocument<Viagens>;

  // Observables
  destinos: Observable<Destino[]>;
  viagens: Observable<Viagens[]>;
  countItems: number;

  constructor(private _af: AngularFirestore, private http: HttpClient) {
    
    this._destinoCollection = _af.collection<Destino>( config.collection_endpoint_destinos );
    this.destinos = this._destinoCollection.valueChanges();

    this._viagensCollection = _af.collection<Viagens>(config.collection_endpoint_viagens);
    this.viagens = this._viagensCollection.valueChanges();
    
  }

  getDestinos() {
    this.destinos = this._destinoCollection.snapshotChanges().pipe(
      map(actions => {
        this.countItems = actions.length;
        console.log(this.countItems);
        return actions.map(action => ({
          $key: action.payload.doc.id,
          ...action.payload.doc.data()
        }));
      })
    );
    console.log(this.destinos);
    return this.destinos;
  }

  getBairrosDestinos() {
    return this.http.get(this.configUrl);
  }

  addDestino(destino: Destino, userId?: string) {
    
    // Viagens
    this.viagensDoc = this._af.doc<Viagens>(`${config.collection_endpoint_viagens}/${userId}`);
    // this.destinoDoc.set(this.viagens);

    return this._destinoCollection.add(destino);
    
  }

  updateDestino(id: number, destino: Destino) {
    this.destinoDoc = this._af.doc<Destino>(`${config.collection_endpoint}/${id}`);
    this.destinoDoc.update(destino);
  }

  deleteUsers(id) {
    this.destinoDoc = this._af.doc<Destino>(`${config.collection_endpoint}/${id}`);
    this.destinoDoc.delete();
  }


}
