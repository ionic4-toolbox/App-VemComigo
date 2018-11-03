import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-ajuda',
  templateUrl: 'ajuda.page.html',
  styleUrls: ['ajuda.page.scss']
})
export class AjudaPage {
  information: any[];

  constructor(public navCtrl: NavController, private http: Http) {
    const localData = http.get('assets/data/information.json').pipe(
      map(res => res.json().items)
    );

    localData.subscribe(data => {
      this.information = data;
    });

  }

  myHeaderFn(record, recordIndex, records) {
    if (recordIndex % 20 === 0) {
      return 'Header ' + recordIndex;
    }
    return null;
  }

  toggleSection(i) {
    this.information[i].open = !this.information[i].open;
  }

  toggleItem(i, j) {
    this.information[i].children[j].open = !this.information[i].children[j].open;
  }

}
