import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ContenidosService } from '../../providers/contenidos';
import { ContenidoPage } from '../contenido/contenido';
import { ContenidoList } from '../../models/contenidoList';

@Component({
  selector: 'page-seccion-page',
  templateUrl: 'seccion-page.html',
  providers: [ ContenidosService ]
})

export class SeccionPagePage {
  
  idSeccion: number;
  tituloSeccion: string;
  contenidos:any;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public contenidosService:ContenidosService
  ) {

    this.idSeccion = navParams.get( 'idSeccion' );
    this.tituloSeccion = navParams.get( 'tituloSeccion' );
    this.obtenerContenidos();
  }

  private obtenerContenidos(){
    this.contenidosService.obtenerContenidosPorSeccionSubSeccion(this.idSeccion)
    .then(contenidos =>{
      this.contenidos = contenidos;
    })
    .catch(error=>{
      console.log(error);
    })
  }
 
  openPageContenido(contenidoList:ContenidoList){
    this.navCtrl.push( ContenidoPage, { "contenidoList": contenidoList, "noCard":true } );
  }
}
