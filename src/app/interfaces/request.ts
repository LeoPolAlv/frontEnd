export interface RequestNewReserva  {
    pais: string,
    oficina: number
  }

  export interface AltaReserva {
    roomId: number;
    dasUser: string;
    fechaReserva: string;
    fechaHasta: string;
    titulo: string;
    descripcion: string;
  }
