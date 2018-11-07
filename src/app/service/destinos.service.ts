import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Destino } from '../models/destino.model';
import { config } from '../app.config';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DestinoService {
  configUrl = 'http://servicodados.ibge.gov.br/api/v1/localidades/estados/35/municipios';

  // colecction
  private _destinoCollection: AngularFirestoreCollection<Destino>;
  private destinoDoc: AngularFirestoreDocument<Destino>;

  // Observables
  destinos: Observable<Destino[]>;
  countItems: number;

  constructor(private _af: AngularFirestore, private http: HttpClient) {
    this._destinoCollection = _af.collection<Destino>( config.collection_endpoint , x => x.orderBy('origem', 'asc'));
    this.destinos = this._destinoCollection.valueChanges();
  }

  getDestinos() {
    this.destinos = this._destinoCollection.snapshotChanges().pipe(
      map(actions => {
        this.countItems = actions.length;
        return actions.map(action => ({
          $key: action.payload.doc.id,
          ...action.payload.doc.data()
        }));
      })
    );
    return this.destinos;
  }

  getBairrosDestinos() {
    return this.http.get(this.configUrl);
  }

  addDestino(destino: Destino) { // userId: string
    return this._destinoCollection.add(destino);
    // this.destinoDoc = this._af.doc<Destino>(`${config.collection_endpoint}/${userId}`);
    // this.destinoDoc.set(destino);
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
