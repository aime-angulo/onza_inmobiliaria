import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataGridModule, SliderModule, ChipsModule, CheckboxModule, DialogModule, GMapModule } from 'primeng/primeng';
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
import { FiltroOpcionesComponent } from './filtro-opciones/filtro-opciones.component';
import { RegistrosService } from './registros.service';
import { SafeHtmlPipe } from './safeHtml.pipe';
import { FbSharerComponent } from './fb-sharer/fb-sharer.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        MosaicoComponent,
        FiltrosComponent,
        DetalleComponent,
        FiltroOpcionesComponent,
        SafeHtmlPipe,
        FbSharerComponent
    ],
    imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        DataGridModule,
        SliderModule,
        ChipsModule,
        CheckboxModule,
        DialogModule,
        BrowserAnimationsModule,
        AngularMultiSelectModule,
        GMapModule,
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
                path: '',
                redirectTo: 'inmuebles',
                pathMatch: 'full'
            }
            ])
    ],
    providers: [RegistrosService],
    bootstrap: [AppComponent]
})
export class AppModule { }
