import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { HomeComponent } from './home/home.component';
import { NewReservaComponent } from './new-reserva/new-reserva.component';

const childRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'new', component: NewReservaComponent,data:{usuario: new UsuarioService().getusuario()}}
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
