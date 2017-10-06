import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import Inmueble from '../../modelos/inmueble';
import { Image } from 'angular-modal-gallery';

declare var google: any;

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent {
  d: Inmueble = new Inmueble({});
  galeria: Array<Image>;

  map = {
    center: '20.9978737,-89.6516842',
    marker: { lat: 20.9978737, lng: -89.6516842 }
  };

  // overlays = [
  //   new google.maps.Marker({ position: { lat: 36.879466, lng: 30.667648 }, title: "Konyaalti" }),
  //   new google.maps.Marker({ position: { lat: 36.883707, lng: 30.689216 }, title: "Ataturk Park" }),
  //   new google.maps.Marker({ position: { lat: 36.885233, lng: 30.702323 }, title: "Oldtown" }),
  //   new google.maps.Polygon({
  //     paths: [
  //       { lat: 36.9177, lng: 30.7854 }, { lat: 36.8851, lng: 30.7802 }, { lat: 36.8829, lng: 30.8111 }, { lat: 36.9177, lng: 30.8159 }
  //     ], strokeOpacity: 0.5, strokeWeight: 1, fillColor: '#1976D2', fillOpacity: 0.35
  //   }),
  //   new google.maps.Circle({ center: { lat: 36.90707, lng: 30.56533 }, fillColor: '#1976D2', fillOpacity: 0.35, strokeWeight: 1, radius: 1500 }),
  //   new google.maps.Polyline({ path: [{ lat: 36.86149, lng: 30.63743 }, { lat: 36.86341, lng: 30.72463 }], geodesic: true, strokeColor: '#FF0000', strokeOpacity: 0.5, strokeWeight: 2 })
  // ];



  constructor(private route: ActivatedRoute) {
    route.params.subscribe(params => {
      this.setInmueble(params.id);
    });
  }

  setInmueble(id: string) {
    this.d.id = id;
    this.d.encabezado = 'loquesea';
    this.galeria = this.d.imagenes.map(imagen => new Image(imagen));
  }
}
