import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Oficinas, Pais, Room } from '../interfaces/responses';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class OficinasService {

  constructor(
    private http: HttpClient
  ) { }

  obtenerOficinas(){
    const url_acceso = `${URL}/oficinas/all`
    return this.http.get<Oficinas>(url_acceso);
  }

  obterneOficina(id: number){
    const url_acceso = `${URL}/oficinas/${id}`
    return this.http.get<Oficinas>(url_acceso);
  }

  obtenerSalasOficina(id: number){
    const url_acceso = `${URL}/room/findrooms/${id}`
    return this.http.get<Room>(url_acceso);
  }

  obtenerOficinasPais(id: number) {
    const url_acceso = `${URL}/oficinas/country/${id}`
    return this.http.get<Oficinas>(url_acceso);
  }
}
