import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ContenidosPage } from '../../pages/contenidos/contenidos';

@Component({
  selector: 'page-arte',
  templateUrl: 'arte.html'
})

export class ArtePage {
  
  constructor( private navCtrl: NavController ) {
    
  }

  openPage( idSeccion:number, tituloSeccion:string){
    this.navCtrl.push( ContenidosPage , { idSeccion:idSeccion, tituloSeccion:tituloSeccion } );
  }

}
