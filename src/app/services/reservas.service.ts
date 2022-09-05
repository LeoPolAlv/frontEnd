import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Reservas } from '../interfaces/responses';
import { AltaReserva, PutFechaReserva } from '../interfaces/request';
import { Data } from '@angular/router';


const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  constructor(
    private http: HttpClient,
  ) { }

  public buscarReservas(sala: number){
    //console.log('sala en servicio: ', sala);
    const url_acceso = `${URL}/reserva/findbysala/${sala}`
    return this.http.get<Reservas>(url_acceso);
  }

  public misReservas(usuario: Data){
    console.log('Usuario en servicio: ', usuario);
    const url_acceso = `${URL}/reserva/find/${usuario}`
    return this.http.get<Reservas>(url_acceso);
  }

  public altaReserva(reserva: AltaReserva){
    let url = `${URL}/reserva/new`;
    return this.http.post(url,reserva);
  }

  public modifFechasReserva(nuevasFechas: PutFechaReserva){
    let url = `${URL}/reserva/nuevafecha`;
    return this.http.put(url,nuevasFechas);
  }

  public borrarReserva(idReserva: any) {
    let url = `${URL}/reserva/delete/${idReserva}`;
    return this.http.delete(url);
  }
}


