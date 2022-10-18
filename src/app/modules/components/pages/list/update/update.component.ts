import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil, tap } from 'rxjs';
import { List } from 'src/app/models/list.model';
import { SaveListInfoRequest } from 'src/app/models/requests/list/save-info.request';
import { GlobalSpinnerService } from 'src/app/modules/shared/components/spinner/global-spinner.service';
import { ListsService } from 'src/app/modules/shared/services/api/lists.service';
import { DestroyableComponent } from '../../../../shared/helpers/destroyable/destroyable.component';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class ListUpdateComponent extends DestroyableComponent {
  public id!: number;
  public list!: List;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly listsService: ListsService,
    private readonly spinnerService: GlobalSpinnerService
  ) {
    super();

    this.id = +this.route.snapshot.paramMap.get('id')!;

    this.spinnerService
      .wrap(this.listsService.get(this.id))
      .pipe(
        takeUntil(this.onDestroy$),
        tap((list: List) => (this.list = list))
      )
      .subscribe();
  }

  public saveChanges(info: SaveListInfoRequest) {
    this.spinnerService
      .wrap(this.listsService.updateInfo(info))
      .pipe(
        takeUntil(this.onDestroy$),
        tap(() => this.router.navigateByUrl('/me'))
      )
      .subscribe();
  }
}
