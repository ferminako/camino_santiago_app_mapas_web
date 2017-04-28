import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-ver-mas-contenido',
  templateUrl: 'ver-mas-contenido.html'
})

export class VerMasContenidoPage {

  contenido:any = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.contenido = this.navParams.get( "contenido" );
  }

  close(){
    this.viewCtrl.dismiss();
  }

  

}
