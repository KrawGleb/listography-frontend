import { SocialAuthService } from '@abacritt/angularx-social-login';
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
  constructor(
    private readonly httpService: HttpService,
    private readonly socialAuthService: SocialAuthService
  ) {}

  public register(request: RegisterRequest) {
    return this.httpService.post('/auth/register', request);
  }

  public login(request: LoginRequest) {
    return this.httpService
      .post('/auth/login', request)
      .pipe(tap((response: any) => this.fillLocalStorage(response)));
  }

  public loginWithGoogle(idToken: string) {
    return this.httpService
      .post('/auth/login-with-google', { idToken })
      .pipe(tap((response: any) => this.fillLocalStorage(response)));
  }

  public isAuthorize() {
    return !!localStorage.getItem(LocalStorageConstants.Token);
  }

  public logout() {
    this.socialAuthService.signOut();

    localStorage.removeItem(LocalStorageConstants.Username);
    localStorage.removeItem(LocalStorageConstants.Token);
    localStorage.removeItem(LocalStorageConstants.IsAdmin);
  }

  private fillLocalStorage(response: any) {
    if (response.succeeded) {
      localStorage.setItem(LocalStorageConstants.Token, response.token);

      localStorage.setItem(LocalStorageConstants.Username, response.username);

      if (response.isAdmin)
        localStorage.setItem(LocalStorageConstants.IsAdmin, response.isAdmin);
    }
  }
}
