import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LocalidadesService } from '../../providers/localidades';
import { TabsLocalidadPage } from '../tabs-localidad/tabs-localidad';
import { LocalidadGeneralPage } from '../localidad-general/localidad-general';

@Component({
  selector: 'page-localidades-listado',
  templateUrl: 'localidades-listado.html',
  providers: [ LocalidadesService ] 
})

export class LocalidadesListadoPage {
  
  myInput:string = null;
  localidades:any[] = [];
  comerDormir:string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public localidadesService: LocalidadesService
  ) {
    this.comerDormir = this.navParams.get( "comerDormir" );
    this.loadLocalidades();
  }

  loadLocalidades(){
    this.localidades = this.localidadesService.loadLocalidades();
  }

  openPageLocalidad(localidad:any){

    if(this.comerDormir =="comer" || this.comerDormir=="dormir" ){
       this.navCtrl.push( TabsLocalidadPage, { "localidad":localidad,"comerDormir":this.comerDormir } );
    }else if( this.comerDormir == "ruta"){
      this.navCtrl.push( LocalidadGeneralPage, { "localidad":localidad } );
    }
   
  }

  getComerDormirString():string{
    if( this.comerDormir=="comer" ){
      return "Comer";
    }else if ( this.comerDormir == "dormir" ){
      return "Dormir";
    } else if ( this.comerDormir == "ruta" ){
      return "Ruta";
    }
  }

}
