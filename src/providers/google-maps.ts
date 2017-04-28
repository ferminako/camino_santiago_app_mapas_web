import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';
import { Connectivity } from './connectivity';
import { Geolocation } from 'ionic-native';

@Injectable()
export class GoogleMaps {

  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  currentMarker: any;
  apiKey: string = "AIzaSyAFCzdxvClAW6Qp7CWZ3s59PU65IqIrzXU";
 
  constructor(public connectivityService: Connectivity) {}
 
  init(mapElement: any, pleaseConnect: any): Promise<any> {
 
    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;
 
    return this.loadGoogleMaps();
 
  }
 
  loadGoogleMaps(): Promise<any> {
 
    return new Promise((resolve) => {
 
      if(typeof google == "undefined" || typeof google.maps == "undefined"){
 
        this.disableMap();
 
        if(this.connectivityService.isOnline()){
          window['mapInit'] = () => {
            this.initMap().then((map) => {
              resolve(map);
            });
            this.enableMap();
          }
          let script = document.createElement("script");
          script.id = "googleMaps";
 
          if(this.apiKey){
            script.src = 'https://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
          } else {
            script.src = 'https://maps.google.com/maps/api/js?callback=mapInit';       
          }
 
          document.body.appendChild(script);   
        } 
      }else {
        if(this.connectivityService.isOnline()){
          /*this.initMap();*/
          this.initMap().then((map) => {
            resolve(map);
          });

          this.enableMap();
        }
        else {
          this.disableMap();
        }
      }
 
      this.addConnectivityListeners();
 
    });
 
  }
 
  initMap(): Promise<any> {
    this.mapInitialised = true;
   
    return new Promise((resolve) => {
 
      Geolocation.getCurrentPosition().then((position) => {
 
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        var styles = [
          {"featureType": "landscape", "stylers": [{"saturation": -100}, {"lightness": 65}, {"visibility": "off"}]},
          {"featureType": "poi", "stylers": [{"saturation": -100}, {"lightness": 51}, {"visibility": "off"}]},
          {"featureType": "road.highway", "stylers": [{"saturation": -100}, {"visibility": "on"}]},
          {"featureType": "road.arterial", "stylers": [{"saturation": -100}, {"lightness": 30}, {"visibility": "off"}]},
          {"featureType": "road.local", "stylers": [{"saturation": -100}, {"lightness": 40}, {"visibility": "off"}]},
          {"featureType": "transit", "stylers": [{"saturation": -100}, {"visibility": "off"}]},
          {"featureType": "administrative.province", "stylers": [{"visibility": "off"}]},
          {"featureType": "water", "elementType": "labels", "stylers": [{"visibility": "off"}, {"lightness": -25}, {"saturation": -100}]},
          {"featureType": "water", "elementType": "geometry", "stylers": [{"hue": "#ffff00"}, {"lightness": -25}, {"saturation": -97}]},
          /*{"featureType": "administrative.locality", "elementType": "labels","stylers": [ { "visibility": "off" }]}*/
        ];
 
        let mapOptions = {
          center: latLng,
          zoom: 2,
          maxZoom:20,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          styles: styles,
        }

        this.map = new google.maps.Map(this.mapElement, mapOptions);

        var kmzLayer = new google.maps.KmlLayer('http://www.caminosantiago.com/kmz/Camino_Frances_1.kmz');
        kmzLayer.setMap(this.map);

        resolve(this.map);
 
      });
 
    });
 
  }
 
  disableMap(): void {
    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "block";
    }
 
  }
 
  enableMap(): void {
    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "none";
    }
 
  }
 
  addConnectivityListeners(): void {
 
    this.connectivityService.watchOnline().subscribe(() => {
 
      console.log("online");
 
      setTimeout(() => {
 
        if(typeof google == "undefined" || typeof google.maps == "undefined"){
          this.loadGoogleMaps();
        } 
        else {
          if(!this.mapInitialised){
            this.initMap();
          }
 
          this.enableMap();
        }
 
      }, 2000);
 
    });
 
    this.connectivityService.watchOffline().subscribe(() => {
 
      console.log("offline");
 
      this.disableMap();
 
    });
 
  }

}
