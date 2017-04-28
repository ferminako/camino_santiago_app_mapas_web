import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController, NavController } from 'ionic-angular';

@Injectable()
export class ContenidosService {

  data:any;
  path:string;
  loader:any = null;

  constructor(public http: Http, public navCtrl: NavController, public loadingController: LoadingController) {
    
    let loader = this.loadingController.create({
      content: "Cargando..."
    });  
    loader.present();
    this.loader = loader;

    this.path = "https://www.visitnavarra.info/nueva_central/api/1/secciones/view?";
    this.data = null;
  }

  obtenerContenidosPorSeccion(idSeccion:number){
    
    return new Promise((resolve, reject) => { 
      this.http.get(`${this.path}id=${idSeccion}&token=55001ddaca0693.55260683&filter={"sitios":{"id":17}}&attributesPermited={"contenidos":["id","titulo"]}&with=subsecciones,contenidos,imagenes,etiquetas&lang=es`)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data.contenidos;
          this.loader.dismiss();
          resolve(this.data);
        }, error =>{
          this.loader.dismiss();
          reject(error);
        })
    });
  }

  obtenerContenidosPorSeccionSubSeccion(idSeccion:number){

    return new Promise((resolve, reject) => { 
      this.http.get(`${this.path}id=${idSeccion}&token=55001ddaca0693.55260683&filter={"sitios":{"id":17}}&attributesPermited={"contenidos":["id","titulo"]}&with=subsecciones,contenidos,imagenes,imagenes_secciones,etiquetas&lang=es`)
        .map(res => res.json())
        .subscribe(data => {
          let auxContenidos:any [] = [];
          for(let subseccion of data.subsecciones){
            
            let imagen:string = "assets/images/no_foto.png";
            if( subseccion['contenidos'][0]['imagenes'].length > 0){
              imagen = subseccion['contenidos'][0]['imagenes'][0]['big_cache'];
            } 

            let contenidoList = { id:subseccion['contenidos'][0]['id'], name:this.sanitize(subseccion['contenidos'][0]['titulo']), image:imagen};
            auxContenidos.push(contenidoList);
          }
          this.data = auxContenidos;
          this.loader.dismiss();
          resolve(this.data);
        }, error =>{
          this.loader.dismiss();
          reject(error);
        })
    });
  }

  sanitize(value:string):string {
    value = value.toLowerCase();
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

}
