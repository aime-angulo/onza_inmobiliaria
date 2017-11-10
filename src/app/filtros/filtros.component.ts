import { Component, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrosService } from '../registros.service';
import Inmueble from '../../modelos/inmueble';
import * as _ from 'lodash';

export interface FiltrosOpciones {
  de: any;
  a: any;
}

export interface Filtros {
  palabras: string;
  tipos: string[];
  servicios: string[];
  ubicacion: string[];
  banos: FiltrosOpciones;
  habitaciones: FiltrosOpciones;
  precios: FiltrosOpciones;
}

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
  @Output() dialogSeleccionado = new EventEmitter();

  menuDisplay = {
    showing: false,
    opcionesShowing: null
  };

  palabras = '';

  tipos = ['Casa', 'Condominio', 'Bodega', 'Departamento', 'Terreno', 'Penthouse', 'Local', 'Oficina', 'Villa', 'Edificio'];
  selectedTipos = _.cloneDeep(this.tipos);

  servicios = ['Renta', 'Venta', 'Traspaso'];
  selectedServicios = _.cloneDeep(this.servicios);

  ubicacion = ['Centro', 'Norte', 'Sur', 'Este', 'Oeste'];
  selectedUbicacion = _.cloneDeep(this.ubicacion);

  opcionesBanos = [];
  selectedBanos = {
    de: undefined,
    a: undefined
  };

  opcionesHabitaciones = [];
  selecteHabitaciones = {
    de: undefined,
    a: undefined
  };

  selectedPrecios = {
    de: undefined,
    a: undefined
  };


  constructor(private serv: RegistrosService, private router: Router) {
    serv.registros$.subscribe(r => {
      if (serv.registrosSolidos.length > 0) {
        this.calcularMax(serv.registrosSolidos);
      }
    });
  }

  calcularMax(r: Inmueble[]) {
    let maxBanos = 0;
    let maxHabitaciones = 0;
    r.forEach(i => {
      if (i.banos > maxBanos) {
        maxBanos = i.banos;
      }
      if (i.habitaciones > maxHabitaciones) {
        maxHabitaciones = i.habitaciones;
      }
    });

    this.opcionesBanos = [];
    for (let i = 1; i <= maxBanos; i++) {
      this.opcionesBanos.push(i);
    }

    this.opcionesHabitaciones = [];
    for (let i = 1; i <= maxHabitaciones; i++) {
      this.opcionesHabitaciones.push(i);
    }
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
    this.dialogSeleccionado.emit(dialogo);
  }

  buscar($event?: any) {
    if ($event) {
      $event.preventDefault();
    }

    if (this.selectedTipos.length === 0) {
      this.selectedTipos = _.cloneDeep(this.tipos);
    }
    if (this.selectedServicios.length === 0) {
      this.selectedServicios = _.cloneDeep(this.servicios);
    }
    if (this.selectedUbicacion.length === 0) {
      this.selectedUbicacion = _.cloneDeep(this.ubicacion);
    }

    let filtros: Filtros = {
      palabras: this.palabras,
      tipos: this.selectedTipos,
      servicios: this.selectedServicios,
      ubicacion: this.selectedUbicacion,
      banos: this.selectedBanos,
      habitaciones: this.selecteHabitaciones,
      precios: this.selectedPrecios
    };

    filtros = _.cloneDeep(filtros);


    let autoBanos = false;
    if (_.isUndefined(filtros.banos.de) || filtros.banos.de === 'No definido') {
      filtros.banos.de = 0;
      autoBanos = true;
    }

    if (_.isUndefined(filtros.banos.a) || filtros.banos.a === 'No definido') {
      filtros.banos.a = _.last(this.opcionesBanos);
      autoBanos = true;
    }

    let autoHabitaciones = false;
    if (_.isUndefined(filtros.habitaciones.de) || filtros.banos.de === 'No definido') {
      filtros.habitaciones.de = 0;
      autoHabitaciones = true;
    }

    if (_.isUndefined(filtros.habitaciones.a) || filtros.habitaciones.a === 'No definido') {
      filtros.habitaciones.a = _.last(this.opcionesHabitaciones);
      autoHabitaciones = true;
    }

    if (_.isUndefined(filtros.precios.de)) {
      filtros.precios.de = 0;
    }

    if (_.isUndefined(filtros.precios.a)) {
      filtros.precios.a = 9999999999;
    }

    this.serv.filtrar(filtros, autoBanos, autoHabitaciones);
    this.menuDisplay.showing = false;

    const overlay = document.getElementById('overlay');
    const body = document.getElementsByTagName('body')[0];
    overlay.classList.remove('filter-active');
    body.classList.remove('filter-active');
    this.router.navigateByUrl('/inmuebles');
  }

  seleccionarTodo(campo, $event: any) {
    let status = $event.target.checked;
    switch (campo) {
      case 'tipos':
        if (status) {
          this.selectedTipos = _.cloneDeep(this.tipos);
        } else {
          this.selectedTipos = [];
        }
        break;

      case 'servicios':
        if (status) {
          this.selectedServicios = _.cloneDeep(this.servicios);
        } else {
          this.selectedServicios = [];
        }
        break;

      case 'ubicacion':
        if (status) {
          this.selectedUbicacion = _.cloneDeep(this.ubicacion);
        } else {
          this.selectedUbicacion = [];
        }
        break;
    }
  }
}

