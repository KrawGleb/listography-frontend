import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, tap } from 'rxjs';
import { LocalStorageConstants } from 'src/app/models/constants/local-storage.constants';
import { List } from 'src/app/models/list.model';
import { GlobalSpinnerService } from 'src/app/modules/shared/components/spinner/global-spinner.service';
import { AccountsService } from 'src/app/modules/shared/services/api/accounts.service';
import { DestroyableComponent } from '../../../../shared/helpers/destroyable/destroyable.component';

@Component({
  selector: 'app-foreign-account',
  templateUrl: './foreign-account.component.html',
  styleUrls: ['./foreign-account.component.scss'],
})
export class ForeignAccountComponent extends DestroyableComponent {
  public username!: string;
  public lists!: List[];
  public isAdmin = !!localStorage.getItem(LocalStorageConstants.IsAdmin);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly accountsService: AccountsService,
    private readonly spinnerService: GlobalSpinnerService
  ) {
    super();

    this.username = this.route.snapshot.paramMap.get('username')!;

    this.spinnerService
      .wrap(this.accountsService.getAccountLists(this.username))
      .pipe(
        takeUntil(this.onDestroy$),
        tap((response) => (this.lists = response))
      )
      .subscribe();
  }
}
