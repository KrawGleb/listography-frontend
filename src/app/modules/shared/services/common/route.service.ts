import { Injectable } from '@angular/core';

@Injectable()
export class RouteService {
  private dataStack: any[] = [];

  public pushData (data: any) {
    this.dataStack.push(data);
  }

  public popData() {
    return this.dataStack.pop();
  }
}
