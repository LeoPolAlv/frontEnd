import { NgSwitch } from '@angular/common';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginService } from '../services/login.service';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ReservasInterceptorService implements HttpInterceptor {

  constructor(
    private usuarioService: UsuarioService,
    private loginService: LoginService,
    private router: Router,
  ) {  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //console.log('******** Entramos en el interceptor *************');
    
    let authReq: HttpRequest<any> = req;
    
    const token = this.usuarioService.getToken();
    //console.log('Recuperamos el token: ', token);

    if (token != null) {
      //Clonamos el token y lo mandamos en la cabecera de todas las peticiones HTTP
      //Autorizaciòn de tipo Bearer + token
      authReq = req.clone({setHeaders: {'Authorization': `Bearer ${token}`}});
      //console.log("Theaders enviadas: ", authReq);
    }

    // Evaluamos los posibles errores que nos envia o genera la comunicacion con el servidor.
    return next.handle(authReq).pipe(
      catchError((err: HttpErrorResponse) => {
        let errorMensaje: string = '';

        if (err.error instanceof ErrorEvent) {
          errorMensaje = err.error.error;
        } else {
          if (err.status === 0) {
            this.loginService.logout();
            //this.router.navigate(['login']);
            errorMensaje = "No podemos conectar con el servidor";
          } else {
            if (err.status === 401) {
              this.loginService.logout();
              this.router.navigate(['login']);
              //errorMensaje = "No tenemos permiso de acceso. Credenciales erroneas";
              errorMensaje = err.statusText;
            } else {
              errorMensaje = `${err.status}: ${err.message}`;  
            }
          }
        }
        return throwError(() => new Error(errorMensaje));
      })
    );
  }
  
}
