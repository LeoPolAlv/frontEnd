import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import { MenuItem } from 'primeng/api';

interface TOKEN
{
  "sub": string,
  "iat": number,
  "roles": string,
  "exp": number
}

const URL = environment.url;

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUserName';
const AUTHORITIES_KEY = 'AutAuthorities';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public menuUser: any;
  public token: string = '';
  public roles: Array<string> = [];

  constructor() {  }

   public getToken(): string {
    return localStorage.getItem('TKResSl') || '';
  }

  public setToken(token: string) {
    return localStorage.setItem('TKResSl', token);
  }

  /**
   * Validamos que exita un token creado 
   * @returns false si no hay token creado. True si lo hay
   */
  vaidarToken(): boolean{
    this.token = this.getToken();
    //console.log("Token creado: ", this.token);
    return this.token ? true : false;
    /*if (!this.token){
      //this.navctrl.navigateRoot('/login');
      return false;
    }
    return true;*/
  }

  getusuario(): string{
    let usuarioToken: string = '';
    if(this.vaidarToken()){
      let tokenSub: TOKEN = jwt_decode (this.getToken());
      usuarioToken = tokenSub.sub;
     // console.log('Usuario obtenido: ', usuarioToken);  
    }
    return usuarioToken;
  }

  getRol(){
    let roleToken: string = '';
    if(this.vaidarToken()){
      let tokenRole: TOKEN = jwt_decode (this.getToken());
      roleToken = tokenRole.roles;
     // console.log('Role obtenido: ', roleToken);  
    }
    return roleToken;
  }

  public setAuthorities(authorities: string[]): void {
    localStorage.removeItem(AUTHORITIES_KEY);
    localStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];
    if (localStorage.getItem(AUTHORITIES_KEY)) {
       const value: any = localStorage.getItem(AUTHORITIES_KEY);
       value.forEach((authority:any) => {
         this.roles.push(authority.authority);
      });
    } 
    return this.roles;
  }

  getMenuUser() {
    return this.menuUser =
    {
      label: 'Reservas',
      icon: 'pi pi-align-justify',
      items: [
        {
          label: 'Mis Reservas',
          icon: 'pi pi-calendar-times',
          routerLink: ['/main']

        },
        {
          label: 'Gestion Reservas',
          icon: 'pi pi-pencil',
          routerLink: ['/main/newreserva']
        },
        {
          separator: true
        }
      ]
    };
  }

}


