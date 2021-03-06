import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NewReservaComponent } from './new-reserva/new-reserva.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [
    HomeComponent,
    PagesComponent,
    NewReservaComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
  exports: [
    HomeComponent,
    PagesComponent,
  ]
})
export class PagesModule { }
