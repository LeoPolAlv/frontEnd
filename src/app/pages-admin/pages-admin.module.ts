import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PruebaAdminComponent } from './prueba-admin/prueba-admin.component';
import { PagesAdminComponent } from './pages-admin.component';



@NgModule({
  declarations: [
    PruebaAdminComponent,
    PagesAdminComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    
  ]
})
export class PagesAdminModule { }
