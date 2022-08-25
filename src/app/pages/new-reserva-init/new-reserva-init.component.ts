import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Oficinas, Pais } from 'src/app/interfaces/responses';
import { OficinasService } from 'src/app/services/oficinas.service';
import { PaisService } from 'src/app/services/pais.service';
import { SalasService } from 'src/app/services/salas.service';

@Component({
  selector: 'app-new-reserva-init',
  templateUrl: './new-reserva-init.component.html',
  styleUrls: ['./new-reserva-init.component.scss']
})
export class NewReservaInitComponent implements OnInit {

  private etiquetaCalendar:any;

  public oficinaSeleccionada: number = 0;
  public paisSeleccionado: any;
  public salaSeleccionada: string = '';

  public disableCalendar: boolean = true;
  public tengoOficina: boolean = true;
  public tengoSalas: boolean = true;
  //private nomOficina: string = '';

  public paises!: any;
  public oficinasPais!: any;

  public salas!: any;
  public oficina!: any;
  public usuario!: any;

  public altaReservaForm!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService,
    private oficinaService: OficinasService,
    private salaService: SalasService,
    private fb:FormBuilder,
  ) {}

  ngOnInit(): void {
    console.log('On init de new reserva INIT');
    document.getElementById("calendarReservas")?.setAttribute("style","display:none");

    this.activatedRoute.data.subscribe(usuario => {
      this.usuario = usuario;
      //console.log('Usuario que me llega a neva reserva: ', this.usuario);
    });

    
    this.inicializarForm();
    this.validarParametros();

    this.altaReservaForm.get('pais')?.valueChanges
      .subscribe({
        next: paisSelect => {
           //console.log('Pais cambiado: ', paisSelect);
          //this.altaReservaForm.controls['oficina'].setValue(0);
          this.oficinaService.obtenerOficinasPais(paisSelect)
            .subscribe((oficinas: any) => {
              //console.log('OFICINAS: ', oficinas);
              if (oficinas.length === 0) {
                this.tengoOficina = false;
              } else {
                this.tengoOficina = true;
                this.oficinasPais = oficinas;
              }
          });
        },
        error: err => console.log('Error al seleccionar los paises de la lista: ', err)
      });
    
    this.altaReservaForm.get("oficina")?.valueChanges
      .subscribe({
        next: async oficinaSelec => {
          await this.buscarSalas(oficinaSelec);
          //console.log('oficina Seleccionada: ', oficinaSelec);
          //console.log('Numero de salas selecciondas: ', this.salas);
          /*this.oficina = this.oficinasPais.filter((ofic: any) =>
            oficinaSelec == ofic.idoffice);
          //console.log('Oficina Seleccionda al final1: ', this.oficina);
          */
        },
        error: err => console.log('Error al buscar las oficinas del pais: ', err),
      });

    this.altaReservaForm.get('sala')?.valueChanges
      .subscribe((valor) => {
        console.log('Valor que cambia de sala: ', valor);
        if (valor !== '') {
          this.disableCalendar = false
          document.getElementById("calendarReservas")?.setAttribute("style", "display:inline");
          console.log("Elemento: ", document.getElementById("calendarReservas")!.getAttribute("style"));
          //document.getElementById("calendarReservas")!.className = "calendarVisible";
          //document.getElementById("calendarReservas")?.setAttribute("style","visibility: visible");
          this.salaSeleccionada = valor
          //console.log('Sala seleccionada: ', valor); 
          this.salaService.nuevaSala.emit(valor);
        } /*else {
              this.disableCalendar = true
              document.getElementById("calendarReservas")?.setAttribute("style","display:none");
            }*/
      });
  }

  ngAfterViewInit(){
    document.getElementById("calendarReservas")!.setAttribute("style", "display:none!important");
  }

  validarParametros() {
    //console.log('El formulario debe de estar NO disabled para elejir pais/oficina');
    
    this.paisService.obtenerPaises()
      .subscribe({
        next: (resp: Pais) => {
          console.log('Paises que llegan de la select: ', resp);
          this.paises = resp;
        },
        error: err => console.log('Error al cargar los paises en la tabla: ', err),
        complete: () => {
          if (document.getElementById("calendarReservas")) {
            document.getElementById("calendarReservas")!.setAttribute("style", "display:none!important");
          }
        }
      });
  }

  inicializarForm(){
    this.altaReservaForm = this.fb.group({
      //pais:[this.paisSeleccionado, Validators.required],
      pais:[{
        value: '',
        disabled: false
      }, Validators.required],
      //oficina: [nomOficina, Validators.required],
      oficina: [{
        value:'',
        disabled: false
      }, Validators.required],
      sala: ['', Validators.required]
    });
  }

  /*datosOficina(oficinaS: number){
    console.log('Datos Oficina: ',oficinaS);
    this.oficinaService.obterneOficina(oficinaS)
    .subscribe((oficina: any) => {
      this.oficina = oficina;
      console.log('Datos oficina Seleccionada: ', this.oficina);
      //return `${this.oficina.officename} ${this.oficina.localidad}`;
      //this.nomOficina = `${this.oficina.officename} ${this.oficina.localidad}`;
      //this.informarForm();
    });

  }
  */
  buscarSalas(idOficina: number){
    //console.log('Datos Salas');
    this.oficinaService.obtenerSalasOficina(idOficina)
      .subscribe((sala: any) => {
        if (sala.length === 0) {
          this.tengoSalas = false;
        } else {
          this.tengoSalas = true;
          this.salas = sala
        }
        console.log('Salas: ', this.salas);
    });
  }

  /*informarForm(){
    //console.log('Informar form');
    //let nomOficina = `${this.oficina.officename} ${this.oficina.localidad}`
    console.log('Nombre pais en form: ', this.paisSeleccionado);
    console.log('Nombre oficina en form: ', this.nomOficina);
    this.altaReservaForm.controls['pais'].setValue(this.paisSeleccionado);
    this.altaReservaForm.controls['oficina'].setValue(this.nomOficina);
  }
*/
}
