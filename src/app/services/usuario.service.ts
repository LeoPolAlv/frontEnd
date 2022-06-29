import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';

interface TOKEN
{
  "sub": string,
  "iat": number,
  "roles": string,
  "exp": number
}

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public token: string = '';

  constructor() {
    //this.token = this.getToken();
   }

  public getToken(): string {
    return localStorage.getItem('TKResSl') || '';
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

}


