import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class RolesGuard implements CanActivate, CanLoad {

  constructor(
    usuarioService: UsuarioService,
  ) {
    const role = usuarioService.getRol();
    console.log('Role del usuario constructor guard: ', role);
   }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    console.log('Can Activate admin');
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): boolean | UrlTree {
    console.log('Can Load admin');
    return false;
  }
}
