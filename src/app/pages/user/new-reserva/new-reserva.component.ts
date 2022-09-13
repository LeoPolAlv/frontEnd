import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OficinasService } from 'src/app/services/oficinas.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SalasService } from '../../../services/salas.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-new-reserva',
  templateUrl: './new-reserva.component.html',
  styleUrls: ['./new-reserva.component.scss']
})
export class NewReservaComponent implements OnInit {

  private etiquetaCalendar:any;

  public oficinaSeleccionada: number = 0;
  public paisSeleccionado: any;
  public salaSeleccionada: string = '';

  public disableCalendar: boolean = true;
  public nomOficina: string = '';

  public paises!: any;
  public oficinasPais!: any;

  public salas!: any;
  public oficina!: any;
  public usuario!: any;

  public altaReservaForm!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private oficinaService: OficinasService,
    private salaService: SalasService,
    private fb:FormBuilder,
  ) {}

  ngOnInit(): void {
    //console.log('On init de new reserva');
    document.getElementById("calendarReservas")?.setAttribute("style","display:none");

    /*this.activatedRoute.data.subscribe(usuario => {
      this.usuario = usuario;
    });
    */

    this.usuario = new UsuarioService().getusuario();
    //console.log('USUARIO EN NewReserva: ', this.usuario);

    this.inicializarForm();
    
    this.leerParametros();
    this.validarParametros();

    this.altaReservaForm.get('sala')?.valueChanges
      .subscribe((valor) => {
        if (valor !== '') {
          this.disableCalendar = false
          document.getElementById("calendarReservas")?.setAttribute("style", "display:inline");
          this.salaSeleccionada = valor
          this.salaService.nuevaSala.emit(valor);
        }
      });
  }

  ngAfterViewInit(){
    document.getElementById("calendarReservas")!.setAttribute("style", "display:none!important");
  }

  leerParametros() {
    this.activatedRoute.paramMap.subscribe(
      (params: ParamMap) => {
        this.oficinaSeleccionada = parseInt(params.get('oficina')!);
        this.paisSeleccionado = params.get('nombrePais')!;
      });
  }

  validarParametros() {
      this.datosOficina(this.oficinaSeleccionada);
      this.informarForm();
      this.buscarSalas();
  }

  inicializarForm(){
    this.altaReservaForm = this.fb.group({
      pais:[{
        value: this.paisSeleccionado,
        disabled: true
      }, Validators.required],
      oficina: [{
        value:'',
        disabled: true
      }, Validators.required],
      sala: ['', Validators.required]
    });
  }

  datosOficina(oficinaS: number){
    this.oficinaService.obterneOficina(oficinaS)
    .subscribe((oficina: any) => {
      this.oficina = oficina;
      this.nomOficina = `${this.oficina.officename} ${this.oficina.localidad}`;
    });

  }
  
  buscarSalas(){
    this.oficinaService.obtenerSalasOficina(this.oficinaSeleccionada)
          .subscribe((sala: any) => {
            this.salas = sala;
          });
  }

  informarForm(){
    this.altaReservaForm.controls['pais'].setValue(this.paisSeleccionado);
    this.altaReservaForm.controls['oficina'].setValue(this.nomOficina);
  }

}
