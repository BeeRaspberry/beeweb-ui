import { Injectable } from '@angular/core';
import { ErrorDialogService } from '../dialogs/error-dialog/error-dialog.service';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(public errorDialogService: ErrorDialogService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem('token');

    if (token) {
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }

    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log(event);
                    // this.errorDialogService.openDialog(event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        let reason: String = '';
        if (error) {
          if (error.statusText) {
             reason = error.statusText;
          }
          if (error.message) {
            reason = error.message;
          }

          if (error.error.errors) {
            for (error of error.error.errors) {
              reason += error + "\n"
            }
              
          }
        }
        let data = {
          reason: reason,
          status: error.status
        };
        console.log(data);
        this.errorDialogService.openDialog(data);
        return throwError(error);
      }));
  }
}
