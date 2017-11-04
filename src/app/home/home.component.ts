import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RegistrosService } from '../registros.service';
import Inmueble from '../../modelos/inmueble';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  mensaje = 'Cargando registros...';
  inmuebles: Inmueble[] = [];

  constructor(private serv: RegistrosService) {
    serv.registros$.subscribe(r => {
      if (r.length > 0) {
        this.inmuebles = r;
      } else {
        this.mensaje = 'No hay registros disponibles';
      }
    });
  }
}
