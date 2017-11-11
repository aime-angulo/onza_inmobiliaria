import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import Inmueble from '../../modelos/inmueble';
import { Image } from 'angular-modal-gallery';
import { RegistrosService } from '../registros.service';

declare var google: any;

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent {
  d: Inmueble;
  galeria: Array<Image> = [];
  error = false;

  map = {
    center: '20.9978737,-89.6516842',
    marker: { lat: 20.9978737, lng: -89.6516842 }
  };

  constructor(private route: ActivatedRoute, private serv: RegistrosService) {
    route.params.subscribe(params => {
      this.initInmueble(params.id);
    });
  }

  initInmueble(id: string) {
    this.serv.registros$.subscribe(r => {
      this.setInmueble(id);
    });

    if (this.serv.registros.length > 0) {
      this.setInmueble(id);
    }
  }

  setInmueble(id: string) {
    if (this.serv.registros.length > 0) {
      let inmueble = this.serv.registros.filter(i => i.id === id);
      if (inmueble.length > 0) {
        this.d = inmueble[0];
        this.galeria = this.d.fotos.map((imagen, index) => {
          let url = this.serv.servidorPrincipal + 'fotos/' + id + '/';
          let img = url + imagen;
          let min = url + this.d.miniaturas[index];
          return new Image(img, min);
        });

        // Opciones de GMAP
        if (this.d.coordenadas && this.d.coordenadas !== '') {
          let coordenadas = this.d.coordenadas.split(',');
          this.map.center = this.d.coordenadas;
          this.map.marker.lat = parseFloat(coordenadas[0]);
          this.map.marker.lng = parseFloat(coordenadas[1]);
        }
        setTimeout(() => {
          try {
            this.scrollIntoViewIfOutOfView();
          } catch (e) { }
        });
      } else {
        this.error = true;
      }
    } else {
      this.error = true;
    }
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

  pdf() {

  }
}
