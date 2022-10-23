import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { LocalStorageConstants } from 'src/app/models/constants/local-storage.constants';
import { LoginRequest } from 'src/app/models/requests/login.request';
import { RegisterRequest } from 'src/app/models/requests/register.request';
import { HttpService } from '../../shared/services/common/http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  public register(request: RegisterRequest) {
    return this.httpService.post('/auth/register', request);
  }

  public login(request: LoginRequest) {
    return this.httpService.post('/auth/login', request).pipe(
      tap((response: any) => {
        if (response.succeeded) {
          localStorage.setItem(LocalStorageConstants.Token, response.token);

          localStorage.setItem(
            LocalStorageConstants.Username,
            response.username
          );

          if (response.isAdmin)
            localStorage.setItem(
              LocalStorageConstants.IsAdmin,
              response.isAdmin
            );
        }
      })
    );
  }

  public isAuthorize() {
    return !!localStorage.getItem(LocalStorageConstants.Token);
  }

  public logout() {
    localStorage.removeItem(LocalStorageConstants.Username);
    localStorage.removeItem(LocalStorageConstants.Token);
    localStorage.removeItem(LocalStorageConstants.IsAdmin);
  }
}
