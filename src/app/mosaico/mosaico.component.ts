import { Component, OnInit, Input } from '@angular/core';
import Inmueble from '../../modelos/inmueble';
import { RegistrosService } from '../registros.service';

@Component({
  selector: 'app-mosaico',
  templateUrl: './mosaico.component.html',
  styleUrls: ['./mosaico.component.css']
})
export class MosaicoComponent implements OnInit {
  @Input() inmueble: Inmueble;
  fotoPrincipal = '';

  constructor(private serv: RegistrosService) { }

  ngOnInit() {
    this.fotoPrincipal = this.serv.servidorPrincipal + 'fotos/';
    if (this.inmueble.miniaturas.length > 0) {
      this.fotoPrincipal += this.inmueble.id + '/' + this.inmueble.miniaturas[0];
    } else {
      this.fotoPrincipal += 'imagen_muestra.jpg';
    }
  }
}
