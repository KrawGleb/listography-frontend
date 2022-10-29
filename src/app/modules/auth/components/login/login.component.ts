import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { filter, Observable, takeUntil, tap } from 'rxjs';
import { AuthProviders } from 'src/app/models/enums/auth-providers.enum';
import { LoginRequest } from 'src/app/models/requests/login.request';
import { DestroyableComponent } from '../../../shared/helpers/destroyable/destroyable.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends DestroyableComponent {
  public hidePassword: boolean = true;

  public form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private readonly socialAuthService: SocialAuthService
  ) {
    super();

    this.socialAuthService.authState
      .pipe(
        takeUntil(this.onDestroy$),
        filter((user) => !!user),
        tap((user) => this.loginWithExternalService(user))
      )
      .subscribe();
  }

  public login() {
    if (this.form.valid) {
      const request = {
        email: this.form.value.email,
        password: this.form.value.password,
      } as LoginRequest;

      this.authService
        .login(request)
        .pipe(
          takeUntil(this.onDestroy$),
          tap((response: any) => this.redirectOnSuccessResponse(response))
        )
        .subscribe();
    }
  }

  public hasError(controlName: string, error: string) {
    return (this.form.controls as any)[controlName].hasError(error);
  }

  private loginWithExternalService(user: SocialUser) {
    let login$: Observable<any>;

    switch (user.provider) {
      case AuthProviders.Google:
        login$ = this.authService.loginWithGoogle(user.idToken);
        break;
      default:
        throw new Error('Unknown auth provider');
    }

    login$!
      .pipe(
        takeUntil(this.onDestroy$),
        tap((response: any) => this.redirectOnSuccessResponse(response))
      )
      .subscribe();
  }

  private redirectOnSuccessResponse(response: any) {
    if (response.succeeded) {
      this.router.navigateByUrl('/home');
    } else if (response.errors) {
      this.showErrors(response.errors);
    }
  }

  private showErrors(errors: string[]) {
    const message = errors[0];
    this.snackBar.open(message, 'Ok', {
      duration: 2000,
    });
  }
}
