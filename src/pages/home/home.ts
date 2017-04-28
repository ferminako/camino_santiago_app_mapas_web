import { Component,Injectable } from '@angular/core';
import { NavController } from 'ionic-angular';
/*import { SeccionesService } from '../../providers/secciones/secciones-service';
import { AehSeccionComponent } from '../../components/aeh-seccion/aeh-seccion';
import { SeccionModel } from '../../models/seccionModel';*/

import { LocalidadesPage } from '../../pages/localidades/localidades';
import { MapaPage } from '../../pages/mapa/mapa';
import { ArtePage } from '../../pages/arte/arte';
import { NaturalezaPage } from '../../pages/naturaleza/naturaleza';
import { LocalidadesListadoPage } from '../../pages/localidades-listado/localidades-listado';
import { DormirPage } from '../../pages/dormir/dormir';
import { HistoriaPage } from '../../pages/historia/historia';
import { CuriosidadesPage } from '../../pages/curiosidades/curiosidades';
import { ConsejosPage } from '../../pages/consejos/consejos';
import { ContenidosPage } from '../../pages/contenidos/contenidos';
import { MapaGeneralPage } from '../../pages/mapa-general/mapa-general';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
/*  providers: [ SeccionesService ]*/
})

export class HomePage {

  secciones:any[] = [];

  constructor( private navCtrl: NavController ) {
    
  } 

  openPageLocalidades(){
    this.navCtrl.push( LocalidadesPage );
  }

  openPageMapa(){
    this.navCtrl.push( MapaGeneralPage );
  }

  openPageArte(){
    this.navCtrl.push( ArtePage );
  }

  openPageNaturaleza(){
    this.navCtrl.push( NaturalezaPage );
  }

  openPageComer(){
    this.navCtrl.push( LocalidadesListadoPage, {"comerDormir":"comer"} );
  }

  openPageDormir(){
    this.navCtrl.push( LocalidadesListadoPage, {"comerDormir":"dormir"} );
  }

  openPageHistoria(){
    /*this.navCtrl.push( HistoriaPage );*/
    this.navCtrl.push( ContenidosPage , { idSeccion:185, tituloSeccion:"Historia" } );
  }

  openPageCuriosidades(){
    /*this.navCtrl.push( CuriosidadesPage );*/
    this.navCtrl.push( ContenidosPage , { idSeccion:173, tituloSeccion:"Curiosidades" } );
  }

  openPageConsejos(){
    this.navCtrl.push( ConsejosPage );
  }
}
