import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, ViewEncapsulation, Input} from '@angular/core';
import { startOfDay,endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addYears, subMonths,addMonths, addWeeks,subWeeks, startOfMonth,startOfWeek,endOfWeek} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarDayViewBeforeRenderEvent, CalendarEvent, CalendarEventAction,CalendarEventTimesChangedEvent, CalendarEventTimesChangedEventType, CalendarMonthViewDay, CalendarView, CalendarWeekViewBeforeRenderEvent} from 'angular-calendar';
import { SalasService } from '../../services/salas.service';
import { ReservasService } from '../../services/reservas.service';
import { Reservas } from '../../interfaces/responses';
import { } from 'date-fns';
import { AltaReserva } from 'src/app/interfaces/request';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const colors: any = {
  inactivo: {
    primary: ' #f5b7b1',
    secondary: ' #fdedec',
  },
  blueAtos: {
    primary: '#e9e9e9',
    secondary: '#20589d',
  },
  preReserva: {
    primary: '#0b5345',
    secondary: '#45b39d'
  }
};

type CalendarPeriod = 'day' | 'week' | 'month';

function addPeriod(period: CalendarPeriod, date: Date, amount: number): Date {
  return {
    day: addDays,
    week: addWeeks,
    month: addMonths,
  }[period](date, amount);
}

function subPeriod(period: CalendarPeriod, date: Date, amount: number): Date {
  return {
    day: subDays,
    week: subWeeks,
    month: subMonths,
  }[period](date, amount);
}

function startOfPeriod(period: CalendarPeriod, date: Date): Date {
  return {
    day: startOfDay,
    week: startOfWeek,
    month: startOfMonth,
  }[period](date);
}

function endOfPeriod(period: CalendarPeriod, date: Date): Date {
  return {
    day: endOfDay,
    week: endOfWeek,
    month: endOfMonth,
  }[period](date);
}

@Component({
  selector: 'app-calendario-reservas',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendario-reservas.component.scss'],
  templateUrl: './calendario-reservas.component.html',
  encapsulation: ViewEncapsulation.None,
})

export class CalendarioReservasComponent implements OnInit{

  @Input () userReserva!: any;
  
  public salaSeleccionada: number = 0;

  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;
  @ViewChild('modalAltaReserva') modalAltaReserva!: TemplateRef<any>;
  
  view: CalendarView  | CalendarPeriod = CalendarView.Week;

  CalendarView = CalendarView;

  public viewDate: Date = new Date();
  // fecha antes de hoy con la que no se puee hacer nada en la agenda.
  private minDate: Date = new Date();
  // Fecha maxima disponible para reservar sala. hoy + 2 años
  private maxDate: Date = addYears(new Date(), 2);

  public prevBtnDisabled: boolean = false;
  public nextBtnDisabled: boolean = false;
  
  public modalData!: {
    action: string;
    event: CalendarEvent | undefined;
  };

  public DatosAltaReserva!: AltaReserva;
  public altaReservaForm!: FormGroup;

