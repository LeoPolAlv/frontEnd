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
export class ReservasInterceptorService implements HttpInterceptor{

  constructor(
    private usuarioService: UsuarioService,
    private loginService: LoginService,
    private router: Router,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('******** Entramos en el interceptor *************');
    
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
        switch (err.status) {
          case 0:
            this.loginService.logout();
            //this.router.navigate(['login']);
            throw 'No podemos conectar con el servidor'
            //break;
          case 401:  //En caso que el token nos devuelva el no autorizado redirigimos a la pagina de login
            this.loginService.logout();
            this.router.navigate(['login']);
            throw 'No tenemos permiso de acceso. Hay que loguearse'
            //break;

          default:
            throw `${err.status}: ${err.message}`;
            //break;
        }
      })
    );
  }
  
}
