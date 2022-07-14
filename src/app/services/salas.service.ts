import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalasService {

  public nuevaSala: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }
}
