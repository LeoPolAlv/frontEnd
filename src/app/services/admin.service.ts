import { Injectable } from '@angular/core';

export interface MenuAdmin {
  img: string;
  title: string;
  acciones: Acciones []
}

interface Acciones {
    id: string,
    texto: string
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
          texto: 'Nuevo'
        },
        {
          id: 'delete',
          texto: 'Borrar'
        },
        {
          id: 'update',
          texto: 'Actualizar'
        }
      ]
    },
    {
      img: '../../../assets/images/Icons/salas.svg',
      title: 'Salas',
      acciones:[
        {
          id: 'save',
          texto: 'Nuevo'
        },
        {
          id: 'delete',
          texto: 'Borrar'
        },
        {
          id: 'update',
          texto: 'Actualizar'
        }
      ]
    },
    {
      img: '../../../assets/images/Icons/reservas.svg',
      title: 'Reservas',
      acciones:[ 
        {
          id: 'save',
          texto: 'Nuevo'
        },
        {
          id: 'delete',
          texto: 'Borrar'
        },
        {
          id: 'update',
          texto: 'Actualizar'
        }
      ]
    },
    {
      img: '../../../assets/images/Icons/equipamientos.svg',
      title: 'Equipamientos',
      acciones:[ 
        {
          id: 'save',
          texto: 'Nuevo'
        },
        {
          id: 'delete',
          texto: 'Borrar'
        },
        {
          id: 'update',
          texto: 'Actualizar'
        }
      ]
    },
  ];

  constructor() { }

  getMenu() {
    return this.menuAdmin;
  }
}
