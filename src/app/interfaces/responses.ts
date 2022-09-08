export interface Oficinas {
  idoffice: number;
  officename: string;
  direccion: string;
  localidad: string;
  codPostal: string;
  provincia: string;
  longitud: string;
  latitud: string;
}

export interface Pais {
  idPais: number,
  countryName: string
}

 export interface Room {
  idroom: number;
  roomName: string;
  capacity: number;
  equipment: Equipment[];
  reserves: Reserve[];
}

export interface Reserve {
  idreserve: number;
  activa: boolean;
  fechaReserva: string;
  fechaHasta: string;
  titulo: string;
  descripcion: string;
  alerts: any[];
}

interface Equipment {
  idroomeq: number;
}

export interface Reservas {
  idReserva: number;
  activa: boolean;
  roomName: string;
  capacity: number;
  officeRoom: string;
  countryName: string;
  titulo: string;
  descripcion: string;
  nombreEquipo: string[];
  fechaReserva: string;
  fechaHasta: string;
  userReserva: string;
}

export interface Pais {
  idPais: number;
  countryName: string;
}