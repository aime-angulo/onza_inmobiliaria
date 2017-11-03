import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import Inmueble from '../../modelos/inmueble';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  inmuebles: Inmueble[] = [];

  constructor() {
    for (let i = 0; i < 60; i++) {
      this.inmuebles.push(new Inmueble());
    }
  }

}