  public actionsAlta: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-save"></i>',
      a11yLabel: 'Save',
      onClick: ({ event }: {event: CalendarEvent}): void => {
        this.handleNewReserva();
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        //this.handleEvent('Deleted', event);
      },
    }
  ];

  public actionsMantenimiento: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    }
  ];

  public actionsDisabled: CalendarEventAction[] = [
    {
      label: '',
      onClick: (): void => {
      },
    }
  ];

  public refresh = new Subject<void>();
  public events: CalendarEvent[] = [];
  private eventos!: CalendarEvent; 
  public clickedDate: Date = new Date();
  
  public activeDayIsOpen: boolean = true;

  constructor(
    private modal: NgbModal,
    private salaService: SalasService,
    private reservasService: ReservasService,
    private fb: FormBuilder,
    ) {
      this.dateOrViewChanged();
    }

  ngOnInit(): void {
    this.salaService.nuevaSala
          .subscribe( (salaReserva: any) => {
            this.events = [];
            this.salaSeleccionada = salaReserva;
            console.log('Salta el subscribe del cambio de sala: ', salaReserva);
      //Buscamos las reservas que tiene una sala adjudicadas.
            if(salaReserva){
              this.buscarReservas(salaReserva);
            }
          });
  }

  ngAfterViewInit(){
    this.crearFormulario();
  }

  crearFormulario(){
    this.altaReservaForm = this.fb.group({
      roomId:['', Validators.required],
      dasUser: [this.userReserva.usuario, Validators.required],
      fechaReserva:['', Validators.required],
      fechaHasta:['', Validators.required],
      titulo:['', Validators.required],
      descripcion:['', Validators.required]
    })
  }

  inicializarForm(){
    this.altaReservaForm.controls['titulo'].setValue('');
    this.altaReservaForm.controls['descripcion'].setValue('');
    this.altaReservaForm.controls['fechaReserva'].setValue('');
    this.altaReservaForm.controls['fechaHasta'].setValue('');
  }
  
  buscarReservas(sala: number){
    this.reservasService.buscarReservas(sala)
          .subscribe((reservas: any)=>{
            console.log('Reservas por sala: ', reservas)
            this.cargarReservasSala(reservas);
        }); 
  }

  altaReserva(){
    this.altaReservaForm.controls['roomId'].setValue(this.salaSeleccionada);
    console.log('Formulario que envio a dar de alta: ', this.altaReservaForm.value);
    this.reservasService.altaReserva(this.altaReservaForm.value)
         .subscribe({
           next: (resp) => {
            console.log('Respuesta del alta de reserva: ', resp);
             this.inicializarForm();
             this.modal.dismissAll();
             this.buscarReservas(this.salaSeleccionada);
           },
           error: (err) => console.log('Error en el alta de reserva: ', err)
         })
  }

  cargarReservasSala(reservasSala: any){
    this.events = [];
    let acciones: CalendarEventAction[] = [];

    reservasSala.forEach((reserva:Reservas) => {
      let colorAsignado: any = colors.blueAtos;

      if (!reserva.activa){
        colorAsignado = colors.inactivo;
        acciones = this.actionsDisabled;
      } else {
        acciones = this.actionsMantenimiento;
      }

      this.eventos = 
        {
          id: reserva.idReserva,
          title: reserva.titulo,
          start: new Date(reserva.fechaReserva),
          end: new Date(reserva.fechaHasta),
          color: colorAsignado,
          actions: acciones,
          allDay: false,
          draggable: reserva.activa,
          resizable: {
            beforeStart: reserva.activa,
            afterEnd: reserva.activa,
          },
        };
    
        this.events = [
          ...this.events, 
          this.eventos]
    });
    this.refresh.next();
  }

  increment(): void {
    this.changeDate(this.viewDate);
  }

  decrement(): void {
    this.changeDate(this.viewDate);
  }

  today(): void {
    this.changeDate(new Date());
  }

  /*
  * Validamos los dias validos en la vista Mes para realizar una reserva.
  * Los dias que no estan en la franja de los validos no se realizan reservas.
  */
  dateIsValid(date: Date): boolean {
    return date >= this.minDate && date <= this.maxDate;
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach((day) => {
      if (!this.dateIsValid(day.date)) {
        day.cssClass = 'cal-disabled';
      }
    });
  }

  /*
  * Validamos los dias y segmentos de horas validos en la vista Semana para realizar una reserva.
  * Los segmentos que no estan en la franja de los validos no se realizan reservas.
  */
  public segmentIsValid(date: Date) {
    return date >= this.minDate ;
  }
  
  beforeWeekViewRender(body: CalendarWeekViewBeforeRenderEvent): void {
    body.hourColumns.forEach(hourCol => {
      hourCol.hours.forEach(hour => {
        hour.segments.forEach(segment => {
          if (!this.segmentIsValid(segment.date)) {
            delete segment.cssClass;
            segment.cssClass = 'cal-disabled';
          }
        });
      });
    });
  }

   /*
  * Validamos los segmentos de horas validos en la vista Dia para realizar una reserva.
  * Los segmentos que no estan en la franja de los validos no se realizan reservas.
  */
  beforeDayViewRender(day: CalendarDayViewBeforeRenderEvent): void {
    day.hourColumns.forEach( hourCol => {
      hourCol.hours.forEach( hour => {
        hour.segments.forEach( 
          segment => {
          if ((!this.segmentIsValid(segment.date))) {
            delete segment.cssClass;
            segment.cssClass = 'cal-disabled';
          }
        });
      });
    });
  }
  
  changeDate(date: Date): void {
    this.viewDate = date;
    this.dateOrViewChanged();
  }

  changeView(view: CalendarPeriod): void {
    this.view = view;
    this.dateOrViewChanged();
  }
  
  dateOrViewChanged(): void {
    this.prevBtnDisabled = !this.dateIsValid(
      endOfPeriod(this.view, subPeriod(this.view, this.viewDate, 1))
    );
    this.nextBtnDisabled = !this.dateIsValid(
      startOfPeriod(this.view, addPeriod(this.view, this.viewDate, 1))
    );
    
    if (this.viewDate < this.minDate) {
      this.changeDate(this.minDate);
    } else if (this.viewDate > this.maxDate) {
      this.changeDate(this.maxDate);
    }
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  //Añadimos un evento en el calendario en vistas week y day
  clickSegmento(evento: any){
    this.clickedDate = evento.date;
    if(this.clickedDate > this.minDate ){
      this.addEvent(this.clickedDate);
    }
  }

  validateEventTimesChanged({ event, newStart, newEnd, allDay }: CalendarEventTimesChangedEvent,
                              addCssClass = true){
    const overlappingEvent = this.events.find((otherEvent) => {
      return (
        otherEvent !== event &&
        !otherEvent.allDay &&
        ((otherEvent.start < newStart && newStart < otherEvent.end!) ||
          (otherEvent.start < newEnd! && newStart < otherEvent.end!))
      );
    });

    if (overlappingEvent) {
      if (addCssClass) {
        event.cssClass = 'invalid-position';
      } else {
        return false;
      }
    }
    return true;
  }

  eventTimesChanged( cambioFechaEvent: CalendarEventTimesChangedEvent): void {
    this.inicializarForm();
    const {event, newStart, newEnd} = cambioFechaEvent;
    delete cambioFechaEvent.event.cssClass;
    this.events = this.events.map((iEvent) => {
      if(newEnd){
        const FechaAux = new Date(newEnd);
        const horaLimite = new Date(FechaAux!.setHours(21,0,0));

   //Si la nueva hora final va mas alla de las 21 no se realiza el cambio de fecha
        if((newEnd) && (newEnd > horaLimite)){
          return iEvent;
        }
      }

  // Para que se pueda realizar el cambio de fecha de la reserva, la nueva fecha debe ser superior a la fecha minima,
  // que es la fecha y hora actuales.
      if((newStart > this.minDate) ){
        if ((iEvent === event) && (this.validateEventTimesChanged(cambioFechaEvent, false))){
          this.altaReservaForm.controls['fechaHasta'].setValue(newEnd);
          this.altaReservaForm.controls['fechaReserva'].setValue(newStart);
          return {
            ...event,
            start: newStart,
            end: newEnd,
          };
        }
      }
    //}
      return iEvent;
    });
    console.log('Eventos: ', this.events);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(fechaComienzo: Date): void {
    this.inicializarForm();

    const fechaInicio = new Date(fechaComienzo);
    const fechaInicioAux = new Date(fechaInicio);
    const fechaFin = new Date(fechaInicioAux.setMinutes(fechaComienzo.getMinutes() + 15));

    const newEvento = {
      title: '',
      start: fechaInicio,
      end: fechaFin,
      color: colors.preReserva,
      actions: this.actionsAlta,
      draggable: true,
      resizable: {
        beforeStart: false,
        afterEnd: true,
      },
    }
    this.events = [
      ...this.events,
      newEvento,
    ];
    this.altaReservaForm.controls['fechaReserva'].setValue(newEvento.start);
    this.altaReservaForm.controls['fechaHasta'].setValue(newEvento.end);
  }

  handleNewReserva() {
    this.modal.open(this.modalAltaReserva, { size: 'lg' });
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}