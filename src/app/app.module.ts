import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/pages.module';
import { NoFoundPageComponent } from './no-found-page/no-found-page.component';
import { ReservasService } from './interceptors/reservas.service';

@NgModule({
  declarations: [
    AppComponent,
    NoFoundPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    PagesModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, 
      useClass: ReservasService, 
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
