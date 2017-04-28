import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-ver-mas-alojamiento',
  templateUrl: 'ver-mas-alojamiento.html'
})

export class VerMasAlojamientoPage {

  alojamiento:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController) {
    this.alojamiento = this.navParams.get( "alojamiento" );
  }

  close(){
    this.viewCtrl.dismiss();
  }

}
