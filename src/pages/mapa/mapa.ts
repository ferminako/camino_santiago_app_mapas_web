import { Component, ElementRef, ViewChild } from '@angular/core';
import { Platform, NavController, NavParams, ToastController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { GoogleMaps } from '../../providers/google-maps';
import { GoogleMapsCluster } from '../../providers/google-maps-cluster';
import { ContenidoService } from '../../providers/contenido'; 
import { EstablecimientosService } from '../../providers/establecimientos';
import { AlojamientosService } from '../../providers/alojamientos';
 
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html'
})
export class MapaPage {

    localidad:any;
    comerDormir:string;
    establecimientos:any;
    alojamientos:any;

    @ViewChild('map') mapElement: ElementRef;
    @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
 
    constructor(
        public platform: Platform,
        public maps: GoogleMaps,
        public mapCluster: GoogleMapsCluster,
        public navCtrl: NavController,
        public navParams: NavParams,
        public establecimientosService: EstablecimientosService,
        public alojamientosService: AlojamientosService,
        public toastCtrl: ToastController
    ) {
        this.localidad = this.navParams.get( "localidad" );
        this.comerDormir = this.navParams.get( "comerDormir" );
    }

    ionViewDidEnter():void{
        this.platform.ready().then(() => {

            let toast = this.toastCtrl.create({
            message: 'El mapa tarda unos segundos en cargarse dependiendo de tu conexión.',
            duration: 3000
            });
            toast.present();
            
            if(this.comerDormir == "comer"){
                let auxEstablecimientos = this.establecimientosService.getEstablecimientos();
                if( auxEstablecimientos != undefined ){
                    if( this.establecimientos != auxEstablecimientos ){
                        this.establecimientos = auxEstablecimientos;
                        let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement)
                        .then((map) => {
                            this.mapCluster.addCluster(map,auxEstablecimientos,this.comerDormir);
                        });   
                    }
                }
            }else if(this.comerDormir == "dormir"){
                let auxAlojamientos = this.alojamientosService.getAlojamientos();
                if( auxAlojamientos != undefined ){
                    if( this.alojamientos != auxAlojamientos ){
                        this.alojamientos = auxAlojamientos;
                        let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement)
                        .then((map) => {
                            this.mapCluster.addCluster(map,auxAlojamientos,this.comerDormir);
                        });   
                    }
                }
            }
            
        });
    }

    
}