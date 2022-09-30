import { Component, EventEmitter, Output } from '@angular/core';
import { DestroyableComponent } from '../../helpers/destroyable/destroyable.component';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/modules/common/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends DestroyableComponent {
  @Output()
  public onThemeChanged = new EventEmitter<boolean>();

  constructor(
    private readonly translateService: TranslateService,
    private readonly authService: AuthService
  ) {
    super();
  }

  get isAuthorize() {
    return this.authService.isAuthorize();
  }

  public toggleTheme(isDarkMode: boolean = false) {
    this.onThemeChanged.emit(isDarkMode);
  }

  public toggleLanguage(language: string) {
    this.translateService.use(language);
  }
}
