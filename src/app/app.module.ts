import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataGridModule, SliderModule, ChipsModule, CheckboxModule } from 'primeng/primeng';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MosaicoComponent } from './mosaico/mosaico.component';
import { FiltrosComponent } from './filtros/filtros.component';
import { DetalleComponent } from './detalle/detalle.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MosaicoComponent,
    FiltrosComponent,
    DetalleComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    DataGridModule,
    SliderModule,
    ChipsModule,
    CheckboxModule,
    AngularMultiSelectModule,

    RouterModule.forRoot(
      [{
        path: 'inmuebles',
        component: HomeComponent
      },
      {
        path: 'inmueble/:id',
        component: DetalleComponent
      },
      {
        path: '',
        redirectTo: 'inmuebles',
        pathMatch: 'full'
      },
        // { path: '**', component: NotFoundComponent }
      ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
