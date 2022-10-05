import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil, tap } from 'rxjs';
import { checkPasswords } from 'src/app/helpers/repeat-password-validation.helper';
import { RegisterRequest } from 'src/app/models/requests/register.request';
import { AuthService } from 'src/app/modules/common/auth/services/auth.service';
import { DestroyableComponent } from '../../helpers/destroyable/destroyable.component';

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
        Validators.pattern('[a-zA-Zd]+'),
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
    private readonly snackBar: MatSnackBar
  ) {
    super();
  }

  public register() {
    const request = {
      email: this.form.value.email,
      username: this.form.value.username,
      password: this.form.value.password,
    } as RegisterRequest;

    this.authService
      .register(request)
      .pipe(
        takeUntil(this.onDestroy$),
        tap((response: any) => {
          console.log(response);
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
    this.authService
      .login({
        email: email,
        password: password,
      })
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
