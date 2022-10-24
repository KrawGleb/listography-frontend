import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageConstants } from './models/constants/local-storage.constants';
import { AuthService } from './modules/auth/services/auth.service';
import { SignalRService } from './modules/shared/services/common/signal-r.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private readonly darkModeClassName = 'dark-theme';

  @HostBinding('class') className = '';

  constructor(
    private readonly signalRService: SignalRService,
    private readonly authService: AuthService,
    private readonly router: Router) {
    this.signalRService.startConnection();
    this.signalRService.addListener('logout_user', (username: string) => {
      const currentUser = localStorage.getItem(LocalStorageConstants.Username);

      console.log(currentUser);

      if (currentUser === username)
      {
        this.authService.logout();
        this.router.navigateByUrl('/login');
      }
    })

  }

  public onThemeChanged(isDarkMode: boolean) {
    this.className = isDarkMode ? this.darkModeClassName : '';
  }
}
