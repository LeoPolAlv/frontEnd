import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './user/home/home.component';
import { PagesComponent } from './pages.component';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NewReservaComponent } from './user/new-reserva/new-reserva.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { MisReservasComponent } from './user/mis-reservas/mis-reservas.component';
import { AdminModule } from './admin/admin.module';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { GMapModule } from 'primeng/gmap';




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
    AdminModule,
    ToastModule,
    ButtonModule,
    DialogModule,
    GMapModule,
    FormsModule,
  ],
  exports: [
    HomeComponent,
    PagesComponent,
  ]
})
export class PagesModule { }
