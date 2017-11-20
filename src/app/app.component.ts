import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { SelectItem, GMap } from 'primeng/primeng';
import { RegistrosService } from './registros.service';

declare var google: any;

const MAP_LAT = 20.98558;
const MAP_LNG = -89.58477;

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    conocenos = '';
    servicios = '';
    preguntas = '';
    contacto = '';
    display;

    mapOptions = {
        center: { lat: MAP_LAT, lng: MAP_LNG },
        zoom: 15
    };

    mapMarcador = [];

    form: FormGroup;
    formData: any = {};
    enviandoContacto: boolean;
    enviado: boolean;

    constructor( @Inject(FormBuilder) private fb: FormBuilder, private serv: RegistrosService) {
        serv.paginas$.subscribe(r => {
            this.conocenos = r.conocenos;
            this.servicios = r.servicios;
            this.preguntas = r.preguntas;
            this.contacto = r.contacto;
        });

        this.form = this.fb.group({
            informacion: this.fb.group({
                nombre: [this.formData.nombre, [Validators.required, Validators.minLength(4)]],
                email: [this.formData.email, [Validators.required]],
                telefono: [this.formData.telefono, [Validators.required]],
                mensaje: [this.formData.mensaje, [Validators.required]]
            })
        });

        this.resetDialogs();
    }

    showDialog(dialogo) {
        this.resetDialogs();
        this.display[dialogo] = true;
        this.establecerMarcador();
    }

    resetDialogs() {
        this.display = {
            conocenos: false,
            servicios: false,
            preguntas: false,
            contacto: false
        };

        this.formData = {
            nombre: '',
            email: '',
            telefono: '',
            mensaje: ''
        };
        this.enviandoContacto = false;
        this.enviado = false;
        this.form.enable();
    }

    establecerMarcador() {
        this.mapMarcador = [new google.maps.Marker({ position: { lat: MAP_LAT, lng: MAP_LNG }, title: '' })];
    }

    enviarContacto($event) {
        $event.stopPropagation();
        if (this.form.valid) {
            this.form.disable();
            this.enviandoContacto = true;
            this.serv.enviarContacto(this.formData,
                () => {
                    this.enviado = true;
                },
                () => {
                    alert('Ha ocurrido un error. Intente de nuevo más tarde');
                    this.form.enable();
                });
        } else {
            alert('Todos los campos son obligatorios. Por favor, verifica la información.');
        }
    }
}
