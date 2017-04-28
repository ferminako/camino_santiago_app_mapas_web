import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LocalidadQueVerPage } from '../localidad-que-ver/localidad-que-ver';
import { MapaQueVerPage } from '../mapa-que-ver/mapa-que-ver';

@Component({
  selector: 'page-tabs-localidad-que-ver',
  templateUrl: 'tabs-localidad-que-ver.html'
})
export class TabsLocalidadQueVerPage {

  tab3: any;
  tab4: any;
  
  localidad:any;
  /*comerDormir:string;
  localidadDatos:any;
  establecimientos:any;
  establecimiento:any = null;
  alojamientos:any;
  bodegas:any;*/

  params = {
      "localidad" : this.navParams.get( "localidad" ),
    }
  paramsa = {
      "localidad" : this.navParams.get( "localidad" ),
    }
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {

    this.tab3 = LocalidadQueVerPage;
    this.tab4 = MapaQueVerPage;

    this.localidad = this.navParams.get( "localidad" );
    
  }

  ionViewDidLoad(){
    console.log('TabsLocalidadQueVerPage');
  }

}
