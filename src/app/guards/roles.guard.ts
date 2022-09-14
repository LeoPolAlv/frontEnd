import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class RolesGuard implements CanActivate { //, CanLoad {

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    const role = usuarioService.getRol();
    console.log('Role del usuario constructor guard: ', role);
   }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    //console.log('Can Activate admin');
    const role = this.usuarioService.getRol();
    if (role !== 'ROLE_ADMIN') {
      this.router.navigateByUrl('/noauth');
      localStorage.removeItem('TKResSl');
      return false;
    }
    return true;
  }

  /*canLoad(
    route: Route,
    segments: UrlSegment[]): boolean | UrlTree {
    console.log('Can Load admin');
    return false;
  }*/
}
