import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { LocalStorageConstants } from 'src/app/models/constants/local-storage.constants';
import { LoginRequest } from 'src/app/models/requests/login.request';
import { RegisterRequest } from 'src/app/models/requests/register.request';
import { HttpService } from '../../services/http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  public register(request: RegisterRequest) {
    return this.httpService.post('/auth/register', request);
  }

  public login(request: LoginRequest) {
    return this.httpService
      .post('/auth/login', request)
      .pipe(
        tap((response) =>
          localStorage.setItem(LocalStorageConstants.Token, response as string)
        )
      );
  }
}
