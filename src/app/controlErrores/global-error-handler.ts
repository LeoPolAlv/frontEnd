import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../services/errors/error.service';
import { LoggingService } from '../services/errors/logging.service';
import { NotificadorErrorService } from '../services/errors/notificador-error.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler{
    
    constructor(
        private injector: Injector
    ) { }
    
    handleError(error: Error | HttpErrorResponse): void {
        const errorService = this.injector.get(ErrorService);
        const logger = this.injector.get(LoggingService);
        const notifier = this.injector.get(NotificadorErrorService);
    
        let message;
        let stackTrace;
        console.log('Estamos en control global de errores');
        if (error instanceof HttpErrorResponse) {
          // Server error
          message = errorService.getServerErrorMessage(error);
          //stackTrace = errorService.getServerErrorStackTrace(error);
          notifier.showError(message);
        } else {
          // Client Error
          message = errorService.getClientErrorMessage(error);
          notifier.showError(message);
        }
        // Always log errors
        //logger.logError(message, stackTrace);
        logger.logError(message,'stack');
        console.error(error);
    }
}
