import { Component, OnInit, Input } from '@angular/core';
import Inmueble from '../../modelos/inmueble';

@Component({
  selector: 'app-mosaico',
  templateUrl: './mosaico.component.html',
  styleUrls: ['./mosaico.component.css']
})
export class MosaicoComponent {
  @Input() inmueble: Inmueble;

  constructor() { }

  mostrarInfo() {
    alert("Mostrar más info del inmueble: " + this.inmueble.id);
    // Ir a la página de este inmueble y mostrar su información!! :)
  }

}
