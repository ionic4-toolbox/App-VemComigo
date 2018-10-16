import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { config } from '../app.config';
import { User } from '../models/user.model';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class UserService {
  // colecction
  private _userCollection: AngularFirestoreCollection<User>;
  private userDoc: AngularFirestoreDocument<User>;

  // Observables
  users: Observable<User[]>;
  countItems: number;

  constructor(private _af: AngularFirestore) {
    this._userCollection = _af.collection<User>( config.collection_endpoint_user, x => x.orderBy('nome', 'asc'));
  }

  // Busca os dados dos usuários
  getUsers() {
    this.users = this._userCollection.snapshotChanges().pipe(
      map(actions => {
        this.countItems = actions.length;
        return actions.map(action => ({
          $key: action.payload.doc.id,
          ...action.payload.doc.data()
        }));
      })
    );
    console.log('Dados: ', this.users);
    return this.users;
  }

  getUsersId(email) {
    this._userCollection = this._af.collection<User>( config.collection_endpoint_user, x => x.where('email', '==' , email ));
    this.users = this._userCollection.snapshotChanges().pipe(
      map(actions => {
        this.countItems = actions.length;
        return actions.map(action => ({
          id: action.payload.doc.id,
          ...action.payload.doc.data()
        }));
      })
    );
    return this.users;

  }

  // Adiciona um novo usuario
  addUsers(user) {
    return this._userCollection.add(user);
  }

  // Atualiza os dados do usuário
  updateUser(id, update) {
    console.log(id, update);
    this.userDoc = this._af.doc<User>(
      `${config.collection_endpoint_user}/${id}`
    );
    return this.userDoc.update(update);
  }

  // Remove um usuário da base de dados
  deleteUsers(id) {
    this.userDoc = this._af.doc<User>(
      `${config.collection_endpoint_user}/${id}`
    );
    this.userDoc.delete();
  }

}
