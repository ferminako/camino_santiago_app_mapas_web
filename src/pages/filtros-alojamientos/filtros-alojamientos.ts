import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-filtros-alojamientos',
  templateUrl: 'filtros-alojamientos.html'
})
export class FiltrosAlojamientosPage {

  filtroAloTexto:string = "";
  filtroAloDistancia:number = 20;
  listadoTipos:any = {"apartahotel":true, "apartamento_turistico":true, "camping":true, "casa_rural":true, "hostal":true, "hotel":true, "hotel_rural":true, "pension":true, "posada":true };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ){
  
    if( this.navParams.get( "texto" ) != undefined ){
      this.filtroAloTexto = this.navParams.get( "texto" );
    }

    if( this.navParams.get( "distnacia" ) != undefined ){
      this.filtroAloDistancia = this.navParams.get( "distnacia" );
    }

    if( this.navParams.get( "tipo" ) != undefined ){
      this.listadoTipos = this.navParams.get( "tipo" );
    }
   
  }

  close():void{
    this.viewCtrl.dismiss();
  }

  filtrar():void{
    this.viewCtrl.dismiss({
      "distancia":this.filtroAloDistancia,
      "tipo":this.listadoTipos,
      "texto":this.filtroAloTexto
    });
  }

  limpiarFiltros():void{
      this.filtroAloDistancia = 20;
      this.listadoTipos = {"apartahotel":true, "apartamento_turistico":true, "camping":true, "casa_rural":true, "hostal":true, "hotel":true, "hotel_rural":true, "pension":true, "posada":true };
      this.filtroAloTexto = null;
  }

  marcarFiltrosTipo():void{
    this.listadoTipos = {"apartahotel":true, "apartamento_turistico":true, "camping":true, "casa_rural":true, "hostal":true, "hotel":true, "hotel_rural":true, "pension":true, "posada":true };
  }

  desmarcarFiltrosTipo():void{
    this.listadoTipos = {"apartahotel":false, "apartamento_turistico":false, "camping":false, "casa_rural":false, "hostal":false, "hotel":false, "hotel_rural":false, "pension":false, "posada":false };
  }


}
