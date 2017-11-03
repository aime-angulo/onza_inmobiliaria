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

  constructor(private route: ActivatedRoute) {
    route.params.subscribe(params => {
      this.setInmueble(params.id);
    });
  }

  setInmueble(id: string) {
    this.d.id = id;;
    this.galeria = this.d.fotos.map(imagen => new Image(imagen));
  }
}
