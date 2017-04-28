import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
/*Pages*/
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LocalidadesPage } from '../pages/localidades/localidades';
import { MapaPage } from '../pages/mapa/mapa';
import { ArtePage } from '../pages/arte/arte';
import { NaturalezaPage } from '../pages/naturaleza/naturaleza';
import { ComerPage } from '../pages/comer/comer';
import { LocalidadesListadoPage } from '../pages/localidades-listado/localidades-listado';
import { DormirPage } from '../pages/dormir/dormir';
import { HistoriaPage } from '../pages/historia/historia';
import { CuriosidadesPage } from '../pages/curiosidades/curiosidades';
import { ConsejosPage } from '../pages/consejos/consejos';
import { ContenidosPage } from '../pages/contenidos/contenidos';
import { ContenidoPage } from '../pages/contenido/contenido';
import { LocalidadPage } from '../pages/localidad/localidad';
import { TabsLocalidadPage } from '../pages/tabs-localidad/tabs-localidad';
import { EstablecimientoPage } from '../pages/establecimiento/establecimiento';
import { AlojamientoPage } from '../pages/alojamiento/alojamiento';
import { ImagenesContenidoPage } from '../pages/imagenes-contenido/imagenes-contenido';
import { VerMasEstablecimientoPage } from '../pages/ver-mas-establecimiento/ver-mas-establecimiento';
import { MapaEstablecimientoPage } from '../pages/mapa-establecimiento/mapa-establecimiento';
import { MapaContenidoPage } from '../pages/mapa-contenido/mapa-contenido';
import { VerMasContenidoPage } from '../pages/ver-mas-contenido/ver-mas-contenido';
import { FiltrosEstablecimientosPage } from '../pages/filtros-establecimientos/filtros-establecimientos';
import { FiltrosAlojamientosPage } from '../pages/filtros-alojamientos/filtros-alojamientos';
import { MapaAlojamientoPage } from '../pages/mapa-alojamiento/mapa-alojamiento';
import { VerMasAlojamientoPage } from '../pages/ver-mas-alojamiento/ver-mas-alojamiento';
import { SeccionPagePage } from '../pages/seccion-page/seccion-page';
import { MapaGeneralPage} from '../pages/mapa-general/mapa-general';
import { LocalidadGeneralPage } from '../pages/localidad-general/localidad-general';

import { TabsLocalidadQueVerPage } from '../pages/tabs-localidad-que-ver/tabs-localidad-que-ver';
import { LocalidadQueVerPage } from '../pages/localidad-que-ver/localidad-que-ver';
import { MapaQueVerPage } from '../pages/mapa-que-ver/mapa-que-ver';

/*Services */
import { ContenidosService } from '../providers/contenidos';
import { ContenidoService } from '../providers/contenido';
import { LocalidadesService } from '../providers/localidades';
import { EstablecimientosService } from '../providers/establecimientos';
import { AlojamientosService } from '../providers/alojamientos';
import { QueVerLocalidadService } from '../providers/que-ver-localidad';
/*import { PruebaService} from '../providers/prueba';*/
/*Map & Connectivity Services */
import { GoogleMaps } from '../providers/google-maps';
import { GoogleMapsCluster } from '../providers/google-maps-cluster';
import { Connectivity } from '../providers/connectivity';

/*Pipes*/
import { CapitalizePipe } from '../pipes/capitalize';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LocalidadesPage,
    MapaPage,
    ArtePage,
    NaturalezaPage,
    ComerPage,
    LocalidadesListadoPage,
    DormirPage,
    HistoriaPage,
    CuriosidadesPage,
    ConsejosPage,
    ContenidosPage,
    ContenidoPage,
    ImagenesContenidoPage,
    LocalidadPage,
    TabsLocalidadPage,
    EstablecimientoPage,
    VerMasEstablecimientoPage,
    MapaEstablecimientoPage,
    VerMasContenidoPage,
    MapaContenidoPage,
    FiltrosEstablecimientosPage,
    AlojamientoPage,
    FiltrosAlojamientosPage,
    VerMasAlojamientoPage,
    MapaAlojamientoPage,
    SeccionPagePage,
    CapitalizePipe,
    MapaGeneralPage,
    LocalidadGeneralPage,
    TabsLocalidadQueVerPage,
    LocalidadQueVerPage,
    MapaQueVerPage
  ],
  imports: [
    IonicModule.forRoot(MyApp,{
      backButtonText: '',
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LocalidadesPage,
    MapaPage,
    ArtePage,
    NaturalezaPage,
    ComerPage,
    LocalidadesListadoPage,
    DormirPage,
    HistoriaPage,
    CuriosidadesPage,
    ConsejosPage,
    ContenidosPage,
    ContenidoPage,
    ImagenesContenidoPage,
    LocalidadPage,
    TabsLocalidadPage,
    EstablecimientoPage,
    VerMasEstablecimientoPage,
    MapaEstablecimientoPage,
    VerMasContenidoPage,
    MapaContenidoPage,
    FiltrosEstablecimientosPage,
    AlojamientoPage,
    FiltrosAlojamientosPage,
    VerMasAlojamientoPage,
    MapaAlojamientoPage,
    SeccionPagePage,
    MapaGeneralPage,
    LocalidadGeneralPage,
    TabsLocalidadQueVerPage,
    LocalidadQueVerPage,
    MapaQueVerPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
  GoogleMaps, GoogleMapsCluster, Connectivity, EstablecimientosService, AlojamientosService, QueVerLocalidadService ]
})
export class AppModule {}
