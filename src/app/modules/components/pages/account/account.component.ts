import { Component, OnInit } from '@angular/core';
import { takeUntil, tap } from 'rxjs';
import { Account } from 'src/app/models/account.model';
import { List } from 'src/app/models/list.model';
import { AccountsService } from 'src/app/modules/common/services/accounts.service';
import { DestroyableComponent } from '../../helpers/destroyable/destroyable.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent extends DestroyableComponent implements OnInit {
  public account!: Account;
  public lists!: List[];

  constructor(private readonly accountsService: AccountsService) {
    super();
    this.accountsService
      .getMe()
      .pipe(
        takeUntil(this.onDestroy$),
        tap((account) => {
          this.account = account;
          this.lists = account.lists;
        })
      )
      .subscribe();
  }

  ngOnInit(): void {}
}
