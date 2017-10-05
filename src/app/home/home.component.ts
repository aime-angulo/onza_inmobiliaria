import { Component, OnInit } from '@angular/core';
import Inmueble from '../../modelos/inmueble';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  inmuebles: Inmueble[] = [];

  constructor() {
    for (let i = 0; i < 60; i++) {
      let fake = {
        id: i + 1,
        servicio: "Renta",
        precio: 1500,
        ubicación: "Norte",
        encabezado: "GRAN RESIDENCIA",
      };
      this.inmuebles.push(new Inmueble(fake));
    }
  }

}
