import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ContenidosService } from '../../providers/contenidos';
import { ContenidoList } from '../../models/contenidoList';
import { ContenidoPage } from '../contenido/contenido';
import { CapitalizePipe } from '../../pipes/capitalize';

@Component({
  selector: 'page-contenidos',
  templateUrl: 'contenidos.html',
  providers: [ ContenidosService ]
})

export class ContenidosPage {

  idSeccion: number;
  tituloSeccion: string;
  contenidos:ContenidoList[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private contenidosService:ContenidosService
  ) {
    this.idSeccion = navParams.get( 'idSeccion' );
    this.tituloSeccion = navParams.get( 'tituloSeccion' );
    this.obtenerContenidos();
  }

  private obtenerContenidos(){
    this.contenidosService.obtenerContenidosPorSeccion(this.idSeccion)
    .then(contenidos =>{
      this.contenidos = this.procesarContenidosApi(contenidos);
    })
    .catch(error=>{
      console.log(error);
    })
  }

  private procesarContenidosApi(contenidos:any){
    let res:ContenidoList[] = [];
    if( contenidos != null ){
      for (let contenido of contenidos) {
        if(contenido != undefined){
          let imagen:string = "";
          if(contenido.imagenes != undefined){
            if(contenido.imagenes.length>0){
              imagen = contenido.imagenes[0].thumb_cache;
            }
          }
          let nuevoContenido:ContenidoList = new ContenidoList(contenido.id,contenido.titulo,imagen);
          res.push(nuevoContenido);
        }
      }
    }
    return res;
  }

  openPageContenido(contenidoList:ContenidoList){
    this.navCtrl.push( ContenidoPage, { "contenidoList": contenidoList/*, "noCard":false*/ } );
  }






}
