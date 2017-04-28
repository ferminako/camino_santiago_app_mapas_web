import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class EstablecimientosService {

  data:any;
  establecimientos:any;
  path:string;
  user:any = {"name":"api_app_user","password":"a3$sd32Sa2O"};
  

  constructor(public http: Http, public loadingController: LoadingController) {

    this.path = "https://www.reservon.es/central/apis/restaurant/list?";
    this.data = null;
  }

  obtenerEstablecimientosCercanos(localidad:any,nombre?:string,tipo?:number,distancia?:number){
    let loader = this.loadingController.create({
      content: "Cargando..."
    });  
    loader.present();
    
    /*if (this.data) {
      return Promise.resolve(this.data);
    }*/

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', "Basic " + btoa(this.user.name+":"+this.user.password));

    let coordenadas:any = null;
    if( localidad.coordenadas != undefined ){
      if( localidad.coordenadas.length > 0 ){
        coordenadas = { "lat":localidad.coordenadas[0].latitud,"lng":localidad.coordenadas[0].longitud };
      }
    }

    let distanciaParam:number = 20;
    let nombreParam:string = "";
    let tipoParam:number = 2;

    if( nombre ){
      nombreParam = nombre;
    }

    if( tipo ){
      tipoParam = tipo;
    }

    if( distancia ){
      distanciaParam = distancia;
    }

        
    return new Promise((resolve, reject) => { 
      this.http.get(
        `${this.path}latitude=${coordenadas.lat}&longitude=${coordenadas.lng}&km=${distanciaParam}&resultsOrder=2&establishmentType=${tipoParam}&estNameLike=${nombreParam}`,{headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          this.data = this.establecimientos = this.ordernarArray(data.establecimientos);
          loader.dismiss();
          resolve(this.data);
        }, error =>{
          loader.dismiss();
          reject(error);
        })
    });
  }

  ordernarArray(contenidos){
    let contenidosRes = contenidos;
    
    contenidosRes.sort(function(a, b){
      
      var nameA=a.nombre.toLowerCase();

      let auxA=nameA.split(" ")[0];
      if(auxA == ""){
        auxA = nameA.split(" ")[1];
      }
     
      nameA = auxA;


      var nameB=b.nombre.toLowerCase();

      let auxB=nameB.split(" ")[0];
      if(auxB == ""){
        auxB = nameB.split(" ")[1];
      }
      nameB = auxB;

    
      if (nameA < nameB) //sort string ascending
          return -1 
      if (nameA > nameB)
          return 1
      return 0 //default return value (no sorting)
    });

    return contenidosRes;

  }

  getEstablecimientos(){
    return this.establecimientos;
  }

  obtenerEstablecimiento(idEstablecimiento:string){

    let loader = this.loadingController.create({
      content: "Cargando..."
    });  
    loader.present();

    /*if (this.data) {
      return Promise.resolve(this.data);
    }*/

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', "Basic " + btoa(this.user.name+":"+this.user.password));
 
    return new Promise((resolve, reject) => { 
      this.http.get(`${this.path}id=${idEstablecimiento}&resultsOrder=2`,{headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          this.data = data.establecimientos[0];
          loader.dismiss();
          resolve(this.data);
        }, error =>{
          loader.dismiss();
          reject(error);
        })
    });
  }
}
