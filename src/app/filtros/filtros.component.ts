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
    banos: string;
    habitaciones: string;
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

    tipos = ['Casa', 'Condominio', 'Bodega', 'Departamento', 'Terreno', 'Penthouse', 'Local', 'Oficina', 'Villa', 'Edificio', 'Townhouse'];
    selectedTipos = [];

    servicios = ['Renta', 'Venta', 'Traspaso'];
    selectedServicios = [];

    ubicacion = ['Centro', 'Norte', 'Sur', 'Este', 'Oeste'];
    selectedUbicacion = [];

    selectedBanos = '0';

    selectedHabitaciones = '0';

    selectedPrecios = {
        de: undefined,
        a: undefined
    };

    constructor(private serv: RegistrosService, private router: Router) {
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

        // Ajuste para realizar búsquedas con filtros vacíos
        let selectedTipos = _.cloneDeep(this.selectedTipos);
        let selectedServicios = _.cloneDeep(this.selectedServicios);
        let selectedUbicacion = _.cloneDeep(this.selectedUbicacion);

        if (selectedTipos.length === 0) {
            selectedTipos = _.cloneDeep(this.tipos);
        }
        if (selectedServicios.length === 0) {
            selectedServicios = _.cloneDeep(this.servicios);
        }
        if (this.selectedUbicacion.length === 0) {
            selectedUbicacion = _.cloneDeep(this.ubicacion);
        }

        let filtros: Filtros = {
            palabras: this.palabras,
            tipos: selectedTipos,
            servicios: selectedServicios,
            ubicacion: selectedUbicacion,
            banos: this.selectedBanos,
            habitaciones: this.selectedHabitaciones,
            precios: this.selectedPrecios
        };

        filtros = _.cloneDeep(filtros);

        let autoBanos = false;
        if (_.isUndefined(filtros.banos) || filtros.banos === 'No definido') {
            filtros.banos = '0';
            autoBanos = true;
        }

        let autoHabitaciones = false;
        if (_.isUndefined(filtros.habitaciones) || filtros.banos === 'No definido') {
            filtros.habitaciones = '0';
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

