import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LocalidadPage } from '../localidad/localidad';
import { MapaPage } from '../mapa/mapa';

@Component({
  selector: 'page-tabs-localidad',
  templateUrl: 'tabs-localidad.html'
})
export class TabsLocalidadPage {

  tab1: any;
  tab2: any;
  
  localidad:any;
  comerDormir:string;
  localidadDatos:any;
  establecimientos:any;
  establecimiento:any = null;
  alojamientos:any;
  bodegas:any;

  listParams = {
      "localidad" : this.navParams.get( "localidad" ),
      "comerDormir" : this.navParams.get( "comerDormir" ),
    }
  listaParams = {
      "localidad" : this.navParams.get( "localidad" ),
      "comerDormir" : this.navParams.get( "comerDormir" ),
    }
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {

    this.tab1 = LocalidadPage;
    this.tab2 = MapaPage;

    this.localidad = this.navParams.get( "localidad" );
    this.comerDormir = this.navParams.get( "comerDormir" );

  }

}
