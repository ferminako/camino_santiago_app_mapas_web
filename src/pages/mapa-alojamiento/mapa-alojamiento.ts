import { Component, ElementRef, ViewChild } from '@angular/core';
import { Platform, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { GoogleMaps } from '../../providers/google-maps';

@Component({
  selector: 'page-mapa-alojamiento',
  templateUrl: 'mapa-alojamiento.html'
})

export class MapaAlojamientoPage {
    
    alojamiento:any = null;

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

        this.alojamiento = this.navParams.get( "alojamiento" );
        
        this.platform.ready().then(() => {
            let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then((map) => {
                let latLngMarker = new google.maps.LatLng(this.alojamiento.latitud, this.alojamiento.longitud)                
                let marker = new google.maps.Marker({
                    position: latLngMarker,
                    icon:"assets/images/markers/map-marker-alojamiento.png"
                });
                marker.setMap(map);
                map.setCenter(marker.getPosition());
                map.setZoom(14);
            });
        });
    }

    close(){
        this.viewCtrl.dismiss();
    }

}