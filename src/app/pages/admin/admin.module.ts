import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { GestionOficinasComponent } from './gestion-oficinas/gestion-oficinas.component';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    GestionOficinasComponent,
    AdminDashboardComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatNativeDateModule,
    MaterialModule,
  ]
})
export class AdminModule { }
