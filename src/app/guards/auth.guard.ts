import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private usuarioService: UsuarioService,
    private router:Router,
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    
      //const expectedRol = route.data.expectedRol;
      /*const roles = this.usuarioService.getAuthorities();
      this.realRol = 'user';
      roles.forEach(rol => {
        if (rol === 'ROLE_ADMIN') {
          this.realRol = 'admin';
        }
      });*/
      //console.log('Comprobamos guard');
      //console.log('Validamos token en guard: ', this.usuarioService.vaidarToken());
      if(!this.usuarioService.vaidarToken()){
        this.router.navigateByUrl('/login');
        //console.log('false');
        return false;
      }
      //console.log('true');
      return true;
  }
  
}
