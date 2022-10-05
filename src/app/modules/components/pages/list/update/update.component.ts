import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, tap } from 'rxjs';
import { List } from 'src/app/models/list.model';
import { ListsService } from 'src/app/modules/common/services/lists.service';
import { DestroyableComponent } from '../../../helpers/destroyable/destroyable.component';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class ListUpdateComponent extends DestroyableComponent {
  public id!: number;
  public list!: List;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly listsService: ListsService
  ) {
    super();

    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.listsService
      .get(this.id)
      .pipe(
        takeUntil(this.onDestroy$),
        tap((list: List) => (this.list = list))
      )
      .subscribe();
  }
}
