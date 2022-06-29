import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  public userToken!: string;

  constructor(
    private usuarioService: UsuarioService,
  ) {
     //console.log('Existe Token? ',this.usuarioService.vaidarToken());
     //console.log('Usuario Token ',this.usuarioService.getusuario());
     //console.log('Role Token ',this.usuarioService.getRol());
     this.userToken = this.usuarioService.getusuario();
   }

  ngOnInit(): void {
  }

}
