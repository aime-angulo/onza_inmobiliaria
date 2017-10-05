import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataGridModule, MultiSelectModule, SliderModule, ChipsModule, CheckboxModule } from 'primeng/primeng';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MosaicoComponent } from './mosaico/mosaico.component';
import { FiltrosComponent } from './filtros/filtros.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MosaicoComponent,
    FiltrosComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    MultiSelectModule,
    DataGridModule,
    SliderModule,
    ChipsModule,
    CheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
