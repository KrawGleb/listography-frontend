import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, retry } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorageConstants } from 'src/app/models/constants/local-storage.constants';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

const errorMessages = {
  0: 'Server is not available',
  401: 'Unauthorize',
  403: 'Forbidden',
  404: 'Font found',
  500: 'Internal server error. Please, try again later',
};

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private readonly snackbar: MatSnackBar,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        const status = error.status;
        let errorMessage = '';

        if ((errorMessages as any)[status]) {
          errorMessage = (errorMessages as any)[status];
        }

        if (error.error && (error.error as any).errors) {
          errorMessage = (error.error as any).errors.join('\n');
        }

        if (status === 401 || status === 403) {
          this.authService.logout();
          this.router.navigateByUrl('/login');
        }

        this.snackbar.open(errorMessage, 'Ok', {
          duration: 20000,
          panelClass: ['snackbar'],
        });

        throw error;
      })
    );
  }
}
