import { Component, EventEmitter, Output } from '@angular/core';
import { DestroyableComponent } from '../../helpers/destroyable/destroyable.component';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageConstants } from 'src/app/models/constants/local-storage.constants';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends DestroyableComponent {
  public form = new FormGroup({
    search: new FormControl()
  });

  @Output() public onThemeChanged = new EventEmitter<boolean>();

  constructor(
    private readonly translateService: TranslateService,
    private readonly authService: AuthService,
    private readonly router: Router
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

  public signOut() {
    localStorage.removeItem(LocalStorageConstants.Token);
    this.router.navigateByUrl('/login');
  }

  public search() {
    if (this.form.value.search)
    {
      // this.router.navigate(['/search', this.form.value.search]);
      this.router.navigateByUrl(`/search/${this.form.value.search}`);
    }
  }
}
