import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Navbar, ModalController } from 'ionic-angular';
import { ContenidoService } from '../../providers/contenido'; 
import { VerMasContenidoPage } from '../ver-mas-contenido/ver-mas-contenido';
import { ImagenesContenidoPage } from '../imagenes-contenido/imagenes-contenido';
import { TabsLocalidadPage } from '../tabs-localidad/tabs-localidad';
/*import { TabsLocalidadQueVerPage } from '../tabs-localidad-que-ver/tabs-localidad-que-ver';*/
import { LocalidadQueVerPage } from '../localidad-que-ver/localidad-que-ver';


@Component({
  selector: 'page-localidad-general',
  templateUrl: 'localidad-general.html',
  providers: [ ContenidoService ]
})

export class LocalidadGeneralPage {

  localidad:any;
  localidadDatos:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public contenidoService:ContenidoService,
    public modalCrtl:ModalController
  ) {
    this.localidad = this.navParams.get( "localidad" );
    this. obtenerDatosLocalidad(this.localidad.id);
  }

   obtenerDatosLocalidad(idLocalidad:number){
     this.contenidoService.obtenerContenido(idLocalidad)
    .then(contenido =>{
      this.localidadDatos = this.procesarDatosLocalidad(contenido);
    })
    .catch(error=>{
      console.log(error);
    })
  }

  procesarDatosLocalidad(contenido:any):any{
    let imagenes:any []= [];
    let i=0;
    imagenes.push({ "src":this.localidad.imagen, "index":i });i++;
    if( contenido.imagenes != undefined ){
      if( contenido.imagenes.length > 0 ){
        for(let imagen of contenido.imagenes){
          imagenes.push({ "src":imagen.big_cache, "index":i });i++;
        }
      }
    }

    contenido.imagenes = imagenes;

      return contenido;
  }

  openVerMasLocalidad(){
    this.navCtrl.push( VerMasContenidoPage, { "contenido" : this.localidadDatos });
  }
  
  openImagePage(index:any){
    let modal = this.modalCrtl.create( ImagenesContenidoPage, {"images":this.localidadDatos.imagenes,"index":index} );
    modal.present();
  }

  openComerPage(localidad:any){
    this.navCtrl.push( TabsLocalidadPage, { "localidad":this.localidad  , "comerDormir" : "comer" });
  }

  openDormirPage(localidad:any){
    this.navCtrl.push( TabsLocalidadPage, { "localidad":this.localidad  , "comerDormir" : "dormir" });
  }

  openQueVerPage(localidad:any){
   /* this.navCtrl.push( TabsLocalidadQueVerPage, { "localidad":this.localidad });*/
   this.navCtrl.push( LocalidadQueVerPage, { "localidad":this.localidad });

  }

}
