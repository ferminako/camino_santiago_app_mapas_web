import { Component, ElementRef, ViewChild } from '@angular/core';
import { Platform, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { GoogleMaps } from '../../providers/google-maps';

 
@Component({
  selector: 'page-mapa-establecimiento',
  templateUrl: 'mapa-establecimiento.html'
})

export class MapaEstablecimientoPage {
    
    establecimiento:any = null;

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

        this.establecimiento=this.navParams.get( "establecimiento" );
 
        this.platform.ready().then(() => {
            let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then((map) => {
                let latLngMarker = new google.maps.LatLng(this.establecimiento.latitud, this.establecimiento.longitud)                
                let marker = new google.maps.Marker({
                    position: latLngMarker,
                    icon:"assets/images/markers/map-marker-establecimiento.png"
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