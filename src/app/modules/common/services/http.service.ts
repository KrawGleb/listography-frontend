import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpConstants } from 'src/app/models/constants/http.constants';
import { LocalStorageConstants } from 'src/app/models/constants/local-storage.constants';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private readonly http: HttpClient) {}

  public get<T>(url: string, includeToken: boolean = false) {
    return this.http.get<T>(
      HttpConstants.BaseApiUrl + url,
      this.getRequestOptions(includeToken)
    );
  }

  public post<T>(url: string, body: any, includeToken: boolean = false) {
    return this.http.post<T>(
      HttpConstants.BaseApiUrl + url,
      body,
      this.getRequestOptions(includeToken)
    );
  }

  private getRequestOptions(includeToken: boolean = false) {
    return includeToken ? { headers: this.getTokenHeader() } : {};
  }

  private getTokenHeader() {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem(
        LocalStorageConstants.Token
      )}`,
    });
  }
}
