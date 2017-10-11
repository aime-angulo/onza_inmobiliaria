import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataGridModule, SliderModule, ChipsModule, CheckboxModule } from 'primeng/primeng';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { NguiMapModule } from '@ngui/map';
import { ModalGalleryModule } from 'angular-modal-gallery';
import 'hammerjs';
import 'mousetrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MosaicoComponent } from './mosaico/mosaico.component';
import { FiltrosComponent } from './filtros/filtros.component';
import { DetalleComponent } from './detalle/detalle.component';
import { RouterModule } from '@angular/router';
import { AcercadeComponent } from './acercade/acercade.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MosaicoComponent,
    FiltrosComponent,
    DetalleComponent,
    AcercadeComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    DataGridModule,
    SliderModule,
    ChipsModule,
    CheckboxModule,
    AngularMultiSelectModule,
    NguiMapModule.forRoot({ apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyCCcXBgyPeI99tNPVu2ZP-QS7dLNV1Httg' }),
    ModalGalleryModule.forRoot(),

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
        path: 'acercade',
        component: AcercadeComponent,
      },
      {
        path: '',
        redirectTo: 'inmuebles',
        pathMatch: 'full'
      }
      ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
