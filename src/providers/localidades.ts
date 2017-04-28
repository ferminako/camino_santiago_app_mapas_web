import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LocalidadesService {

  constructor(public http: Http) {}

  loadLocalidades():any[]{
    return [
      {
        "provincia":"Navarra",
        "id":804,
        "localidad":"Roncesvalles",
        "imagen":"assets/images/localidades/roncesvalles.jpg",
        "distancia":"805",
        "latitud":"43.009286",
        "longitud":"-1.3199184"
      },
      {
        "provincia":"Navarra",
        "id":805,
        "localidad":"Zubiri",
        "imagen":"assets/images/localidades/zubiri.jpg",
        "distancia":"682",
        "latitud":"42.926816",
        "longitud":"-1.507350"
      },
      {
        "provincia":"Navarra",
        "id":806,
        "localidad":"Pamplona",
        "imagen":"assets/images/localidades/pamplona.jpg",
        "distancia":"665",
        "latitud":"42.812656",
        "longitud":"-1.646138"
      },
      {
        "provincia":"Navarra",
        "id":807,
        "localidad":"Puente la Reina",
        "imagen":"assets/images/localidades/puente-la-reina.jpg",
        "distancia":"641",
        "latitud":"42.672292",
        "longitud":"-1.813583"
      },
      {
        "provincia":"Navarra",
        "id":808,
        "localidad":"Estella",
        "imagen":"assets/images/localidades/estella.jpg",
        "distancia":"621",
        "latitud":"42.671965",
        "longitud":"-2.031882"
      },
      {
        "provincia":"Navarra",
        "id":809,
        "localidad":"Los Arcos",
        "imagen":"assets/images/localidades/los-arcos.jpg",
        "distancia":"602",
        "latitud":"42.568491",
        "longitud":"-2.191540"
      },

      {
        "provincia":"La Rioja",
        "id":810,
        "localidad":"Logroño",
        "imagen":"assets/images/localidades/logrono.jpg",
        "distancia":"573",
        "latitud":"42.462828",
        "longitud":"-2.444934"
      },
      {
        "provincia":"La Rioja",
        "id":811,
        "localidad":"Nájera",
        "imagen":"assets/images/localidades/najera.jpg",
        "distancia":"552",
        "latitud":"42.416750",
        "longitud":"-2.729388"
      },
      {
        "provincia":"La Rioja",
        "id":812,
        "localidad":"Santo Domingo de la Calzada",
        "imagen":"assets/images/localidades/santo-domingo-de-la-calzada.jpg",
        "distancia":"529",
        "latitud":"42.439135",
        "longitud":"-2.953637"
      },

      {
        "provincia":"Burgos",
        "id":813,
        "localidad":"Belorado",
        "imagen":"assets/images/localidades/belorado.jpg",
        "distancia":"485",
        "latitud":"42.419437",
        "longitud":"-3.191767"
      },
      {
        "provincia":"Burgos",
        "id":814,
        "localidad":"San Juan de Ortega",
        "imagen":"assets/images/localidades/san-juan-de-ortega.jpg",
        "distancia":"485",
        "latitud":"42.375338",
        "longitud":"-3.435810"
      },
      {
        "provincia":"Burgos",
        "id":815,
        "localidad":"Burgos",
        "imagen":"assets/images/localidades/burgos.jpg",
        "distancia":"462",
        "latitud":"42.343985",
        "longitud":"-3.696891"
      },
      {
        "provincia":"Burgos",
        "id":816,
        "localidad":"Hontanas",
        "imagen":"assets/images/localidades/hontanas.jpg",
        "distancia":"431",
        "latitud":"42.312443",
        "longitud":"-4.044029"
      },


      {
        "provincia":"Palencia",
        "id":817,
        "localidad":"Frómista",
        "imagen":"assets/images/localidades/fromista.jpg",
        "distancia":"398",
        "latitud":"42.267877",
        "longitud":"-4.405328"
      },
      {
        "provincia":"Palencia",
        "id":818,
        "localidad":"Carrión de los Condes",
        "imagen":"assets/images/localidades/carrion-de-los-condes.jpg",
        "distancia":"379",
        "latitud":"42.338018",
        "longitud":"-4.603015"
      },
      {
        "provincia":"Palencia",
        "id":819,
        "localidad":"Calzadilla de la Cueza",
        "imagen":"assets/images/localidades/calzadilla-de-la-cueza.jpg",
        "distancia":"362",
        "latitud":"42.329262",
        "longitud":"-4.804457"
      },


      {
        "provincia":"León",
        "id":820,
        "localidad":"Sahagun",
        "imagen":"assets/images/localidades/sahagun.jpg",
        "distancia":"342",
        "latitud":"42.371025",
        "longitud":"-5.029756"
      },
      {
        "provincia":"León",
        "id":821,
        "localidad":"Reliegos",
        "imagen":"assets/images/localidades/reliegos.jpg",
        "distancia":"312",
        "latitud":"42.474647",
        "longitud":"-5.355021"
      },
      {
        "provincia":"León",
        "id":822,
        "localidad":"León",
        "imagen":"assets/images/localidades/leon.jpg",
        "distancia":"295",
        "latitud":"42.598728",
        "longitud":"-5.567094"
      },
      {
        "provincia":"León",
        "id":823,
        "localidad":"Villadangos del Paramo",
        "imagen":"assets/images/localidades/villadangos-del-paramo.jpg",
        "distancia":"275",
        "latitud":"42.516887",
        "longitud":"-5.767144"
      },
      {
        "provincia":"León",
        "id":824,
        "localidad":"Astorga",
        "imagen":"assets/images/localidades/astorga.jpg",
        "distancia":"229",
        "latitud":"42.454941",
        "longitud":"-6.053249"
      },
      {
        "provincia":"León",
        "id":825,
        "localidad":"Rabanal del Camino",
        "imagen":"assets/images/localidades/rabanal-del-camino.jpg",
        "distancia":"249",
        "latitud":"42.481295",
        "longitud":"-6.284559"
      },
      {
        "provincia":"León",
        "id":826,
        "localidad":"Molinaseca",
        "imagen":"assets/images/localidades/molinaseca.jpg",
        "distancia":"204",
        "latitud":"42.537625",
        "longitud":"-6.519163"
      },
      {
        "provincia":"León",
        "id":827,
        "localidad":"Villafranca del Bierzo",
        "imagen":"assets/images/localidades/villafranca-del-bierzo-leon.jpg",
        "distancia":"177",
        "latitud":"42.608507",
        "longitud":"-6.808547"
      },


      {
        "provincia":"Lugo",
        "id":828,
        "localidad":"Cebreiro",
        "imagen":"assets/images/localidades/o-cebreiro.jpg",
        "distancia":"149",
        "latitud":"42.707807",
        "longitud":"-7.043791"
      },
      {
        "provincia":"Lugo",
        "id":829,
        "localidad":"Triacastela",
        "imagen":"assets/images/localidades/triacastela.jpg",
        "distancia":"128",
        "latitud":"42.756816",
        "longitud":"-7.240083"
      },
      {
        "provincia":"Lugo",
        "id":830,
        "localidad":"Sarria",
        "imagen":"assets/images/localidades/sarria.jpg",
        "distancia":"11",
        "latitud":"42.780837",
        "longitud":"-7.414096"
      },
      {
        "provincia":"Lugo",
        "id":831,
        "localidad":"Portomarín",
        "imagen":"assets/images/localidades/portomarin.jpg",
        "distancia":"90",
        "latitud":"42.807461",
        "longitud":"-7.615820"
      },
      {
        "provincia":"Lugo",
        "id":832,
        "localidad":"Palas de Rey",
        "imagen":"assets/images/localidades/palas-de-rey.jpg",
        "distancia":"68",
        "latitud":"42.873882",
        "longitud":"-7.867800"
      },


      {
        "provincia":"La Coruña",
        "id":833,
        "localidad":"Arzúa",
        "imagen":"assets/images/localidades/arzua.jpg",
        "distancia":"38",
        "latitud":"42.929813",
        "longitud":"-8.160541"
      },
      {
        "provincia":"La Coruña",
        "id":834,
        "localidad":"Rúa",
        "imagen":"assets/images/localidades/rua.jpg",
        "distancia":"20",
        "latitud":"42.914427",
        "longitud":"-8.351392"
      },
      {
        "provincia":"La Coruña",
        "id":835,
        "localidad":"Santiago de Compostela",
        "imagen":"assets/images/localidades/santiago-de-compostela.jpg",
        "distancia":"0",
        "latitud":"42.878223",
        "longitud":"-8.544846"
      }

    ];
  }

}
