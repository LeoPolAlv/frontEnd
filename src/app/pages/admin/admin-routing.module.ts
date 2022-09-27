import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionOficinasComponent } from './gestion-oficinas/gestion-oficinas.component';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { MisReservasComponent } from '../user/mis-reservas/mis-reservas.component';

const routes: Routes = [
  { path: 'oficinas', component: GestionOficinasComponent },
  { path: 'misreservas', component: MisReservasComponent },
  { path: '', component: AdminDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
