import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController, NavController } from 'ionic-angular';

@Injectable()
export class ContenidoService {

  data:any;
  path:string;


  constructor(public http: Http, public navCtrl: NavController, public loadingController: LoadingController) {

    this.path = "https://www.visitnavarra.info/api/1/contenidos/view?";
    this.data = null;
  }

  obtenerContenido(idContenido:number){
    let loader = this.loadingController.create({
      content: "Cargando..."
    });  
    loader.present();
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }
    
    return new Promise((resolve, reject) => { 
      this.http.get(`${this.path}id=${idContenido}&token=55001ddaca0693.55260683&filter={"sitios":{"id":17}}&with=contenidos,imagenes,coordenadas,migas_de_pan&lang=es`)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          loader.dismiss();
          resolve(this.data);
        }, error =>{
          loader.dismiss();
          reject(error);
        })
    });

  }

  
}
