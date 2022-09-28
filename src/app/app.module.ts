import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { NoFoundPageComponent } from './no-found-page/no-found-page.component';
import { ReservasInterceptorService } from './interceptors/reservas.interceptor.service';
import { PagesModule } from './pages/pages.module';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { GlobalErrorHandler } from './controlErrores/global-error-handler';
import { NotificadorErrorService } from './services/errors/notificador-error.service';

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
    BrowserAnimationsModule,
    CardModule,
    ButtonModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, 
      useClass: ReservasInterceptorService, 
      multi: true
    },
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
