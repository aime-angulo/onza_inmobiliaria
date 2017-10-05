import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css']
})
export class FiltrosComponent implements OnInit {

  servicios = [
    { label: 'Renta', value: 'Renta' },
    { label: 'Venta', value: 'Venta' }
  ];
  selectedServicios: string[];

  tipos = [
    { label: 'Casa', value: 'Casa' },
    { label: 'Condominio', value: 'Condominio' },
    { label: 'Bodega', value: 'Bodega' },
    { label: 'Departamento', value: 'Departamento' },
    { label: 'Terreno', value: 'Terreno' },
    { label: 'Penthouse', value: 'Penthouse' },
    { label: 'Local', value: 'Local' },
    { label: 'Oficina', value: 'Oficina' },
    { label: 'Villa', value: 'Villa' },
    { label: 'Edificio', value: 'Edificio' },
  ];
  selectedTipos: string[];

  ubicacion = [
    { label: 'Norte', value: 'Norte' },
    { label: 'Sur', value: 'Sur' },
    { label: 'Este', value: 'Este' },
    { label: 'Oeste', value: 'Oeste' },
  ];
  selectedUbicacion: string[];

  rangoPrecios: number[] = [500, 1000];


  palabras: string[];
  constructor() {

  }

  ngOnInit() {
  }

}
