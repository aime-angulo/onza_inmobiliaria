import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
impot
import Inmueble from '../../modelos/inmueble';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent {
  d: Inmueble = new Inmueble({});
  options = {
    center: { lat: 36.890257, lng: 30.707417 },
    zoom: 12
  };

  overlays = [
    new google.maps.Marker({ position: { lat: 36.879466, lng: 30.667648 }, title: "Konyaalti" }),
    new google.maps.Marker({ position: { lat: 36.883707, lng: 30.689216 }, title: "Ataturk Park" }),
    new google.maps.Marker({ position: { lat: 36.885233, lng: 30.702323 }, title: "Oldtown" }),
    new google.maps.Polygon({
      paths: [
        { lat: 36.9177, lng: 30.7854 }, { lat: 36.8851, lng: 30.7802 }, { lat: 36.8829, lng: 30.8111 }, { lat: 36.9177, lng: 30.8159 }
      ], strokeOpacity: 0.5, strokeWeight: 1, fillColor: '#1976D2', fillOpacity: 0.35
    }),
    new google.maps.Circle({ center: { lat: 36.90707, lng: 30.56533 }, fillColor: '#1976D2', fillOpacity: 0.35, strokeWeight: 1, radius: 1500 }),
    new google.maps.Polyline({ path: [{ lat: 36.86149, lng: 30.63743 }, { lat: 36.86341, lng: 30.72463 }], geodesic: true, strokeColor: '#FF0000', strokeOpacity: 0.5, strokeWeight: 2 })
  ];



  constructor(private route: ActivatedRoute) {
    route.params.subscribe(params => {
      this.setInmueble(params.id);
    });
  }

  setInmueble(id: string) {
    this.d.id = id;
    this.d.encabezado = 'loquese';
  }
}
