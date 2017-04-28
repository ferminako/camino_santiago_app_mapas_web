import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ContenidoService } from '../../providers/contenido';
import { ContenidoList } from '../../models/contenidoList';
import { Contenido } from '../../models/contenido';
import { ImagenesContenidoPage } from '../imagenes-contenido/imagenes-contenido';
import { VerMasContenidoPage } from '../ver-mas-contenido/ver-mas-contenido';
import { MapaContenidoPage } from '../mapa-contenido/mapa-contenido';
import { CapitalizePipe } from '../../pipes/capitalize';

@Component({
  selector: 'page-contenido',
  templateUrl: 'contenido.html',
  providers: [ ContenidoService ]
})

export class ContenidoPage {

  contenido: Contenido = null;
  contenidoList: ContenidoList = null;
  textoContenido: boolean = false;

  constructor( 
    public navCtrl: NavController,
    public navParams: NavParams,
    public contenidoService: ContenidoService,
    public modalCrtl: ModalController
  ) {
    this.contenidoList = navParams.get( 'contenidoList' );
    this.obtenerContenido( this.contenidoList );
  }

  private obtenerContenido(contenidoList:ContenidoList){
    this.contenidoService.obtenerContenido(contenidoList.id)
    .then(contenido =>{
      this.contenido = this.procesarContenido(contenido);
    })
    .catch(error=>{
      console.log(error);
    })
  }

  private procesarContenido(contenido:any){
    let res:Contenido = null;
    if(contenido != undefined){
      let imagenes:any[] = [];
      let coordenadas:any[] = [];
      if(contenido.imagenes != undefined){
        if(contenido.imagenes.length>0){
          let i=0;
          for(let imagen of contenido.imagenes){
            imagenes.push({"src":imagen.big_cache,"index":i});i++;
          }
        }
      }
      if(contenido.coordenadas != undefined){
        if(contenido.coordenadas.length>0){
          coordenadas.push({"lat":contenido.coordenadas[0].latitud,"lng":contenido.coordenadas[0].longitud});
        }
      }
      res = new Contenido(contenido.id,this.sanitize(contenido.titulo),contenido.texto,coordenadas,imagenes,contenido.web);
    }
    return res;
  }

  sanitize(value:string):string {
    value = value.toLowerCase();
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  openImagePage(index:any){
    let modal = this.modalCrtl.create( ImagenesContenidoPage, {"images":this.contenido.images,"index":index} );
    modal.present();
  }

/*  mostrarTexto(){
    if( this.textoContenido == false ){ 
      this.textoContenido=true; 
    }
    return this.textoContenido;
  }
*/
  openVerMasContenidoPage(){
    let modal = this.modalCrtl.create( VerMasContenidoPage, {"contenido":this.contenido} );
    modal.present();
  }

  openMapaContenidoPage(){
    let modal = this.modalCrtl.create( MapaContenidoPage, {"contenido":this.contenido} );
    modal.present();
  }

}
