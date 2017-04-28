import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Navbar, ModalController } from 'ionic-angular';
import { ContenidoService } from '../../providers/contenido'; 
import { EstablecimientosService } from '../../providers/establecimientos';
import { AlojamientosService } from '../../providers/alojamientos';
import { EstablecimientoPage } from '../../pages/establecimiento/establecimiento';
import { AlojamientoPage } from '../../pages/alojamiento/alojamiento';    
import { FiltrosEstablecimientosPage } from '../../pages/filtros-establecimientos/filtros-establecimientos';
import { FiltrosAlojamientosPage } from '../../pages/filtros-alojamientos/filtros-alojamientos';

@Component({
  selector: 'page-localidad',
  templateUrl: 'localidad.html',
  providers: [ ContenidoService ]
})

export class LocalidadPage {
  
  localidad:any;
  comerDormir:string;
  localidadDatos:any;
  establecimientos:any;
  establecimiento:any = null;
  alojamientos:any;
  bodegas:any;

  filtroEstTexto:string;
  filtroEstTipo:number;
  filtroEstDistancia:number;

  filtroAloTexto:string;
  filtroAloDistancia:number;
  filtroAloTipos:any;

  tiposAlojamientosFiltrosString:string = null;

  tiposEstablecimientos:any = ["Restaurante/Bar-Restaurante","Bar","Todos"];
  
