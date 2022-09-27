import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '../material.module';
import {MenubarModule} from 'primeng/menubar';


@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    MatNativeDateModule,
    MaterialModule,
    MenubarModule
  ],
  exports: [
    SidebarComponent,
    HeaderComponent,
  ]
})
export class SharedModule { }
