import { Injectable } from '@angular/core';

@Injectable()
export class RouteService {
  private dataStack: any[] = [];
  private returnUrlsStack: string[] = [];

  public pushData(data: any) {
    this.dataStack.push(data);
  }

  public popData() {
    return this.dataStack.pop();
  }

  public pushReturnUrl(url: string) {
    this.returnUrlsStack.push(url);
  }

  public popReturnUrl() {
    return this.returnUrlsStack.pop();
  }
}
