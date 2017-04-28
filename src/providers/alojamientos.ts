import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController} from 'ionic-angular';

@Injectable()
export class AlojamientosService {

  data:any;
  path:string;
  alojamientos:any;

  distanciaParam:number = 20;
  nombreParam:string = "";
  tipoParam:any = null;


  constructor(public http: Http, public loadingController: LoadingController) {
    
    this.path = "https://www.visitnavarra.info/nueva_central/api/1/secciones/view?";
    this.data = null;
  }

  obtenerAlojamientosCercanos(localidad:any,nombre?:string,tipo?:any,distancia?:number){

    let loader = this.loadingController.create({
      content: "Cargando..."
    });  
    loader.present();

    let coordenadas:any = null;
    if( localidad.coordenadas != undefined ){
      if( localidad.coordenadas.length > 0 ){
        coordenadas = { "lat":localidad.coordenadas[0].latitud,"lng":localidad.coordenadas[0].longitud };
      }
    }

   

    if( nombre != null || nombre != undefined ){
      this.nombreParam = nombre;
    }

    if( tipo ){
      this.tipoParam = tipo;
    }

    if( distancia ){
      this.distanciaParam = distancia;
    }
    
    return new Promise((resolve, reject) => { 
      this.http.get(`${this.path}id=506&token=55001ddaca0693.55260683&filter={"sitios":{"id":17},"coordenadas":{"latitud":${coordenadas.lat},"longitud":${coordenadas.lng},"distancia":${this.distanciaParam}},"etiquetas":[{"nombre": "cs_dormir"}]}&with=imagenes,contenidos,coordenadas,etiquetas&lang=es&pagination={"contenidos":[99999999]}`)
        .map(res => res.json())
        .subscribe(data => {
          this.alojamientos = this.procesarAlojamientos(data);
          loader.dismiss();
          resolve(this.alojamientos);
        }, error =>{
          loader.dismiss();
          reject(error);
        })
    });

  }

  procesarAlojamientos(data:any):void{
    let alojamientosRes = undefined;
    if (  data == undefined ){
      return alojamientosRes;
    }

    if (  data.contenidos == undefined ){
      return alojamientosRes;
    }

    if (  data.contenidos.length < 1 ){
      return alojamientosRes;
    }else{

      alojamientosRes = [];
      for(let alojamiento of data.contenidos){

        let auxAlojamiento={nombre:"",direccion:"",poblacion:"",provincia:"",latitud:"",longitud:"",imagenes:[],texto:"",tipo:"",noFicha:false,email:"",telefono:""};

        let coordenadas:any = null;
        if( alojamiento.coordenadas != undefined ){
          if( alojamiento.coordenadas.length > 0 ){
            auxAlojamiento.latitud = alojamiento.coordenadas[0].latitud;
            auxAlojamiento.longitud = alojamiento.coordenadas[0].longitud;
          }
        }

        let etiquetas:any = null;
        if( alojamiento.etiquetas != undefined ){
          if( alojamiento.etiquetas.length > 0 ){
            for( let etiqueta of alojamiento.etiquetas ){
              
              if( etiqueta.nombre == "cs_hotel" || etiqueta.nombre == "cs_camping" || etiqueta.nombre == "cs_apartahotel" || etiqueta.nombre == "cs_apartamento_turístico" ||
               etiqueta.nombre == "cs_casa_rural" || etiqueta.nombre == "cs_hostal" || etiqueta.nombre == "cs_posada" || etiqueta.nombre == "cs_hotel_rural" || etiqueta.nombre == "cs_pension" ){
                auxAlojamiento.tipo = etiqueta.nombre;
              }

              if( etiqueta.nombre == "cs_no_ficha" ){
                auxAlojamiento.noFicha = true;
              }

            }
          }
        }

        let imagenes:any = null;
        if( alojamiento.imagenes != undefined ){
          if( alojamiento.imagenes.length > 0 ){
            for(let imagen of alojamiento.imagenes){
              auxAlojamiento.imagenes.push(imagen.big_cache);
            }
          }
        }

        auxAlojamiento.nombre = this.limpiarNombreAlojamiento( alojamiento.titulo );

        auxAlojamiento.direccion = alojamiento.direccion;
        auxAlojamiento.poblacion = alojamiento.poblacion;
        auxAlojamiento.provincia = alojamiento.provincia;
        auxAlojamiento.texto = alojamiento.texto;
        auxAlojamiento.email = alojamiento.email;
        auxAlojamiento.telefono = alojamiento.telefono;

        alojamientosRes.push(auxAlojamiento);
      }
      
      return this.filtrarAlojamientos(this.ordernarArray(alojamientosRes));
      
    }
  }

