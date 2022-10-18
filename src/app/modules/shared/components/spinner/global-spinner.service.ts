import { Injectable } from '@angular/core';
import { BehaviorSubject, defer, finalize, Observable } from 'rxjs';

export interface SpinnerConfig {
  shouldShow: boolean;
  text?: string;
}

@Injectable()
export class GlobalSpinnerService {
  private _configuration$ = new BehaviorSubject<SpinnerConfig>({
    shouldShow: false,
  });

  public configuration$ = this._configuration$.asObservable();

  public get configuration() {
    return this._configuration$.value;
  }

  public show = (text?: string) => {
    this._configuration$.next({ shouldShow: true, text });
  };

  public hide = () => {
    this._configuration$.next({ shouldShow: false });
  };

  public wrap<T>(observable: Observable<T>, text?: string): Observable<T> {
    return defer(() => {
      this.show(text);
      return observable.pipe(finalize(() => this.hide()));
    });
  }
}
