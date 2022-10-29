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

  public post<T>(
    url: string,
    body: any,
    includeToken: boolean = false,
    responseType: string = 'json'
  ) {
    return this.http.post<T>(
      HttpConstants.BaseApiUrl + url,
      body,
      this.getPostRequestOptions(includeToken, responseType)
    );
  }

  public delete(url: string, body: any, includeToken: boolean = false) {
    const options = this.getRequestOptions(includeToken) as any;
    options.body = body;

    return this.http.delete(HttpConstants.BaseApiUrl + url, options);
  }

  public patch<T>(url: string, body: any, includeToken: boolean) {
    return this.http.patch<T>(
      HttpConstants.BaseApiUrl + url,
      body,
      this.getRequestOptions(includeToken)
    );
  }

  private getPostRequestOptions(
    includeToken: boolean = false,
    responseType: string = 'json'
  ) {
    const options = this.getRequestOptions(includeToken);
    (options as any).responseType = responseType;

    return options;
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
