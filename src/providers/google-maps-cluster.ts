import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as MarkerClusterer from 'node-js-marker-clusterer';
import 'rxjs/add/operator/map';
import { EstablecimientoPage } from '../pages/establecimiento/establecimiento';
import { AlojamientoPage } from '../pages/alojamiento/alojamiento';
import { LocalidadGeneralPage } from '../pages/localidad-general/localidad-general';
import { EstablecimientosService } from 'establecimientos';
import { App, NavController } from 'ionic-angular';
import { ContenidoList } from '../models/contenidoList';
import { ContenidoPage } from '../pages/contenido/contenido';

@Injectable()
export class GoogleMapsCluster {

    markerCluster: any;
    locations: any;
    establecimientos:any[] = [];
 
    constructor(public http: Http, private app: App) {}
 
    addCluster(map,establecimientos?:any[],comerDormir?:string){
        let bounds = new google.maps.LatLngBounds();
        if(google.maps){
            
            if( establecimientos != undefined ){
                this.establecimientos = establecimientos;
            }
            
            let markers:any[] = [];
            
            for( let establecimiento of establecimientos ){

                let latLngMarker = new google.maps.LatLng(establecimiento.latitud, establecimiento.longitud)
                
                bounds.extend(latLngMarker);
                
                let marker = null;
                if( comerDormir == "comer" ) {
                    marker = new google.maps.Marker({
                        position: latLngMarker,
                       /* label: establecimiento.nombre.substring(0,14)+"...",*/
                        icon:"assets/images/markers/map-marker-establecimiento.png"
                    });
                }else if( comerDormir == "dormir" ){
                    marker = new google.maps.Marker({
                        position: latLngMarker,
                       /* label: establecimiento.nombre.substring(0,14)+"...",*/
                        icon:"assets/images/markers/map-marker-alojamiento.png"
                    });
                }else if( comerDormir == "localidades" ){
                    marker = new google.maps.Marker({
                        position: latLngMarker,
                        /*label: establecimiento.localidad.substring(0,14)+"...",*/
                        icon:"assets/images/markers/map-marker-localidad.png",
                    });
                }else if( comerDormir == "pits" ){
                    marker = new google.maps.Marker({
                        position: latLngMarker,
                       /* label: establecimiento.nombre.substring(0,14)+"...",*/
                        icon:"assets/images/markers/map-marker-pit.png"
                    });
                }
            
                

                /*let imagen = "assets/images/no_foto.png";
                if( establecimiento.fotoPrincipal && establecimiento.fotoPrincipal != "" ){
                    imagen = establecimiento.fotoPrincipal;
                }

                let infowindow = new google.maps.InfoWindow({
                content:
                "<div class='infoWindow'><div class='imgInfoWindow'><img style='width:150px;margin:0 auto;display:block;' src='"+imagen+"'>"+
                "</div><div class='infoWindowDescrpicion'><h2>"+
                establecimiento.nombre+"</h2><br><span>"
                +establecimiento.direccion+
                "</span><a target='_blank' class='btn_info' href='"+establecimiento.id+"'>Más Info</a></div></div>"
                });*/
            
               /* let infowindow = new google.maps.InfoWindow({
                content:
                '<div class="info-box-wrap"><img src="'+imagen+
                '" /><div class="info-box-text-wrap"><h6 class="address">'+establecimiento.nombre+
                '</h6><p class="price">'+establecimiento.direccion+
                '</p></div><div class="action-btns"><i onClick="openPageEstablecimiento('
                +establecimiento.id+')">Ver más</i></div></div>'});

                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.open(map,marker);
                });*/

                let that = this;
                google.maps.event.addListener(marker, 'click', function() {
                    if( comerDormir == "comer"){
                        that.openPageEstablecimiento(establecimiento.id);
                    }else if( comerDormir == "dormir"){
                        that.openPageAlojamiento(establecimiento);
                    }else if( comerDormir == "localidades" ){
                        that.openPageLocalidad(establecimiento);
                    }else if( comerDormir == "pits" ){
                        that.openPageContenido(establecimiento);
                    }
                });
                markers.push(marker);
            }

            this.markerCluster = new MarkerClusterer(map, markers, {imagePath: 'assets/images/marker-clusterer/m',maxZoom:'17'});
            map.fitBounds(bounds);
        } else {
            console.warn('Google maps needs to be loaded before adding a cluster');
        }
 
    }

    obtenerCoords():any[]{
        let res:any[] = [];
        for (let establecimiento of this.establecimientos) {
            res.push( {lat:+establecimiento.latitud,lng:+establecimiento.longitud} );
        }
        return res;
    }

    openPageEstablecimiento(id:any){
        var navCtrl = this.app.getActiveNav();
        navCtrl.push( EstablecimientoPage, {"idEstablecimiento":String(id)});
    }

    openPageAlojamiento(alojamiento:any){
        var navCtrl = this.app.getActiveNav();
        navCtrl.push( AlojamientoPage, {"alojamiento":alojamiento});
    }

    openPageLocalidad(localidad:any){
        var navCtrl = this.app.getActiveNav();
        navCtrl.push( LocalidadGeneralPage, {"localidad": localidad });
    }

    openPageContenido(pit:any){
        var navCtrl = this.app.getActiveNav();
        let cl= new ContenidoList(pit.id,pit.nombre,"");
        navCtrl.push( ContenidoPage, {"contenidoList": cl});
    }

}
