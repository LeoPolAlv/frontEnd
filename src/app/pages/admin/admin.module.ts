import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { GestionOficinasComponent } from './gestion-oficinas/gestion-oficinas.component';
import { NoAutorizadoComponent } from '../../no-autorizado/no-autorizado.component';


@NgModule({
  declarations: [
    GestionOficinasComponent,
    NoAutorizadoComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
