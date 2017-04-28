import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-ver-mas-establecimiento',
  templateUrl: 'ver-mas-establecimiento.html'
})
export class VerMasEstablecimientoPage {

  establecimiento:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.establecimiento = this.navParams.get( "establecimiento" );
  }

  close(){
    this.viewCtrl.dismiss();
  }

}
