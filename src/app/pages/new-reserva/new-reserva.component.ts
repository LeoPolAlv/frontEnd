import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OficinasService } from 'src/app/services/oficinas.service';
//import { Room, Oficinas } from '../../interfaces/responses';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SalasService } from '../../services/salas.service';


@Component({
  selector: 'app-new-reserva',
  templateUrl: './new-reserva.component.html',
  styleUrls: ['./new-reserva.component.scss']
})
export class NewReservaComponent implements OnInit {

  //@ViewChild("calendarReservas") etiquetaCalendar!: ElementRef;
  
  private etiquetaCalendar:any;

  public oficinaSeleccionada: number = 0;
  public paisSeleccionado: string = '';
  public salaSeleccionada: string = '';

  public formDisable!: boolean;
  public disableCalendar: boolean = true;
  private nomOficina: string = '';

  public salas!: any;
  public oficina!: any;
  public usuario!: any;

  public altaReservaForm!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private oficinaService: OficinasService,
    private salaService: SalasService,
    private fb:FormBuilder,
    //private renderer: Renderer2,
  ) {
    //this.renderer.setAttribute(this.etiquetaCalendar.nativeElement,"disabled", "true");

    this.activatedRoute.paramMap.subscribe(
      (params: ParamMap) => {
        this.oficinaSeleccionada = parseInt(params.get('oficina')!);
        this.paisSeleccionado = params.get('pais')!;
        //console.log('Parametros entrada new reserva: ', this.oficinaSeleccionada);
        //console.log('Parametros entrada new reserva: ', this.paisSeleccionado);
      });

    this.datosOficina();

   }

  ngOnInit(): void {

    this.activatedRoute.data.subscribe(usuario => {
      this.usuario = usuario;
      console.log('Usuario que me llega a neva reserva: ', this.usuario);
    })
    
    if(this.oficinaSeleccionada && this.paisSeleccionado){
      this.buscarSalas();
      this.formDisable = true
      //console.log('Datos rellenos');
    } else {
      console.log('El formulario debe de estar NO disabled para elejir pais/oficina');
      this.formDisable = false
      console.log('Datos NO rellenos');
    }

    this.inicializarForm();

    this.altaReservaForm.get('sala')?.valueChanges
          .subscribe((valor) => {
            //console.log('Valor que cambia de sala: ', valor);
            if(valor !== ''){
              this.disableCalendar = false
              //this.renderer.setAttribute(this.etiquetaCalendar.nativeElement,"disabled", "false");
              this.etiquetaCalendar = document.getElementById("calendarReservas")?.setAttribute("style","display:inline");
              this.salaSeleccionada = valor 
              //console.log('Sala seleccionada: ', valor); 
              this.salaService.nuevaSala.emit(valor);
            } else {
              this.disableCalendar = true
              //this.renderer.setAttribute(this.etiquetaCalendar.nativeElement,"disabled", "true");
              this.etiquetaCalendar = document.getElementById("calendarReservas")?.setAttribute("style","display:none");
            }
          })
    }

  ngAfterViewInit(){
    console.log('Ya carge la pagina');
    this.etiquetaCalendar = document.getElementById("calendarReservas")?.setAttribute("style","display:none");
    /*this.activatedRoute.data.subscribe(usuario => {
      this.usuario = usuario;
      console.log('Usuario que me llega a nueva reserva: ', this.usuario);
    })*/
    //console.log('Etiqueta calendar: ', this.etiquetaCalendar);
    //this.renderer.setAttribute(this.etiquetaCalendar.nativeElement,"disabled", "true");
  }
  
  inicializarForm(){
    this.altaReservaForm = this.fb.group({
      //pais:[this.paisSeleccionado, Validators.required],
      pais:[{
        value: '',
        disabled: this.formDisable
      }, Validators.required],
      //oficina: [nomOficina, Validators.required],
      oficina: [{
        value:'',
        disabled: this.formDisable
      }, Validators.required],
      sala: ['', Validators.required]
    });
  }

  datosOficina(){
    //console.log('Datos Oficina');
    this.oficinaService.obterneOficina(this.oficinaSeleccionada)
    .subscribe((oficina: any) => {
      this.oficina = oficina;
      this.nomOficina = `${this.oficina.officename} ${this.oficina.localidad}`
      this.informarForm();
      //console.log('Datos oficina Seleccionada: ', this.oficina);
    });

  }
  
  buscarSalas(){
    //console.log('Datos Salas');
    this.oficinaService.obtenerSalasOficina(this.oficinaSeleccionada)
          .subscribe((sala: any) => {
            this.salas = sala
            //console.log('Sala: ', this.salas);
          });
  }

  informarForm(){
    //console.log('Informar form');
    //let nomOficina = `${this.oficina.officename} ${this.oficina.localidad}`
    //console.log('Nombre pais en form: ', this.paisSeleccionado);
    //console.log('Nombre oficina en form: ', this.nomOficina);
    this.altaReservaForm.controls['pais'].setValue(this.paisSeleccionado);
    this.altaReservaForm.controls['oficina'].setValue(this.nomOficina);
  }

}
