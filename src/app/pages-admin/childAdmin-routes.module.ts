import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PruebaAdminComponent } from './prueba-admin/prueba-admin.component';

const childAdminRoutes: Routes = [
  //{ path: '', component: HomeComponent },
  //{ path: '', component: MisReservasComponent, data:{usuario: new UsuarioService().getusuario() } },
  { path: '', component: PruebaAdminComponent },
  /*{ path: 'reservas', component: MisReservasComponent },
  { path: 'newreserva', component: HomeComponent, data: { usuario: new UsuarioService().getusuario() } },
  { path: 'new', component: NewReservaComponent, data: { usuario: new UsuarioService().getusuario() } },
  { path: '**', redirectTo: "reservas"},*/
]


@NgModule({
  imports: [
    RouterModule.forChild(childAdminRoutes),
  ],
  exports: [
    RouterModule,
  ]
})
export class ChildRoutesModule {}
