export default class Inmueble {
    id: string;
    servicio: string;
    tipo: string;
    ubicacion: string;
    direccion: string;
    precio: number;
    descripcion: string;
    encabezado: string;
    foto_principal: string;
    fecha_registro: Date;
    fecha_update: Date;

    constructor(o: any) {
        this.id = o.id || this.id;
        this.servicio = o.servicio || this.servicio;
        this.tipo = o.tipo || this.tipo;
        this.ubicacion = o.ubicacion || this.ubicacion;
        this.direccion = o.direccion || this.direccion;
        this.precio = o.precio || this.precio;
        this.descripcion = o.descripcion || this.descripcion;
        this.encabezado = o.encabezado || this.encabezado;
        this.foto_principal = o.foto_principal || this.foto_principal;
        this.fecha_registro = o.fecha_registro || this.fecha_registro;
        this.fecha_update = o.fecha_update || this.fecha_update;
    }
}