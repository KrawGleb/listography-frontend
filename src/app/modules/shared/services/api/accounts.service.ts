import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Account } from 'src/app/models/account.model';
import { List } from 'src/app/models/list.model';
import { CommonResponse } from 'src/app/models/responses/common-response.model';
import { HttpService } from '../common/http.service';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  constructor(private readonly httpService: HttpService) {}

  public getMe(): Observable<Account> {
    return this.httpService
      .get<CommonResponse<Account>>('/accounts/me', true)
      .pipe(map((response) => response.body));
  }

  public getAccountLists(username: string): Observable<List[]> {
    return this.httpService
      .get<CommonResponse<List[]>>(`/accounts/${username}`, false)
      .pipe(map((response) => response.body));
  }
}
