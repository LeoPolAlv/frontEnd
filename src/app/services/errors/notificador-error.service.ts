import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotificadorErrorService {

  constructor(
    private messageService: MessageService
  ) { }

  showError(message: string): void{
    console.log('Estamos en show error');
    this.messageService.add({key: 'tc', severity:'warn', summary: 'Warn', detail: 'Message Content'});
  }
}
