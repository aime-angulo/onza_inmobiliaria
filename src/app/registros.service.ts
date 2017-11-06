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
  public servidorPrincipal = 'http://192.168.0.20/onza/';
  private paginasUrl = this.servidorPrincipal + 'paginas.html'; // URL del controlador de páginas en el servidor
  private registrosUrl = this.servidorPrincipal + 'registros.html'; // URL del controlador de claves de acceso en el servidor

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
    let r: Inmueble[] = [];

    // Filtrar palabras no numéricas, quitando artículos y otras palabras clave
    let palabras = this.simplificar(filtros.palabras);
    palabras.forEach((p: string, i: number) => {
      if (!isNaN(parseFloat(p))) { // Es un número. Ver qué palabra la precede
        let siguiente = palabras[i + 1];
        if (autoBanos && ['bano', 'baño', 'banos', 'baños'].includes(siguiente)) {
          filtros.banos.a = p;
          filtros.banos.de = p;
          palabras.splice(i + 1, 1);
          palabras.splice(i, 1);
        }
      }
    });

    palabras.forEach((p: string, i: number) => {
      if (!isNaN(parseFloat(p))) { // Es un número. Ver qué palabra la precede
        let siguiente = palabras[i + 1];
        if (autoHabitaciones && ['cuarto', 'cuartos', 'habitacion', 'habitaciones', 'recamara', 'recamaras'].includes(siguiente)) {
          filtros.habitaciones.a = p;
          filtros.habitaciones.de = p;
          palabras.splice(i + 1, 1);
          palabras.splice(i, 1);
        }
      }
    });

    // Filtrar
    r = this.registrosSolidos.filter(d => {
      let similarTipo = false;
      if (filtros.tipos.length > 0) {
        filtros.tipos.forEach(f => {
          if (!similarTipo) {
            similarTipo = f === d.tipo;
          }
        });
      }

      let similarServicio = false;
      if (similarTipo && filtros.servicios.length > 0) {
        filtros.servicios.forEach(f => {
          if (!similarServicio) {
            similarServicio = f === d.servicio;
          }
        });
      }

      let similarUbicacion = false;
      if (similarServicio && filtros.ubicacion.length > 0) {
        filtros.ubicacion.forEach(f => {
          if (!similarUbicacion) {
            similarUbicacion = f === d.ubicacion;
          }
        });
      }

      let similarBanosDe = false;
      if (similarUbicacion) {
        if (filtros.banos.de) {
          let param = parseInt(filtros.banos.de, 10);
          similarBanosDe = param > 0 && d.banos >= param;
        } else {
          similarBanosDe = true;
        }
      }

      let similarBanosA = false;
      if (similarBanosDe) {
        if (filtros.banos.a) {
          let param = parseInt(filtros.banos.a, 10);
          similarBanosA = param > 0 && d.banos <= param;
        } else {
          similarBanosA = true;
        }
      }

      let similarHabDe = false;
      if (similarBanosA) {
        if (filtros.habitaciones.de) {
          let param = parseInt(filtros.habitaciones.de, 10);
          similarHabDe = param > 0 && d.habitaciones >= param;
        } else {
          similarHabDe = true;
        }
      }

      let similarHabA = false;
      if (similarHabDe) {
        if (filtros.habitaciones.a) {
          let param = parseInt(filtros.habitaciones.a, 10);
          similarHabA = param > 0 && d.habitaciones <= param;
        } else {
          similarHabA = true;
        }
      }

      let similarPrecDe = false;
      if (similarHabDe) {
        if (filtros.precios.de) {
          let param = parseFloat(filtros.precios.de);
          similarPrecDe = param > 0 && d.precio >= param;
        } else {
          similarPrecDe = true;
        }
      }

      let similarPrecA = false;
      if (similarPrecDe) {
        if (filtros.precios.a) {
          let param = parseFloat(filtros.precios.a);
          similarPrecA = param > 0 && d.precio <= param;
        } else {
          similarPrecA = true;
        }
      }

      let similar = similarPrecA;
      let similarPalabras = false;
      if (similarPrecA) {
        if (filtros.palabras.trim().length > 0 && palabras.length > 0) {
          palabras.forEach(p => {
            if (!similarPalabras) {
              let info = '';
              ['encabezado', 'resumen', 'descripcion', 'direccion'].forEach(a => info += ' ' + d[a]);
              info = info.replace(/<(?:.|\n)*?>/gm, ' ');
              this.simplificar(info).forEach(op => {
                if (op === p) {
                  similarPalabras = true;
                }
              });
            }
          });
          similar = similarPalabras;
        } else {
          similar = true;
        }
      }

      return similar;
    });

    this.registros = _.cloneDeep(r);
    this.registros$.next(_.cloneDeep(r));

    console.log(r);
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
}