  noResults:boolean = false;
  @ViewChild(Navbar) navBar:Navbar;
  @ViewChild('t2') t2: ElementRef;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public establecimientosService: EstablecimientosService,
    public alojamientosService: AlojamientosService,
    public contenidoService: ContenidoService,
    public modalCrtl: ModalController
  ) {
    this.localidad = this.navParams.get( "localidad" );
    this.comerDormir = this.navParams.get( "comerDormir" );
    this.obtenerDatosLocalidad(this.localidad.id);
  }

  ionViewDidLoad() {
    /*Apaño para controlar el click del boton back que he forzado por css dado que
    en tabs no aparece*/
    this.navBar.backButtonClick = (e:UIEvent) => {
        this.navCtrl.parent.viewCtrl.dismiss();
    };

    this.limpiarFiltrosSinCargar();
    this.alojamientosService.limpiarFiltros();

  }
    
  obtenerDatosLocalidad(idLocalidad:number){
     this.contenidoService.obtenerContenido(idLocalidad)
    .then(contenido =>{
      this.localidadDatos = contenido;
      if( this.comerDormir == "comer" ){
        this.obtenerEstablecimientosLocalidad();
      }else if (this.comerDormir == "dormir" ){
        this.obtenerAlojamientosLocalidad();
      }
    })
    .catch(error=>{
      console.log(error);
    })
  }

  obtenerAlojamientosLocalidad(nombre?:string,tipo?:string,distancia?:number){
    this.alojamientosService.obtenerAlojamientosCercanos(this.localidadDatos,nombre,tipo,distancia)
    .then(alojamientos =>{
      this.alojamientos = alojamientos;
     /* console.log(this.alojamientos);*/
      if( this.alojamientos == undefined ){
        this.noResults = true;
      }
    })
    .catch(error=>{
      console.log(error);
    })
  }

  openPageAlojamiento(alojamiento:any){
    this.navCtrl.push( AlojamientoPage, {"alojamiento":alojamiento});
  }

  obtenerEstablecimientosLocalidad(nombre?:string,tipo?:any,distancia?:number){
    this.establecimientosService.obtenerEstablecimientosCercanos(this.localidadDatos,nombre,tipo,distancia)
    .then(establecimientos =>{
      this.establecimientos = establecimientos;
       /*this.navCtrl.parent.t2.nativeElement.setAttribute('enabled',false);*/
      if( this.establecimientos == undefined ){
        this.noResults = true;
      }
    })
    .catch(error=>{
      console.log(error);
    })
  }

  openPageEstablecimiento(establecimiento:any){
    this.navCtrl.push( EstablecimientoPage, {"idEstablecimiento":establecimiento.id});
  }

  openPageFiltros(){
    if( this.comerDormir == "comer" ){
      this.openFiltrosEstablecimientosPage();
    }else if( this.comerDormir == "dormir" ){
      this.openFiltrosAlojamientosPage();
    }
  }

  openFiltrosEstablecimientosPage(){
    let modal = this.modalCrtl.create( FiltrosEstablecimientosPage, { texto:this.filtroEstTexto,tipo:this.filtroEstTipo,distnacia:this.filtroEstDistancia } );
    modal.present();
    modal.onDidDismiss(data => {
      if(data != null){
       /*console.log('localidadPage filtro est: ',data);*/
        /*this.filtroEstablecimientos = {texto:data.establecimientoSearch,tipo:data.establecimientosTipos,distancia:data.distanciaEstablecimientos};*/
        this.filtroEstTexto = data.texto;
        this.filtroEstTipo =  data.tipo;
        this.filtroEstDistancia = data.distancia;
        this.obtenerEstablecimientosLocalidad(this.filtroEstTexto,this.filtroEstTipo,this.filtroEstDistancia);
      }
    });
  }

  openFiltrosAlojamientosPage(){
    let modal = this.modalCrtl.create( FiltrosAlojamientosPage, { texto:this.filtroAloTexto,tipo:this.filtroAloTipos,distnacia:this.filtroAloDistancia } );
    modal.present();
    modal.onDidDismiss(data => {
      if(data != null){
       /*console.log('localidadPage filtro aloj: ',data);*/
        this.filtroAloTexto = data.texto;
        this.filtroAloTipos =  data.tipo;
        this.filtroAloDistancia = data.distancia;
        this.tiposAlojamientosFiltrosString = this.tiposAlojamientosFiltros();
        this.obtenerAlojamientosLocalidad(this.filtroAloTexto,this.filtroAloTipos,this.filtroAloDistancia);
      }
    });
  }

  tiposAlojamientos(tipo:string):string{
    let res:string = null;
    switch(tipo){
      case 'cs_apartahotel':
        res = 'Apartahotel';break;
      case 'cs_apartamento_turístico':
        res = 'Apto.Turístico';break;
      case 'cs_camping':
        res = 'Camping';break;
      case 'cs_casa_rural':
        res = 'Casa Rural';break;
      case 'cs_hostal':
        res = 'Hostal';break;
      case 'cs_hotel':
        res = 'Hotel';break;
      case 'cs_hotel_rural':
        res = 'Hotel Rural';break;
      case 'cs_pension':
        res = 'Pensión';break;
      case 'cs_posada':
        res = 'Posada';break; 
    }  
    return res;
  }

        
  tiposAlojamientosFiltros():any{
    let res:string = "";
    let tipos = this.filtroAloTipos;
    
    if (tipos != undefined ){

      /*console.log(tipos);*/

      
      if(tipos.apartahotel == true && tipos.apartamento_turistico == true && tipos.camping == true && tipos.casa_rural == true && tipos.hostal == true &&
     tipos.hotel == true && tipos.hotel_rural == true && tipos.pension == true && tipos.posada == true ){
       res = null;
       /*console.log('***** Todos filtros',res);*/
     }else{
      /*console.log('*** ALGUN FILTRO');*/
       if( tipos.apartahotel == true ){
         if( res == "" ){
            res+= "Tipo: Aparta Hotel";
         }else{
            res+= ", Aparta Hotel";
         }
       }

       if( tipos.apartamento_turistico == true ){
         if( res == "" ){
            res+= "Tipo: Apto.Turístico";
         }else{
            res+= ", Apto.Turístico";
         }
       }

       if( tipos.camping == true ){
          if( res == "" ){
            res+= "Tipo: Camping";
         }else{
            res+= ", Camping";
         }
       }

       if( tipos.casa_rural == true ){
         if( res == "" ){
            res+= "Tipo: Casa Rural";
         }else{
            res+= ", Casa Rural";
         }
       }

       if( tipos.hostal == true ){
         if( res == "" ){
            res+= "Tipo: Hostal";
         }else{
            res+= ", Hostal";
         }
       }

       if( tipos.hotel == true ){
         if( res == "" ){
            res+= "Tipo: Hotel";
         }else{
            res+= ", Hotel";
         }
       }

       if( tipos.hotel_rural == true ){
         if( res == "" ){
            res+= "Tipo: Hotel Rural";
         }else{
            res+= ", Hotel Rural";
         }
       }

       if( tipos.pension == true ){
         if( res == "" ){
            res+= "Tipo: Pensión";
         }else{
            res+= ", Pensión";
         }
       }

       if( tipos.posada == true ){
         if( res == "" ){
            res+= "Tipo: Posada";
         }else{
            res+= ", Posada";
         }
       }
       /*console.log('***** Filtros: ' + res);*/

     }
    }
    

    return res;
  }
  
  limpiarFiltros(){
    if( this.comerDormir == "comer" ){
      this.limpiarFiltrosEstablecimientos();
    }else if( this.comerDormir == "dormir" ){
      this.limpiarFiltrosAlojamientos();
    }
  }

  limpiarFiltrosEstablecimientos(){
    this.filtroEstDistancia = null;
    this.filtroEstTipo = null;
    this.filtroEstTexto = null;
    this.obtenerEstablecimientosLocalidad(this.filtroEstTexto,this.filtroEstTipo,this.filtroEstDistancia);
  }

  limpiarFiltrosAlojamientos(){
    this.filtroAloDistancia = 20;
    this.filtroAloTipos = {"apartahotel":true, "apartamento_turistico":true, "camping":true, "casa_rural":true, "hostal":true, "hotel":true, "hotel_rural":true, "pension":true, "posada":true };
    this.filtroAloTexto = "";
    this.obtenerAlojamientosLocalidad(this.filtroAloTexto,this.filtroAloTipos,this.filtroAloDistancia);
  }

  limpiarFiltrosSinCargar(){
    if( this.comerDormir == "comer" ){
      this.filtroEstDistancia = null;
      this.filtroEstTipo = null;
      this.filtroEstTexto = null;
    }else if( this.comerDormir == "dormir" ){
      this.filtroAloDistancia = 20;
      this.filtroAloTipos = null;
      this.filtroAloTexto = "";
    }
  }
  

}
