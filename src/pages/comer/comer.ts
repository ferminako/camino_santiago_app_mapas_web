import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LocalidadesListadoPage } from '../localidades-listado/localidades-listado';
import { MapaPage } from '../mapa/mapa';

@Component({
  selector: 'page-comer',
  templateUrl: 'comer.html'
})

export class ComerPage {

  tab1: any;
  tab2: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tab1 = LocalidadesListadoPage;
    this.tab2 = MapaPage;
  }

}
