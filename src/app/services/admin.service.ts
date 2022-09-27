import { Injectable } from '@angular/core';

export interface MenuAdmin {
  img: string;
  title: string;
  acciones: Acciones []
}

interface Acciones {
    id: string,
  texto: string,
  icono: string
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  menuAdmin: MenuAdmin[] = [
    {
      img: '../../../assets/images/Icons/oficinas.svg',
      title: 'Oficinas',
      acciones:[
        {
          id: 'save',
          texto: '',
          icono:'pi pi-plus'
        },
        {
          id: 'delete',
          texto: 'p-button-danger',
          icono:'pi pi-trash'
        },
        {
          id: 'update',
          texto: 'p-button-warning',
          icono:'pi pi-pencil'
        }
      ]
    },
    {
      img: '../../../assets/images/Icons/salas.svg',
      title: 'Salas',
      acciones:[
        {
          id: 'save',
          texto: '',
          icono:'pi pi-plus'
        },
        {
          id: 'delete',
          texto: 'p-button-danger',
          icono:'pi pi-trash'
        },
        {
          id: 'update',
          texto: 'p-button-warning',
          icono:'pi pi-pencil'
        }
      ]
    },
    {
      img: '../../../assets/images/Icons/reservas.svg',
      title: 'Reservas',
      acciones:[ 
        {
          id: 'save',
          texto: '',
          icono:'pi pi-plus'
        },
        {
          id: 'delete',
          texto: 'p-button-danger',
          icono:'pi pi-trash'
        },
        {
          id: 'update',
          texto: 'p-button-warning',
          icono:'pi pi-pencil'
        }
      ]
    },
    {
      img: '../../../assets/images/Icons/equipamientos.svg',
      title: 'Equipamientos',
      acciones:[ 
        {
          id: 'save',
          texto: '',
          icono:'pi pi-plus'
        },
        {
          id: 'delete',
          texto: 'p-button-danger',
          icono:'pi pi-trash'
        },
        {
          id: 'update',
          texto: 'p-button-warning',
          icono:'pi pi-pencil'
        }
      ]
    },
  ];

  constructor() { }

  getMenu() {
    return this.menuAdmin;
  }
}
