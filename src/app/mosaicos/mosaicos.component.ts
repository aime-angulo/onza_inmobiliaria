import { Component, OnInit, Input } from '@angular/core';
import Inmueble from '../../modelos/inmueble';

@Component({
  selector: 'app-mosaicos',
  templateUrl: './mosaicos.component.html',
  styleUrls: ['./mosaicos.component.css']
})
export class MosaicosComponent {
  @Input() inmueble: Inmueble;

  constructor() { }

  mostrarInfo() {
    alert("Mostrar más info del inmueble: " + this.inmueble.id);
    // Ir a la página de este inmueble y mostrar su información!! :)
  }

}
