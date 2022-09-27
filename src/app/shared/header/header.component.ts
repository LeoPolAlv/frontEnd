import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { LoginService } from 'src/app/services/login.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() userToken!: string;

  private roleToken: string = '';
  public role: string = ''
  public menu: MenuItem[] = [];
  
  constructor(
    private loginService: LoginService,
    private router: Router,
    private usuarioService: UsuarioService,
  ) { 
  }
  
  ngOnInit(): void {

    this.role = 'user';

    this.roleToken = this.usuarioService.getRol();
    if (this.roleToken === 'ROLE_ADMIN') {
      this.role = 'admin'
    } 

    //Cargamos el meenu dependiendo de los privilegios del usuario

    this.menu = [
     /* {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},*/
      {
        label:'Quit',
        icon: 'pi pi-fw pi-power-off',
        command: () => {
          //console.log('Estoy cerrando');
          this.loginService.logout();
          this.router.navigateByUrl('/login');
        },
      }
    ];

    if (this.role === 'user') {
      let menuUser: any;
      //console.log('Menu user cargado: ', this.usuarioService.getMenuUser());

     /* this.menu.forEach(itemAux => {
        console.log('Item del menu: ', itemAux);
        if (itemAux === null) {
          this.menu.shift(); 
        }
      });*/
      menuUser = this.usuarioService.getMenuUser();
      this.menu.unshift(menuUser);
    }
  }

  nuevaReserva() {
    this.router.navigateByUrl('/main', {skipLocationChange: true}).then(() => this.router.navigate(['main/newreserva']));
  }

  misReservas() {
    this.router.navigate(['main']);
  }

  logoOut(){
    this.loginService.logout();
    this.router.navigateByUrl('/login');
  }


}
