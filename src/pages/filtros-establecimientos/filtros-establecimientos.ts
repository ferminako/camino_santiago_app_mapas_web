import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-filtros-establecimientos',
  templateUrl: 'filtros-establecimientos.html'
})
export class FiltrosEstablecimientosPage {

  filtroEstTexto:string = "";
  filtroEstTipo:number = 2;
  filtroEstDistancia:number = 20;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ){
  
    if( this.navParams.get( "texto" ) != undefined ){
      this.filtroEstTexto = this.navParams.get( "texto" );
    }

    if( this.navParams.get( "distnacia" ) != undefined ){
      this.filtroEstDistancia = this.navParams.get( "distnacia" );
    }

    if( this.navParams.get( "tipo" ) != undefined ){
      this.filtroEstTipo = this.navParams.get( "tipo" );
    }
   
  }

  close():void{
    this.viewCtrl.dismiss();
  }

  filtrar():void{
    this.viewCtrl.dismiss({
      "distancia":this.filtroEstDistancia,
      "tipo":this.filtroEstTipo,
      "texto":this.filtroEstTexto
    });
  }

  limpiarFiltros():void{
      this.filtroEstDistancia = 20;
      this.filtroEstTipo = 2;
      this.filtroEstTexto = null;
  }


}
