import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { RegistrosService } from '../registros.service';
import Inmueble from '../../modelos/inmueble';

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
          this.mensaje = 'No hay registros disponibles';
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
}
