import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpConstants } from 'src/app/models/constants/http.constants';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private readonly http: HttpClient) {}

  public get<T>(url: string) {
    return this.http.get<T>(HttpConstants.BaseApiUrl + url)
  }

  public post<T>(url: string, body: any) {
    return this.http.post<T>(HttpConstants.BaseApiUrl + url, body);
  }
}
