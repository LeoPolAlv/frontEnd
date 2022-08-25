import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Pais } from '../interfaces/responses';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(
    private http: HttpClient,
  ) { }

  obtenerPais(id: number){
    //console.log('id servicio: ', id);
    const url_acceso = `${URL}/pais/${id}`
    return this.http.get<Pais>(url_acceso);
  }
  
  obtenerPaises() {
    const url_acceso = `${URL}/pais/all`
    return this.http.get<Pais>(url_acceso);
  }
}
