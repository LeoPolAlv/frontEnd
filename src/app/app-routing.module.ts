import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRoutingModule } from './login/login-routing.module';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { NoFoundPageComponent } from './no-found-page/no-found-page.component';
import { NoAutorizadoComponent } from './no-autorizado/no-autorizado.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/main' },
  //{ path: 'admin', pathMatch: 'full', redirectTo: '/admin' },
  { path: 'noauth', component: NoAutorizadoComponent },
  { path: '**', component: NoFoundPageComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    LoginRoutingModule,
    PagesRoutingModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
