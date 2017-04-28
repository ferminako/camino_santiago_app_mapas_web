import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, Slides } from 'ionic-angular';


@Component({
  selector: 'page-imagenes-contenido',
  templateUrl: 'imagenes-contenido.html'
})
export class ImagenesContenidoPage {

  index:any;
  images:any[];
  @ViewChild(Slides) slider: Slides;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.index = navParams.get( "index" );
    this.images = navParams.get( "images" );
  }

 ionViewDidEnter(){
    this.slider.slideTo(this.index);
  }

  close(){
    this.viewCtrl.dismiss();
  }

}
