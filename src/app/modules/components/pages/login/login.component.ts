import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, takeUntil, tap } from 'rxjs';
import { LoginRequest } from 'src/app/models/requests/login.request';
import { AuthService } from 'src/app/modules/common/auth/services/auth.service';
import { DestroyableComponent } from '../../helpers/destroyable/destroyable.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends DestroyableComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router) {
    super();
  }

  ngOnInit(): void {}

  public form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

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
          filter((response: any) => response.succeeded),
          tap((response) => {
            this.router.navigateByUrl('/home');
          })
        )
        .subscribe();
    }
  }
}
