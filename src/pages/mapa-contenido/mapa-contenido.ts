import { Component, ElementRef, ViewChild } from '@angular/core';
import { Platform, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { GoogleMaps } from '../../providers/google-maps';

 
@Component({
  selector: 'page-mapa-contenido',
  templateUrl: 'mapa-contenido.html'
})
export class MapaContenidoPage {
    
    contenido:any = null;

    @ViewChild('map') mapElement: ElementRef;
    @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
 
    constructor(
        public platform: Platform,
        public maps: GoogleMaps,
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        public toastCtrl: ToastController
    ) {

        let toast = this.toastCtrl.create({
        message: 'El mapa tarda unos segundos en cargarse dependiendo de tu conexión.',
        duration: 3000
        });
        toast.present();

        this.contenido=this.navParams.get( "contenido" );

        console.log(this.contenido);

        let lat = null;let lng = null;
        if(this.contenido.coords != undefined){
            for(let coordenada of this.contenido.coords){
                if( coordenada.lat != null && coordenada.lat != "" && coordenada.lng != null && coordenada.lng != "" ){
                    lat = coordenada.lat;
                    lng = coordenada.lng;
                }
            }
            
        }
 
        this.platform.ready().then(() => {
            let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then((map) => {

                if( lat != null && lng != null ){
                    let latLngMarker = new google.maps.LatLng(lat, lng)                
                    let marker = new google.maps.Marker({
                        position: latLngMarker,
                        icon:"assets/images/markers/map-marker-pit.png"
                    });
                    marker.setMap(map);
                    map.setCenter(marker.getPosition());
                    map.setZoom(14);
                }
                
            });
        });
    }

    close(){
        this.viewCtrl.dismiss();
    }

}