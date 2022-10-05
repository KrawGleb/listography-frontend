import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, tap } from 'rxjs';
import { Account } from 'src/app/models/account.model';
import { List } from 'src/app/models/list.model';
import { AccountsService } from 'src/app/modules/common/services/accounts.service';
import { DestroyableComponent } from '../../../helpers/destroyable/destroyable.component';

@Component({
  selector: 'app-foreign-account',
  templateUrl: './foreign-account.component.html',
  styleUrls: ['./foreign-account.component.scss'],
})
export class ForeignAccountComponent extends DestroyableComponent {
  private username!: string;
  public lists!: List[];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly accountsService: AccountsService
  ) {
    super();

    this.username = this.route.snapshot.paramMap.get('username')!;

    this.accountsService.getAccountLists(this.username).pipe(
      takeUntil(this.onDestroy$),
      tap((response) => (this.lists = response))
    )
    .subscribe();
  }
}
