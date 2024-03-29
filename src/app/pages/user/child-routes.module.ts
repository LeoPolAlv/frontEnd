import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { HomeComponent } from './home/home.component';
import { MisReservasComponent } from './mis-reservas/mis-reservas.component';
import { NewReservaComponent } from './new-reserva/new-reserva.component';

const childRoutes: Routes = [
  //{ path: '', component: HomeComponent },
  //{ path: '', component: MisReservasComponent, data:{usuario: new UsuarioService().getusuario() } },
  { path: '', component: MisReservasComponent },
  { path: 'reservas', component: MisReservasComponent },
  { path: 'newreserva', component: HomeComponent, data: { usuario: new UsuarioService().getusuario() } },
  { path: 'new', component: NewReservaComponent, data: { usuario: new UsuarioService().getusuario() } },
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
