import {
  Component,
  EventEmitter,
  HostBinding,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { DestroyableComponent } from '../helpers/destroyable/destroyable.component';
import { filter, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends DestroyableComponent implements OnInit {
  @Output()
  public onThemeChanged = new EventEmitter<boolean>();

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  public toggleTheme(isDarkMode: boolean = false) {
    this.onThemeChanged.emit(isDarkMode);
  }
}
