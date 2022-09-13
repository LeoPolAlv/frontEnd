import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionOficinasComponent } from './gestion-oficinas/gestion-oficinas.component';

const routes: Routes = [
  { path: 'oficinas', component: GestionOficinasComponent },
  { path: '', component: GestionOficinasComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
