import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { LoginUsuario } from '../../models/login.model';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  public formLogin!: FormGroup;

  //public error!: boolean;
  //public mensajeError!: string;

  constructor(
    private fb:FormBuilder,
    private loginService: LoginService,
    private usuarioService: UsuarioService,
    private router: Router,
    private messageService: MessageService,
  ) {
    this.inicializarForm();
   }

  ngOnInit(): void {
    //this.error = false;
    //this.mensajeError = ''
    this.inicializarForm();
  }

  inicializarForm(){
    this.formLogin = this.fb.group({
      username: [localStorage.getItem('ResSalRbr'), Validators.required],
      password: ['', Validators.required],
      recuerda: [localStorage.getItem('ResSalRbr')?true:false, Validators.required]
    });
  }

  login(){
    //this.error = false;
    const loginUser = new LoginUsuario(this.formLogin.get('username')?.value, this.formLogin.get('password')?.value)
    
    this.loginService.login(loginUser).subscribe(({
      next: async (resp: any) => { 
        //console.log('Respuesta del Login: ', resp);
        this.usuarioService.setToken(resp.token);
        //localStorage.setItem('TKResSl', resp.token); 
      },
      error: (err) => {
        this.messageService.add({key: 'tc', severity:'error', summary: 'Error', detail: err});
        //console.log('Error en LOGIN: ', err);
        //throw new Error(err);
        //this.mensajeError = err;
        //this.error = false;
      },
      complete: () => {
        if (this.formLogin.get('recuerda')?.value){
          localStorage.setItem('ResSalRbr',this.formLogin.get('username')?.value);
        } else {
          localStorage.removeItem('ResSalRbr');
        }
        //Si todo fue bien navegamos a la pagina principal dependiendo del role del usuario logeado
        const role = this.usuarioService.getRol();
        
        if (role === 'ROLE_ADMIN') {
          this.router.navigateByUrl("admin");
        } else {
          this.router.navigateByUrl("main");
        }
      }
    })
    )
  }
}
