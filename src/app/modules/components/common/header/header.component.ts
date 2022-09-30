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
  public themeToggleControl = new FormControl(false);
  public isSubMenuOpen: boolean = false;

  @Output()
  public onThemeChanged = new EventEmitter<boolean>();

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.themeToggleControl.valueChanges
      .pipe(
        takeUntil(this.onDestroy$),
        tap((value) => this.onThemeChanged.emit(!!value))
      )
      .subscribe();
  }

  public subMenuClick() {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }
}
