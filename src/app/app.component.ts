import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private readonly darkModeClassName = 'dark-theme';

  @HostBinding('class') className = '';

  public onThemeChanged(isDarkMode: boolean) {
    this.className = isDarkMode ? this.darkModeClassName : '';
  }
}
