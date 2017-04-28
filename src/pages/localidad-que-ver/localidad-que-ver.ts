import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Navbar, ModalController } from 'ionic-angular';
import { QueVerLocalidadService } from '../../providers/que-ver-localidad';
import { ContenidoList } from '../../models/contenidoList';
import { ContenidoPage } from '../contenido/contenido';

@Component({
  selector: 'page-localidad-que-ver',
  templateUrl: 'localidad-que-ver.html'
})

export class LocalidadQueVerPage {

  noResults:boolean = false;
 /* @ViewChild(Navbar) navBar:Navbar;*/
  @ViewChild('t4') t4: ElementRef;
  pits:any;
  localidad:any;
  contenido:any;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCrtl: ModalController,
    public queVerLocalidadService:QueVerLocalidadService
  ) {
    this.localidad = this.navParams.get( "localidad" );
    this.obtenerPits(this.localidad);
    /*this.pits =  this.queVerLocalidadService.obtenerPitsCercanos(this.localidad)*/;
    
  }

  obtenerPits(localidad):void{
    this.queVerLocalidadService.obtenerPitsCercanos(localidad)
    .then(pits =>{
      this.pits = pits;
   /*   console.log(this.pits);*/
      if( this.pits == undefined ){
        this.noResults = true;
      }
    })
    .catch(error=>{
      console.log(error);
    })
  }

  openPagePit(pit):void{

    let cl= new ContenidoList(pit.id,pit.nombre,"");
    this.navCtrl.push( ContenidoPage, {"contenidoList": cl});
  }

  ionViewDidLoad(){
     /*Apaño para controlar el click del boton back que he forzado por css dado que
    en tabs no aparece*/
   /* this.navBar.backButtonClick = (e:UIEvent) => {
        this.navCtrl.parent.viewCtrl.dismiss();
    };*/
  }

}
