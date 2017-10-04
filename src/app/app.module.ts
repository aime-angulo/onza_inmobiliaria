import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataGridModule } from 'primeng/primeng';
import { MultiSelectModule } from 'primeng/primeng';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MosaicosComponent } from './mosaicos/mosaicos.component';
import { FiltrosComponent } from './filtros/filtros.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MosaicosComponent,
    FiltrosComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    MultiSelectModule,
    DataGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
