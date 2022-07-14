import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Reservas } from '../interfaces/responses';
import { AltaReserva } from '../interfaces/request';


const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  constructor(
    private http: HttpClient,
  ) { }

  buscarReservas(sala: number){
    //console.log('sala en servicio: ', sala);
    const url_acceso = `${URL}/reserva/findbysala/${sala}`
    return this.http.get<Reservas>(url_acceso);
  }

  public altaReserva(reserva: AltaReserva){
    let url = `${URL}/reserva/new`;
    return this.http.post(url,reserva);
  }
}
