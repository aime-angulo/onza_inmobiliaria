import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SelectItem } from 'primeng/primeng';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css']
})
export class FiltrosComponent implements OnInit {
  dropdownSettings = {
    singleSelection: false,
    text: "Seleccione alguna opción",
    selectAllText: 'Seleccione alguna opción',
    unSelectAllText: 'Remover seleccion',
    enableSearchFilter: true,
    classes: "selector",
    badgeShowLimit: 2
  };

  servicios = [
    { label: 'Renta', value: 'Renta' },
    { label: 'Venta', value: 'Venta' }
  ];
  selectedServicios: string[];

  tipos = [
    { id: 'Casa', itemName: 'Casa' },
    { id: 'Condominio', itemName: 'Condominio' },
    { id: 'Bodega', itemName: 'Bodega' },
    { id: 'Departamento', itemName: 'Departamento' },
    { id: 'Terreno', itemName: 'Terreno' },
    { id: 'Penthouse', itemName: 'Penthouse' },
    { id: 'Local', itemName: 'Local' },
    { id: 'Oficina', itemName: 'Oficina' },
    { id: 'Villa', itemName: 'Villa' },
    { id: 'Edificio', itemName: 'Edificio' }
  ];
  selectedTipos = [];

  ubicacion = [
    { id: 'Norte', itemName: 'Norte' },
    { id: 'Sur', itemName: 'Sur' },
    { id: 'Este', itemName: 'Este' },
    { id: 'Oeste', itemName: 'Oeste' },
  ];
  selectedUbicacion = [];

  rangoPrecios: number[] = [500, 1000];


  palabras: string[];
  constructor() {
  }

  ngOnInit() {
  }

}
