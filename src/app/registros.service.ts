/**
 * Este servicio provee métodos para obtener información de la base de datos.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import Inmueble from '../modelos/inmueble';

@Injectable()
export class RegistrosService {
  public servidorPrincipal = 'http://192.168.0.20/onza/';
  private paginasUrl = this.servidorPrincipal + 'paginas.html'; // URL del controlador de páginas en el servidor
  private registrosUrl = this.servidorPrincipal + 'registros.html'; // URL del controlador de claves de acceso en el servidor

  // Segunda parte: Gestionar los objetos para que puedan ser accedidos desde todo el portal
  public registros: Inmueble[] = [];
  public paginas = {};

  public registros$: Subject<Inmueble[]> = new Subject();
  public paginas$: Subject<any> = new Subject();

  constructor(private http: HttpClient) {
    console.log('Servicio de registros inicializado!!');
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
      this.registros = res.map(r => new Inmueble(r));
      this.registros$.next(this.registros);
    };
    let error = () => alert('Ha ocurrido un error. Intente de nuevo más tarde');
    return this.httpRequest(subject, success, error);
  }
}
