import { Component } from '@angular/core';
import { Platform, LoadingController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { HomePage } from '../pages/home/home';
import { ModalConexionPage } from '../pages/modal-conexion/modal-conexion';
import { EstablecimientosService} from '../providers/establecimientos';
import { Connectivity} from '../providers/connectivity';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = HomePage;
  cnc:any;
  loader:any;

  constructor(
    platform: Platform,
    public loadingCtrl:LoadingController
  ) {

    platform.ready().then(() => {
        
        
        this.cnc = new Connectivity(platform);

        
        this.cnc.watchOffline().subscribe(() => {
            console.log("offline");
            this.loader = this.loadingCtrl.create({
              content: "Esperando conexión..."
            });
            this.loader.present();
           
        });

        this.cnc.watchOnline().subscribe(() => {
            this.loader.dismiss();
            console.log("oNline");
        });


      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
