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

@Injectable()
export class DestinoService {
  // colecction
  private _destinoCollection: AngularFirestoreCollection<Destino>;
  private destinoDoc: AngularFirestoreDocument<Destino>;
  // Observables
  destinos: Observable<Destino[]>;
  countItems: number;

  constructor(private _af: AngularFirestore) {
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

  addDestino(destino: Destino, userId: string) {
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
