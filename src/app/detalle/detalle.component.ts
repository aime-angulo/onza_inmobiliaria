import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent {
  id: number;

  constructor(private route: ActivatedRoute) {
    route.params.subscribe(params => {
      this.id = params.id;
    });

  }
}
