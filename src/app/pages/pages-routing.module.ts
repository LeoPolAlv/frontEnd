import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';

const routes: Routes = [
  {
    path: 'main', 
    canActivate: [AuthGuard],
    component: PagesComponent,
    loadChildren: () => import('./user/child-routes.module').then(m => m.ChildRoutesModule)
  },
  {
    path: 'admin', 
    canActivate: [AuthGuard, RolesGuard],
    component: PagesComponent,
    loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule)
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports:[
    RouterModule,
  ]
})
export class PagesRoutingModule { }
