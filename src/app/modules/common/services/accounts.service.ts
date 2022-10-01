import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Account } from 'src/app/models/account.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  constructor(private readonly httpService: HttpService) {}

  public getMe() {
    return this.httpService
      .get<Account>('/accounts/me', true)
      .pipe(tap((response) => console.log(response as Account)));
  }
}
