import { Component, HostBinding, OnInit } from '@angular/core';
import { BehaviorSubject, debounce, takeUntil, tap, timer } from 'rxjs';
import { hideTransparentAnimation } from '../../animations';
import { DestroyableComponent } from '../../helpers/destroyable/destroyable.component';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  animations: [hideTransparentAnimation()],
})
export class SpinnerComponent extends DestroyableComponent {
  private _state$ = new BehaviorSubject<boolean>(false);
  private _text$ = new BehaviorSubject<string>('');
  private counter = 0;
  private isShownValue = false;

  @HostBinding('class.spinner-wrapper') public wrapperClass = true;
  @HostBinding('@hideTransparent') public get isHostHidden() {
    return !this.isShownValue;
  }

  public text$ = this._text$.asObservable();
  public isShow = this._state$.pipe(
    debounce((value) => timer(value ? 0 : 100)),
    takeUntil(this.onDestroy$),
    tap((value) => (this.isShownValue = value))
  );

  constructor() {
    super();

    this.onDestroy$.subscribe(() => {
      this._state$.complete();
      this._text$.complete();
    });
  }

  public show(text?: string) {
    if (text != null) {
      this._text$.next(text);
    }

    if (++this.counter > 0) {
      this._state$.next(true);
    }
  }

  public hide() {
    if (--this.counter === 0) {
      this._state$.next(false);
      this._text$.next('');
    }

    if (this.counter < 0) {
      this.counter = 0;
    }
  }
}
