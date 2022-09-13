import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './user/home/home.component';
import { PagesComponent } from './pages.component';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NewReservaComponent } from './user/new-reserva/new-reserva.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { MisReservasComponent } from './user/mis-reservas/mis-reservas.component';
import { AdminModule } from './admin/admin.module';



@NgModule({
  declarations: [
    HomeComponent,
    PagesComponent,
    NewReservaComponent,
    MisReservasComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    ComponentsModule,
    AdminModule
  ],
  exports: [
    HomeComponent,
    PagesComponent,
  ]
})
export class PagesModule { }
