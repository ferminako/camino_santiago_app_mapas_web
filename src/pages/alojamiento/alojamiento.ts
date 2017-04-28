import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ImagenesContenidoPage } from '../imagenes-contenido/imagenes-contenido'; 
import { VerMasAlojamientoPage } from '../ver-mas-alojamiento/ver-mas-alojamiento';
import { MapaAlojamientoPage } from '../mapa-alojamiento/mapa-alojamiento';

@Component({
  selector: 'page-alojamiento',
  templateUrl: 'alojamiento.html'
})

export class AlojamientoPage {

  alojamiento:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCrtl:ModalController) {
    this.alojamiento = this.navParams.get( "alojamiento" );
  }

  openImagePage(index:any){
    
    let auxImages:any [] = [];
    for(let img of this.alojamiento.imagenes){
      auxImages.push({"src":img})
    }

    let modal = this.modalCrtl.create( ImagenesContenidoPage, {"images":auxImages,"index":index}  );
    modal.present();
  }

  openVerMasAlojamiento(){
    let modal = this.modalCrtl.create( VerMasAlojamientoPage, {"alojamiento":this.alojamiento}  );
    modal.present();
  }

  openMapaAlojamientoPage(){
    let modal = this.modalCrtl.create( MapaAlojamientoPage, {"alojamiento":this.alojamiento}  );
    modal.present();
  }

}
