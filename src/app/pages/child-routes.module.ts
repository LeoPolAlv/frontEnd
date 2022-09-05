import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { HomeComponent } from './home/home.component';
import { MisReservasComponent } from './mis-reservas/mis-reservas.component';
//import { NewReservaInitComponent } from './new-reserva-init/new-reserva-init.component';
import { NewReservaComponent } from './new-reserva/new-reserva.component';

const childRoutes: Routes = [
  //{ path: '', component: HomeComponent },
  { path: 'new', component: NewReservaComponent, data: { usuario: new UsuarioService().getusuario() } },
  { path: 'newreserva', component: HomeComponent, data: { usuario: new UsuarioService().getusuario() } },
  { path: 'reservas', component: MisReservasComponent },
  { path: '', component: MisReservasComponent, data:{usuario: new UsuarioService().getusuario() } },
  { path: '**', redirectTo: "reservas"},
]


@NgModule({
  imports: [
    RouterModule.forChild(childRoutes),
  ],
  exports: [
    RouterModule,
  ]
})
export class ChildRoutesModule {}
