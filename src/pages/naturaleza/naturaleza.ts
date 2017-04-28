import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SeccionPagePage } from '../seccion-page/seccion-page';

@Component({
  selector: 'page-naturaleza',
  templateUrl: 'naturaleza.html'
})

export class NaturalezaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

   openSeccionPage( idSeccion:number, tituloSeccion:string){
    this.navCtrl.push( SeccionPagePage , { idSeccion:idSeccion, tituloSeccion:tituloSeccion } );
  }

}
