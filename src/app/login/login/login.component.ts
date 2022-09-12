import { Component, ErrorHandler, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { LoginUsuario } from '../../models/login.model';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formLogin!: FormGroup;

  public error!: boolean;
  public mensajeError!: string;

  constructor(
    private fb:FormBuilder,
    private loginService: LoginService,
    private usuarioService: UsuarioService,
    private router:Router,
  ) {
    this.inicializarForm();
   }

  ngOnInit(): void {
    this.error = false;
    this.mensajeError = ''
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
    this.error = false;
    const loginUser = new LoginUsuario(this.formLogin.get('username')?.value,this.formLogin.get('password')?.value)
    this.loginService.login(loginUser).subscribe(({
      next: async (resp: any) => { 
        //console.log('Respuesta del Login: ', resp);
        this.usuarioService.setToken(resp.token);
        //localStorage.setItem('TKResSl', resp.token); 
        
      },
      error: (err) => {
        console.log('Error en LOGIN: ', err);
        this.mensajeError = err;
        this.error = true;
      },
      complete: () => {
        if (this.formLogin.get('recuerda')?.value){
          localStorage.setItem('ResSalRbr',this.formLogin.get('username')?.value);
        } else {
          localStorage.removeItem('ResSalRbr');
        }
        //Si todo fue bien navegamos a la pagina principal
        this.router.navigateByUrl("");
      }
    })
    )
  }
}
