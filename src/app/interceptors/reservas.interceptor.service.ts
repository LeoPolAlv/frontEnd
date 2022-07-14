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
    //console.log('Entermos en el interceptor');
    let authReq: HttpRequest<any> = req;
    const token = this.usuarioService.getToken();
    //console.log('Recuperamos el token: ', token);

    if (token != null) {
      //Clonamos el token y lo mandamos en la cabecera de todas las peticiones HTTP
      //Autorizaciòn de tipo Bearer + token
      authReq = req.clone({setHeaders: {'Authorization': `Bearer ${token}`}});
      //console.log("Theaders enviadas: ", authReq);
    }

    //En caso que el token nos devuelva el no autorizado redirigimos a la pagina de login
    // console.log('Request enviada: ', req);
    return next.handle(authReq).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.loginService.logout();
          this.router.navigate(['login']);
          throw 'No tenemos permiso de acceso. Hay que loguearse'
        } else {
          throw 'Error: ' + err.message;
        }
        //return throwError( () => new Error(err.message));
      })
    );
  }
  
}
