import { Component, ViewEncapsulation } from '@angular/core';
import { SelectItem, GMap } from 'primeng/primeng';

declare var google: any;

const MAP_LAT = 20.98558;
const MAP_LNG = -89.58477;

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: [
    './filtros.component.css',
    './filtros.objetos.css'
  ]
})
export class FiltrosComponent {
  display;

  mapOptions = {
    center: { lat: MAP_LAT, lng: MAP_LNG },
    zoom: 15
  };

  mapMarcador = [];

  menuDisplay = {
    showing: false,
    opcionesShowing: null
  };

  dropdownSettings = {
    singleSelection: false,
    text: 'Seleccione alguna opción',
    selectAllText: 'Seleccione alguna opción',
    unSelectAllText: 'Remover seleccion',
    enableSearchFilter: true,
    classes: 'selector',
    badgeShowLimit: 2
  };

  servicios = [
    { label: 'Renta', value: 'Renta' },
    { label: 'Venta', value: 'Venta' }
  ];
  selectedServicios: string[];

  tipos = [
    'Casa',
    'Condominio',
    'Bodega',
    'Departamento',
    'Terreno',
    'Penthouse',
    'Local',
    'Oficina',
    'Villa',
    'Edificio'
  ];
  selectedTipos = [];

  ubicacion = [
    'Norte',
    'Sur',
    'Este',
    'Oeste',
  ];
  selectedUbicacion = [];

  precios: number[];

  rangoPrecios: number[] = [500, 1000];

  numeroBanos: number[] = [1, 2];

  numeroHabitaciones: number[] = [1, 4];

  palabras: string[];

  constructor() {
    this.resetDialogs();
  }

  rangoSeleccionado($event) {
    console.log($event);
    $event.values[0] = '';
  }

  banoSeleccionado($event) {
    console.log($event);
    $event.values[0] = '';
  }

  cuartoSeleccionado($event) {
    console.log($event);
    $event.values[0] = '';
  }

  mostrarOpciones(opciones: string) {
    this.menuDisplay.opcionesShowing = opciones;
    this.toggleOverlay();
  }

  mostrarMenu() {
    this.menuDisplay.showing = !this.menuDisplay.showing;
    this.toggleOverlay();
  }

  toggleOverlay() {
    const overlay = document.getElementById('overlay');
    const body = document.getElementsByTagName('body')[0];

    if (this.menuDisplay.showing || this.menuDisplay.opcionesShowing !== null) {
      overlay.classList.add('filter-active');
      body.classList.add('filter-active');
    } else {
      overlay.classList.remove('filter-active');
      body.classList.remove('filter-active');
    }
  }

  showDialog(dialogo) {
    console.log(dialogo);
    this.resetDialogs();
    this.display[dialogo] = true;
    this.establecerMarcador();
  }

  resetDialogs() {
    this.display = {
      mision: false,
      vision: false,
      contacto: false
    };

  }

  establecerMarcador() {
    this.mapMarcador = [new google.maps.Marker({ position: { lat: MAP_LAT, lng: MAP_LNG }, title: '' })];
  }
}
