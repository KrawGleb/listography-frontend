import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HttpConstants } from 'src/app/models/constants/http.constants';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;

  constructor() {}

  public startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(HttpConstants.SignalRHub)
      .build();

    this.hubConnection.start();
  }

  public addListener(key: string, fn: (data?: any) => void) {
    this.hubConnection.on(key, fn);
  }
}
