import { Component, ElementRef, ViewChild } from '@angular/core';
import { Platform, NavController, NavParams, ToastController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { GoogleMaps } from '../../providers/google-maps';
import { GoogleMapsCluster } from '../../providers/google-maps-cluster';
import { LocalidadesService } from '../../providers/localidades';
import { QueVerLocalidadService } from '../../providers/que-ver-localidad';

@Component({
  selector: 'page-mapa-general',
  templateUrl: 'mapa-general.html',
  providers: [ LocalidadesService ]
})
export class MapaGeneralPage {

    localidades:any;
    pits:any;
    toast:any;

    @ViewChild('map') mapElement: ElementRef;
    @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
 
    constructor(
        public platform: Platform,
        public maps: GoogleMaps,
        public mapCluster: GoogleMapsCluster,
        public navCtrl: NavController,
        public navParams: NavParams,
        public localidadesService:LocalidadesService,
        public toastCtrl: ToastController,
        public queVerLocalidadService:QueVerLocalidadService
    ) {
    }

    ionViewDidEnter():void{
        this.platform.ready().then(() => {


            if( this.toast == undefined ){
                 this.toast = this.toastCtrl.create({
                message: 'El mapa tarda unos segundos en cargarse dependiendo de tu conexión.',
                duration: 3000
                });
                this.toast.present();
            }
           

            if( this.localidades == undefined ){

                this.cargarMarkers();

                  
            }           
                       
        });
    }

    cargarMarkers(){
        this.localidades = this.loadLocalidades();
        this.queVerLocalidadService.obtenerPits()
        .then(pits =>{
        this.pits = pits;
    /*   console.log(this.pits);*/
        /*if( this.pits == undefined ){
            this.noResults = true;
        }*/
        
        
       /* console.log(this.localidades);
        console.log(this.pits);*/

        let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement)
        .then((map) => {
            this.mapCluster.addCluster(map,this.localidades,"localidades");
            this.mapCluster.addCluster(map,this.pits,"pits");
        });



        })
        .catch(error=>{
        console.log(error);
        })
    }


    loadLocalidades():any{
      return this.localidadesService.loadLocalidades();
    }
    
}
