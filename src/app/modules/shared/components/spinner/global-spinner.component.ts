import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { takeUntil } from 'rxjs';
import { hideTransparentAnimation } from '../../animations';
import { GlobalSpinnerService } from './global-spinner.service';
import { SpinnerComponent } from './spinner.component';

@Component({
  selector: 'app-global-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      .spinner-overlay {
        position: fixed;
      }
    `,
  ],
  animations: [hideTransparentAnimation()]
})
export class GlobalSpinnerComponent extends SpinnerComponent {

  public constructor(
    private readonly globalSpinnerService: GlobalSpinnerService
  ) {
    super();

    this.globalSpinnerService.configuration$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((spinnerConfig) => {
        spinnerConfig.shouldShow ? this.show(spinnerConfig.text) : this.hide();
      });
  }
}
