import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { ReservasService } from '../../services/reservas.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.scss']
})
export class MisReservasComponent implements OnInit {

  public usuario: String = '';

  constructor(
    private usuarioService: UsuarioService,
  ) { 
    this.usuario = this.usuarioService.getusuario();
  }

  ngOnInit(): void {}

}
