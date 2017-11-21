import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filtro-opciones',
  template: `
    <div>
      <div class="btn-container">
        <div class="btn-group">
          <button class="btn btn-xs btn-default" title="Seleccionar todos"><i class="fa fa-fw fa-check-square-o"></i></button>
          <button class="btn btn-xs btn-default" title="Invertir selección"><i class="fa fa-fw fa-minus-square-o"></i></button>
        </div>
        <button class="btn btn-xs btn-primary pull-right"><i class="fa fa-fw fa-check"></i> Aplicar</button>
      </div>
      <div *ngFor="let op of opciones">
        <p-checkbox name="{{op}}" value="{{op}}" label="{{op}}" [(ngModel)]="selectedValues"></p-checkbox>
      </div>
    </div>
  `,
  styles: [`
    .btn-container {
      height: 26px;
    }

    .btn {
      margin-bottom: 10px;
    }
  `]
})
export class FiltroOpcionesComponent implements OnInit {
  @Input() opciones: string[];
  @Output() selecciones = new EventEmitter();

  selectedValues: string[] = [];

  constructor() { }

  ngOnInit() {

  }

}