  ordernarArray(alojamientos){
    let alojamientosRes = alojamientos;
    
    alojamientosRes.sort(function(a, b){
      
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

    return alojamientosRes;

  }

  limpiarNombreAlojamiento(nombre:string):string{

    let nombreAux = nombre.trim();
    
    nombreAux = nombreAux.toLowerCase();
    nombreAux = this.capitalizeFirstLetter(nombreAux);
    

    nombreAux = nombreAux.replace(/Hotel/g,''); 
    nombreAux = nombreAux.replace(/hotel/g,''); 
    nombreAux = nombreAux.replace(/HOTEL/g,'');  

    nombreAux = nombreAux.replace(/Camping/g,'');
    nombreAux = nombreAux.replace(/camping/g,'');
    nombreAux = nombreAux.replace(/CAMPING/g,'');

    nombreAux = nombreAux.replace(/Hostal/g,'');
    nombreAux = nombreAux.replace(/hostal/g,'');
    nombreAux = nombreAux.replace(/HOSTAL/g,'');

    nombreAux = nombreAux.replace(/Apartahotel/g,'');
    nombreAux = nombreAux.replace(/apartahotel/g,'');
    nombreAux = nombreAux.replace(/APARTAHOTEL/g,'');

    nombreAux = nombreAux.replace(/Apartamento Turístico/g,'');
    nombreAux = nombreAux.replace(/Apartamento turístico/g,'');
    nombreAux = nombreAux.replace(/apartamento turístico/g,'');
    nombreAux = nombreAux.replace(/APARTAMENTO TURÍSTICO/g,'');

    nombreAux = nombreAux.replace(/Casa Rural/g,'');
    nombreAux = nombreAux.replace(/Casa rural/g,'');
    nombreAux = nombreAux.replace(/casa rural/g,'');

    nombreAux = nombreAux.replace(/Posada/g,'');
    nombreAux = nombreAux.replace(/posada/g,'');
    nombreAux = nombreAux.replace(/POSADA/g,'');
    
    nombreAux = nombreAux.replace(/Hotel Rural/g,'');
    nombreAux = nombreAux.replace(/Hotel rural/g,'');
    nombreAux = nombreAux.replace(/HOTEL RURAL/g,'');

    nombreAux = nombreAux.replace(/Pensión/g,'');
    nombreAux = nombreAux.replace(/pensión/g,'');
    nombreAux = nombreAux.replace(/PENSION/g,'');

    nombreAux = nombreAux.replace(/\*/g,'');

    nombreAux = nombreAux.toLowerCase();

    nombreAux = this.capitalizeFirstLetter(nombreAux);

    return nombreAux;
  }

  capitalizeFirstLetter(string):string {
      if(string.charAt(0) == " "){
        return string.charAt(1).toUpperCase() + string.slice(2);
      }else{
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
  }

  limpiarFiltros(){
    this.distanciaParam = 20;
    this.nombreParam = "";
    this.tipoParam = null;
  }

  filtrarAlojamientos(alojamientos:any):any{
    
    let alojamientosRes:any [] = [];
    let alojamientosFiltroTipo:any = [];
    let alojamientosFiltroTexto:any = [];

    if( this.nombreParam != "" ){
      alojamientos.forEach((alojamiento, index) => {
        if(alojamiento.nombre.toLowerCase().includes(this.nombreParam.toLowerCase())){
          alojamientosFiltroTexto.push(alojamiento);
        }
      });
    }
       
    if(this.tipoParam != undefined){

      alojamientos.forEach((alojamiento, index) => {
          
          if(this.tipoParam.apartahotel == true && alojamiento.tipo.split("cs_").pop() == "apartahotel"){
            alojamientosFiltroTipo.push(alojamiento);              
            return;
          }
          
          if(this.tipoParam.apartamento_turistico == true && alojamiento.tipo.split("cs_").pop() == "apartamento_turistico"){
            alojamientosFiltroTipo.push(alojamiento);              
            return;
          }          
          
          if(this.tipoParam.camping == true && alojamiento.tipo.split("cs_").pop() == "camping"){
            alojamientosFiltroTipo.push(alojamiento);            
            return;
          }          
          
          if(this.tipoParam.casa_rural == true && alojamiento.tipo.split("cs_").pop() == "casa_rural"){
            alojamientosFiltroTipo.push(alojamiento);              
            
            return;          }
          
          
          if(this.tipoParam.hostal == true && alojamiento.tipo.split("cs_").pop() == "hostal"){
            alojamientosFiltroTipo.push(alojamiento);              
            return;
          }          
          
          if(this.tipoParam.hotel == true && alojamiento.tipo.split("cs_").pop() == "hotel"){
            alojamientosFiltroTipo.push(alojamiento);              
            return;
          }          
          
          if(this.tipoParam.hotel_rural == true && alojamiento.tipo.split("cs_").pop() == "hotel_rural"){
            alojamientosFiltroTipo.push(alojamiento);             
            return;
          }
          
          if(this.tipoParam.pension == true && alojamiento.tipo.split("cs_").pop() == "pension"){
            alojamientosFiltroTipo.push(alojamiento);            
            return;
          }          
          
          if(this.tipoParam.posada == true && alojamiento.tipo.split("cs_").pop() == "posada"){
            alojamientosFiltroTipo.push(alojamiento);            
            return;
          }  

      });

      if( alojamientosFiltroTexto.length > 0 ){
        for( let a of alojamientosFiltroTexto ){
          for( let b of alojamientosFiltroTexto ){
            if( a.id == b.id ){
              alojamientosRes.push(a);
            }
          }
        }

      }else{
        alojamientosRes = alojamientosFiltroTipo;
      }
      
    }else{
       alojamientosRes = alojamientos;
    }

    return alojamientosRes;

  }

  getAlojamientos(){
    return this.alojamientos;
  }

}
