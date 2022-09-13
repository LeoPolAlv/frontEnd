import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
