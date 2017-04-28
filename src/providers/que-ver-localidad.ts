import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController} from 'ionic-angular';


@Injectable()
export class QueVerLocalidadService {

  data:any;
  path:string;
  pits:any;
  distancia:number=30;

  constructor(public http: Http, public loadingController: LoadingController) {
    this.path = "https://www.visitnavarra.info/nueva_central/api/1/secciones/view?";
    this.data = null;
  }

  obtenerPitsCercanos(localidad:any){

    let loader = this.loadingController.create({
      content: "Cargando..."
    });  
    loader.present();

    return new Promise((resolve, reject) => { 
      this.http.get(`${this.path}id=506&token=55001ddaca0693.55260683&filter={"sitios":{"id":17},"coordenadas":{"latitud":${localidad.latitud},"longitud":${localidad.longitud},"distancia":${this.distancia}},"etiquetas":[{"nombre": "cs_pit"}]}&with=imagenes,contenidos,coordenadas,etiquetas&lang=es&pagination={"contenidos":[99999999]}`)
        .map(res => res.json())
        .subscribe(data => {
          this.pits = this.procesarPits(data.contenidos);
          loader.dismiss();
          resolve(this.pits);
        }, error =>{
          loader.dismiss();
          reject(error);
        })
    });

  }

  obtenerPits(){
    let loader = this.loadingController.create({
      content: "Cargando..."
    });  
    loader.present();

    return new Promise((resolve, reject) => { 
      this.http.get(`${this.path}id=506&token=55001ddaca0693.55260683&filter={"sitios":{"id":17},"etiquetas":[{"nombre": "cs_pit"}]}&with=imagenes,contenidos,coordenadas,etiquetas&lang=es&pagination={"contenidos":[99999999]}`)
        .map(res => res.json())
        .subscribe(data => {
          this.pits = this.procesarPits(data.contenidos);
          loader.dismiss();
          resolve(this.pits);
        }, error =>{
          loader.dismiss();
          reject(error);
        })
    });

  }

  procesarPits(contenidos):any[]{
    let pits:any[] = [];
    
    contenidos.forEach(contenido => {

      let lat:string;
      let lng:string;

      if( contenido.coordenadas != undefined ){
        if( contenido.coordenadas.length > 0 ){
          lat = contenido.coordenadas[0].latitud;
          lng = contenido.coordenadas[0].longitud;
        }
      }

      let imagenes:any[] = [];
      if( contenido.imagenes != undefined ){
        if( contenido.imagenes.length > 0 ){
          for(let imagen of contenido.imagenes){
            imagenes.push(imagen.big_cache);
          }
        }
      }

      let auxPit = {
        id:contenido.id,
        nombre:contenido.titulo,
        latitud:lat,
        longitud:lng,
        imagenes:imagenes,
        texto:contenido.texto
      };

      pits.push(auxPit);
   
    });

    return this.ordernarArray(pits);
  }

  getPits(){
    return this.pits;
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



}
