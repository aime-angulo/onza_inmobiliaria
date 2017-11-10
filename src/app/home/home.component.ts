// tslint:disable:forin
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { RegistrosService } from '../registros.service';
import Inmueble from '../../modelos/inmueble';
import * as _ from 'lodash';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {
  mensaje = 'Cargando registros...';
  inmuebles: Inmueble[];
  subscription;
  isAlive = true;

  constructor(private serv: RegistrosService) {
    this.inmuebles = serv.registros;
    this.subscription = serv.registros$.subscribe(r => {
      if (this.isAlive) {
        if (r.length > 0) {
          this.inmuebles = r;
        } else {
          this.inmuebles = [];
          this.mensaje = 'No se encontraron inmuebles con las características elegidas.';
        }
      }
    });
  }

  ngOnDestroy() {
    this.isAlive = false;
    this.mensaje = undefined;
    this.inmuebles = undefined;
    this.subscription.unsubscribe();
    this.subscription = undefined;
  }

  pageChange($event) {
    let target = $event.target;
    if (_.includes(target.classList, 'ui-paginator-page')
      || _.includes(target.classList, 'fa-forward')
      || _.includes(target.classList, 'fa-step-forward')
      || _.includes(target.classList, 'fa-backward')
      || _.includes(target.classList, 'fa-step-backward')) {
      let elePagina = document.getElementsByClassName('ui-paginator-page');
      if (elePagina.length > 0) {
        for (let i in elePagina) {
          if (_.includes(elePagina[i].classList, 'ui-state-active')) {
            let pagina = (<any>elePagina[i]).innerText;
            break;
          }
        }
      }
    }
  }
}
