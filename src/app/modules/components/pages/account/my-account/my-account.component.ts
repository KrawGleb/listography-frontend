import { Component, OnInit } from '@angular/core';
import { takeUntil, tap } from 'rxjs';
import { Account } from 'src/app/models/account.model';
import { List } from 'src/app/models/list.model';
import { GlobalSpinnerService } from 'src/app/modules/shared/components/spinner/global-spinner.service';
import { AccountsService } from 'src/app/modules/shared/services/api/accounts.service';
import { DestroyableComponent } from '../../../../shared/helpers/destroyable/destroyable.component';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent extends DestroyableComponent {
  public account!: Account;
  public lists!: List[];

  constructor(
    private readonly accountsService: AccountsService,
    private readonly spinnerService: GlobalSpinnerService
  ) {
    super();

    const me$ = this.accountsService.getMe();
    this.spinnerService
      .wrap(me$)
      .pipe(
        takeUntil(this.onDestroy$),
        tap((account) => {
          this.account = account;
          this.lists = account.lists;
        })
      )
      .subscribe();
  }
}
