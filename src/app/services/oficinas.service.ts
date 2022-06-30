import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Oficinas } from '../interfaces/responses';

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
}
