import { Component, ElementRef, ViewChild } from '@angular/core';
import { Platform, NavController, NavParams, ToastController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { GoogleMaps } from '../../providers/google-maps';
import { GoogleMapsCluster } from '../../providers/google-maps-cluster';
import { QueVerLocalidadService } from '../../providers/que-ver-localidad';

@Component({
  selector: 'page-mapa-que-ver',
  templateUrl: 'mapa-que-ver.html'
})

export class MapaQueVerPage {

  localidad:any;
  pits:any;

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
  
  constructor(
    public platform: Platform,
    public maps: GoogleMaps,
 /*   public mapCluster: GoogleMapsCluster,*/
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public queVerLocalidadService:QueVerLocalidadService
  ) {
    this.localidad = this.navParams.get( "localidad" );
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      let toast = this.toastCtrl.create({
      message: 'El mapa tarda unos segundos en cargarse dependiendo de tu conexión.',
      duration: 3000
      });
      toast.present();
      
      /*let auxPits = this.queVerLocalidadService.getPits();
      if( auxPits != undefined ){
          if( this.pits != auxPits ){
              this.pits = auxPits;
              let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement)
              .then((map) => {
                  this.mapCluster.addCluster(map,auxPits,'pit');
              });   
          }
      }*/
      
      
    });
  }

}
