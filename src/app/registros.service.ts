/**
 * Este servicio provee métodos para obtener información de la base de datos.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import Inmueble from '../modelos/inmueble';
import { Filtros } from './filtros/filtros.component';
import * as _ from 'lodash';

@Injectable()
export class RegistrosService {
    // public servidorPrincipal = 'http://192.168.0.3/onza/';
    public servidorPrincipal = 'http://www.onzainmobiliaria.com/';
    private paginasUrl = this.servidorPrincipal + 'paginas.html'; // URL del controlador de páginas en el servidor
    private registrosUrl = this.servidorPrincipal + 'registros.html'; // URL del controlador de claves de acceso en el servidor
    private contactarUrl = this.servidorPrincipal + 'contactar.html'; // URL del controlador de claves de acceso en el servidor

    // Segunda parte: Gestionar los objetos para que puedan ser accedidos desde todo el portal
    public registrosSolidos: Inmueble[] = [];
    public registros: Inmueble[] = [];
    public paginas = {};

    public registros$: Subject<Inmueble[]> = new Subject();
    public paginas$: Subject<any> = new Subject();

    constructor(private http: HttpClient) {
        this.cargarRegistros();
        this.cargarPaginas();
    }

    /**
     * Esta función es un auxiliar que ejecuta los callbacks.
     * La puse aparte porque prácticamente todas las solicitudes al servidor son iguales...
     */
    httpRequest(subject: Observable<Object>, success: Function, error: Function, complete?: Function) {
        subject.subscribe(
            res => {
                success(res);
            },
            res => {
                if (typeof error === 'function') {
                    error(res);
                }
            },
            () => {
                if (typeof complete === 'function') {
                    complete();
                }
            });
    }

    /**
     * Traer información de la tabla "paginas"
     * Los parámetros son funciones a ejecutarse en cada caso (callbacks)
     */
    cargarPaginas() {
        const subject = this.http.get(this.paginasUrl);
        let success = (res) => {
            this.paginas = res[0];
            this.paginas$.next(this.paginas);
        };
        let error = () => alert('Ha ocurrido un error. Intente de nuevo más tarde');
        return this.httpRequest(subject, success, error);
    }

    /**
     * Trae información de todos los inmuebles
     * Los parámetros son funciones a ejecutarse en cada caso (callbacks)
     */
    cargarRegistros() {
        let subject = this.http.get(this.registrosUrl);
        let success = (res) => {
            this.registrosSolidos = res.map(r => new Inmueble(r));
            this.registros = _.cloneDeep(this.registrosSolidos);
            this.registros$.next(_.cloneDeep(this.registros));
        };
        let error = () => alert('Ha ocurrido un error. Intente de nuevo más tarde');
        return this.httpRequest(subject, success, error);
    }

    // Filtrar registros
    filtrar(filtros: Filtros, autoBanos: boolean, autoHabitaciones: boolean) {
        // Filtrar palabras no numéricas, quitando artículos y otras palabras clave
        let palabras = this.simplificar(filtros.palabras);
        palabras.forEach((p: string, i: number) => {
            if (!isNaN(parseFloat(p))) { // Es un número. Ver qué palabra la precede
                let siguiente = palabras[i + 1];
                if (autoBanos && ['bano', 'baño', 'banos', 'baños'].includes(siguiente)) {
                    filtros.banos = p;
                    palabras.splice(i + 1, 1);
                    palabras.splice(i, 1);
                }
            }
        });

        palabras.forEach((p: string, i: number) => {
            if (!isNaN(parseFloat(p))) { // Es un número. Ver qué palabra la precede
                let siguiente = palabras[i + 1];
                if (autoHabitaciones && ['cuarto', 'cuartos', 'habitacion', 'habitaciones', 'recamara', 'recamaras'].includes(siguiente)) {
                    filtros.habitaciones = p;
                    palabras.splice(i + 1, 1);
                    palabras.splice(i, 1);
                }
            }
        });

        let r = this.registrosSolidos
            .filter(d => {
                if (filtros.tipos.length > 0) {
                    let similar = false;
                    filtros.tipos.forEach(f => {
                        if (!similar) {
                            similar = f === d.tipo;
                        }
                    });
                    return similar;
                } else {
                    return true;
                }
            })
            .filter(d => {
                if (filtros.servicios.length > 0) {
                    let similar = false;
                    filtros.servicios.forEach(f => {
                        if (!similar) {
                            similar = f === d.servicio;
                        }
                    });
                    return similar;
                } else {
                    return true;
                }
            })
            .filter(d => {
                if (filtros.ubicacion.length > 0) {
                    let similar = false;
                    filtros.ubicacion.forEach(f => {
                        if (!similar) {
                            similar = f === d.ubicacion;
                        }
                    });
                    return similar;
                } else {
                    return true;
                }
            })
            .filter(d => {
                switch (filtros.banos) {
                    case '0': // Todos
                        return true;
                    case '1': // 1 - 2
                        return d.banos > 0 && d.banos < 2;
                    case '2': // 3 o más
                        return d.banos >= 3;
                }
            })
            .filter(d => {
                switch (filtros.habitaciones) {
                    case '0': // Todos
                        return true;
                    case '1': // 1 - 2
                        return d.habitaciones > 0 && d.habitaciones < 2;
                    case '2': // 3 o más
                        return d.habitaciones >= 3;
                }
            })
            .filter(d => filtros.precios.de ? d.precio >= filtros.precios.de : true)
            .filter(d => filtros.precios.a ? d.precio <= filtros.precios.a : true)
            .filter(d => {
                if (filtros.palabras.trim().length > 0 && palabras.length > 0) {
                    let similar = false;
                    palabras.forEach(p => {
                        if (!similar) {
                            let info = '';
                            ['encabezado', 'resumen', 'descripcion', 'direccion'].forEach(a => info += ' ' + d[a]);
                            info = info.replace(/<(?:.|\n)*?>/gm, ' ');
                            this.simplificar(info).forEach(op => {
                                if (op === p) {
                                    similar = true;
                                }
                            });
                        }
                    });
                    return similar;
                } else {
                    return true;
                }
            });

        this.registros = _.cloneDeep(r);
        this.registros$.next(_.cloneDeep(r));

        // console.log(r);
    }

    simplificar(palabras: string): string[] {
        let p = [];
        if (_.isEmpty(palabras)) { return p; }
        palabras = this.quitaacentos(palabras);
        palabras = palabras.replace(/\./g, '').replace(/,/g, '').replace(/;/g, '');
        let extras = ['a', 'ante', 'bajo', 'con', 'contra', 'del', 'de', 'desde', 'durante', 'en', 'entre',
            'hacia', 'hasta', 'mediante', 'para', 'por', 'pro', 'segun', 'y',
            'sin', 'sobre', 'tras', 'via', 'los', 'la', 'las', 'una', 'unos', 'unas', 'este', 'estos', 'ese',
            'esos', 'aquel', 'aquellos', 'esta', 'estas', 'esa', 'esas',
            'aquella', 'aquellas', 'usted', 'nosotros', 'vosotros',
            'ustedes', 'nos', 'les', 'nuestro', 'nuestra', 'vuestro',
            'vuestra', 'mis', 'tus', 'sus', 'nuestros', 'nuestras',
            'vuestros', 'vuestras', 'esto', 'que',
            'casa', 'condominio', 'bodega', 'departamento', 'terreno', 'penthouse', 'local', 'oficina', 'villa', 'edificio',
            'renta', 'venta',
            'centro', 'norte', 'sur', 'este', 'oeste'
        ];
        extras.forEach(e => palabras = palabras.replace(' ' + e + ' ', ' ').replace('\n', ' '));
        p = palabras.split(' ').map(s => s.trim()).filter(s => s.length > 0 && !extras.includes(s));
        return p;
    }

    quitaacentos(s) {
        let r = s.toLowerCase();
        r = r.replace(new RegExp(/[àáâãäå]/g), 'a');
        r = r.replace(new RegExp(/[èéêë]/g), 'e');
        r = r.replace(new RegExp(/[ìíîï]/g), 'i');
        r = r.replace(new RegExp(/ñ/g), 'n');
        r = r.replace(new RegExp(/[òóôõö]/g), 'o');
        r = r.replace(new RegExp(/[ùúûü]/g), 'u');
        r = r.replace(new RegExp(/ñ/g), 'n');
        r = r.replace(new RegExp(/ñ/g), 'n');

        return r;
    }

    enviarContacto(data: any, callback: Function, error: Function) {
        let subject = this.http.post(this.contactarUrl, data);
        return this.httpRequest(subject, callback, error);
    }
}
