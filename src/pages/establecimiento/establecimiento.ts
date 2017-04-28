import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ImagenesContenidoPage } from '../imagenes-contenido/imagenes-contenido'; 
import { VerMasEstablecimientoPage } from '../ver-mas-establecimiento/ver-mas-establecimiento';
import { EstablecimientosService } from '../../providers/establecimientos';
import { MapaEstablecimientoPage } from '../mapa-establecimiento/mapa-establecimiento';

@Component({
  selector: 'page-establecimiento',
  templateUrl: 'establecimiento.html',
  providers: [ EstablecimientosService ]
})

export class EstablecimientoPage {

  establecimiento:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCrtl: ModalController,
    public establecimientosService: EstablecimientosService
   ) {
     let idEstablecimiento:string = String(this.navParams.get( "idEstablecimiento" ));
     /*console.log(idEstablecimiento);*/
     this.establecimientosService.obtenerEstablecimiento(idEstablecimiento)
      .then(establecimientoRes =>{
        this.establecimiento = establecimientoRes;
        this.procesarDatosEstablecimiento();
      })
      .catch(error=>{
        console.log(error);
      })
     
   }

  procesarDatosEstablecimiento(){
    if( this.establecimiento.fotoPrincipal != undefined && this.establecimiento.fotos != undefined){
      let auxFotos:any[] = [];
      let i:number = 0;
      for(let imagen of this.establecimiento.fotos){
        if(imagen.foto == this.establecimiento.fotoPrincipal){
          auxFotos.push({"src":"https://www.reservon.es/central/images/restaurantes/"+this.establecimiento.id+"/"+imagen.foto,"index":i});i++;break;
        }
      }
      for(let imagen of this.establecimiento.fotos){
        if(imagen.foto != this.establecimiento.fotoPrincipal){
          auxFotos.push({"src":"https://www.reservon.es/central/images/restaurantes/"+this.establecimiento.id+"/"+imagen.foto,"index":i});i++;
        }
      }
      this.establecimiento.fotos = auxFotos;
    }else{
      this.establecimiento.fotos = null; //incluir no imagen.
    }
  }

  openImagePage(index:any){
    let modal = this.modalCrtl.create( ImagenesContenidoPage, {"images":this.establecimiento.fotos,"index":index}  );
    modal.present();
  }

  openVerMasEstablecimiento(){
    let modal = this.modalCrtl.create( VerMasEstablecimientoPage, {"establecimiento":this.establecimiento}  );
    modal.present();
  }

  openMapaEstablecimientoPage(){
    let modal = this.modalCrtl.create( MapaEstablecimientoPage, {"establecimiento":this.establecimiento}  );
    modal.present();
  }



}
