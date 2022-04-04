import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { catchError, concatMap, tap } from 'rxjs/operators';

import { ErrorComponent } from './shared/error/error.component';
import { environment } from 'src/environments/environment';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  errorDialog: MatDialogRef<ErrorComponent>;
  API_KEY = environment.apiKey;

  constructor(private dialog: MatDialog) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(request).pipe(
      catchError((httpError: HttpErrorResponse) => {
        if (httpError.status === 401) {
          throwError(httpError);
        } else if (httpError.status === 404) {
          throwError(httpError);
        } else if (httpError.status === 409) {
          throwError(httpError);
        } else if (httpError.status === 409) {
          throwError(httpError);
        }
        const retry = httpError.status >= 500 || httpError.status === 0;
        if (!this.errorDialog) {
          this.errorDialog = this.dialog.open(ErrorComponent, {
            data: {
              message: httpError.error.message,
              code: httpError.status,
              url: httpError.url,
              body: request.body,
              retry,
            },
            disableClose: true,
          });
        }
        return this.errorDialog.afterClosed().pipe(
          tap(() => (this.errorDialog = undefined)),
          concatMap(() => next.handle(request))
        );
      })
    );
  }
}
