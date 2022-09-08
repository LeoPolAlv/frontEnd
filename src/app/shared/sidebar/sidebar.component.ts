import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { RequestNewReserva } from 'src/app/interfaces/request';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() userToken!: string;

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  nuevaReserva() {
    /*let requestNewReserva: RequestNewReserva = {
      pais: 0,
      nombrePais: '',
      oficina: 0
    }*/
    //console.log('nueva reserva desde Sidebar: ', requestNewReserva);
    //this.router.navigateByUrl('/main', {skipLocationChange: true}).then(() => this.router.navigate(['main/init',requestNewReserva]));
    this.router.navigateByUrl('/main', {skipLocationChange: true}).then(() => this.router.navigate(['main/newreserva']));
  }

  misReservas() {
    //console.log('Estoy en mis reservas');
    this.router.navigate(['main']);
    //this.router.navigateByUrl('/main', {skipLocationChange: true}).then(() => this.router.navigate(['main/newreserva']));
  }

  /*inicioMapa() {
    this.router.navigate(['main']);
  }*/

  async logoOut(){
    await this.loginService.logout();
    this.router.navigateByUrl('/login');
  }

}
