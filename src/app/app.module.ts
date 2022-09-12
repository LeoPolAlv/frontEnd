import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { PagesModule } from './pages/pages.module';
import { NoFoundPageComponent } from './no-found-page/no-found-page.component';
import { ReservasInterceptorService } from './interceptors/reservas.interceptor.service';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
  declarations: [
    AppComponent,
    NoFoundPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    PagesModule,
    HttpClientModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, 
      useClass: ReservasInterceptorService, 
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
