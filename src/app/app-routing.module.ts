import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRoutingModule } from './login/login-routing.module';

const routes: Routes = [
  //{ path: '', pathMatch: 'full', redirectTo: 'path' },
  {
    path: 'login', 
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    LoginRoutingModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
