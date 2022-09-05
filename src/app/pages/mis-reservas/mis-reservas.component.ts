import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { ReservasService } from '../../services/reservas.service';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.scss']
})
export class MisReservasComponent implements OnInit {

  public usuario!: Data;

  constructor(
    private activatedRoute: ActivatedRoute,
    private reservaService: ReservasService,
  ) { }

  ngOnInit(): void {

    this.verParametros();
  }

  verParametros() {
    this.activatedRoute.data.subscribe(usuario => {
      this.usuario = usuario['usuario'];
      //console.log('Usuario this que me llega a mis reservas: ', this.usuario);
      //console.log('Usuario que me llega a mis reservas: ', usuario['usuario']);
    });
  }

}
