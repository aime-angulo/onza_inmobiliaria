import { Component, ViewEncapsulation, OnInit } from '@angular/core';
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
export class DetalleComponent implements OnInit {
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

  ngOnInit() {
    this.scrollIntoViewIfOutOfView();
  }

  setInmueble(id: string) {
    this.d.id = id;
    this.galeria = this.d.fotos.map(imagen => new Image(imagen));
  }

  scrollIntoViewIfOutOfView() {
    const el = <any>document.getElementById('detalleEncabezado');
    const topOfPage = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    const heightOfPage = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    let elY = 0;
    let elH = 0;
    for (let p = el; p && p.tagName !== 'BODY'; p = p.offsetParent) {
      elY += p.offsetTop;
    }
    elH = el.offsetHeight;
    if ((topOfPage + heightOfPage) < (elY + elH)) {
      el.scrollIntoView(false);
    } else if (elY < topOfPage) {
      el.scrollIntoView(true);
    }
  }
}
