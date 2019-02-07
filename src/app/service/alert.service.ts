import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(public alertController: AlertController) {}

  async presentAlert(titulo: string, msg: string, btns: any) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msg,
      buttons: btns
    });

    await alert.present();
  }

  async dismiss() {
    return await this.alertController.dismiss().then(() => console.log('dismissed'));
  }

}
