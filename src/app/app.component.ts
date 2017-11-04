import { Component, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SelectItem, GMap } from 'primeng/primeng';
import { RegistrosService } from './registros.service';

declare var google: any;

const MAP_LAT = 20.98558;
const MAP_LNG = -89.58477;

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  acerca_de = '';
  mision = '';
  vision = '';
  contacto = '';
  display;

  mapOptions = {
    center: { lat: MAP_LAT, lng: MAP_LNG },
    zoom: 15
  };

  mapMarcador = [];

  constructor(private serv: RegistrosService) {
    this.resetDialogs();
    serv.paginas$.subscribe(r => {
      this.acerca_de = r.acerca_de;
      this.mision = r.mision;
      this.vision = r.vision;
      this.contacto = r.contacto;
    });
  }

  showDialog(dialogo) {
    this.resetDialogs();
    this.display[dialogo] = true;
    this.establecerMarcador();
  }

  resetDialogs() {
    this.display = {
      acercade: false,
      mision: false,
      vision: false,
      contacto: false
    };
  }

  establecerMarcador() {
    this.mapMarcador = [new google.maps.Marker({ position: { lat: MAP_LAT, lng: MAP_LNG }, title: '' })];
  }
}
