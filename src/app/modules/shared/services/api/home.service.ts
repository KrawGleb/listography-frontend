import { Injectable } from '@angular/core';
import { HttpService } from '../common/http.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private readonly httpService: HttpService) {}

  public getHomeInfo() {
    return this.httpService.get('/home');
  }
}
