import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { takeUntil, tap } from 'rxjs';
import { checkPasswords } from 'src/app/helpers/repeat-password-validation.helper';
import { RegisterRequest } from 'src/app/models/requests/register.request';
import { GlobalSpinnerService } from 'src/app/modules/shared/components/spinner/global-spinner.service';
import { notAllowedChars } from 'src/app/modules/shared/validators/not-allowed-chars.validator';
import { DestroyableComponent } from '../../../shared/helpers/destroyable/destroyable.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends DestroyableComponent {
  public hidePassword = true;
  public hideRepeatPassword = true;

  public form = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [
        Validators.required,
        notAllowedChars(' .'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      repeatPassword: new FormControl('', [Validators.required]),
    },
    { validators: [checkPasswords] }
  );

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private readonly spinnerService: GlobalSpinnerService
  ) {
    super();
  }

  public register() {
    const request = {
      email: this.form.value.email,
      username: this.form.value.username,
      password: this.form.value.password,
    } as RegisterRequest;

    const register$ = this.authService.register(request);
    this.spinnerService
      .wrap(register$)
      .pipe(
        takeUntil(this.onDestroy$),
        tap((response: any) => {
          if (response.succeeded) {
            this.login(request.email, request.password);
          } else if (response.errors) {
            this.showErrors(response.errors);
          }
        })
      )
      .subscribe();
  }

  public hasError(controlName: string, error: string) {
    return (this.form.controls as any)[controlName].hasError(error);
  }

  private login(email: string, password: string) {
    const login$ = this.authService.login({
      email: email,
      password: password,
    });

    this.spinnerService
      .wrap(login$)
      .pipe(
        takeUntil(this.onDestroy$),
        tap(() => {
          this.router.navigateByUrl('/home');
        })
      )
      .subscribe();
  }

  private showErrors(errors: string[]) {
    const message = errors[0];
    this.snackBar.open(message, 'Ok', {
      duration: 2000,
    });
  }
}
