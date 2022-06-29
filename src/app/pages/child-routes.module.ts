import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PruebaComponent } from './prueba/prueba.component';

const childRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'prueba/:oficina', component: PruebaComponent }
]


@NgModule({
  imports: [
    RouterModule.forChild(childRoutes),
  ],
  exports: [
    RouterModule,
  ]
})
export class ChildRoutesModule { }
