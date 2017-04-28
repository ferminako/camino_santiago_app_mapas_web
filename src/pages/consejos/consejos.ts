import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ContenidoPage } from '../contenido/contenido';
import { ContenidosPage } from '../contenidos/contenidos';
import { SeccionPagePage } from '../seccion-page/seccion-page';

@Component({
  selector: 'page-consejos',
  templateUrl: 'consejos.html'

})

export class ConsejosPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }
 
  openPage( idContenido:number, tituloContenido:string){
    let contenidoList = {id: idContenido, name: tituloContenido, image: ""};
    this.navCtrl.push( ContenidoPage, { "contenidoList": contenidoList, "noCard":true } );
  }

  openSeccionPage( idSeccion:number, tituloSeccion:string){
    this.navCtrl.push( SeccionPagePage , { idSeccion:idSeccion, tituloSeccion:tituloSeccion } );
  }

}