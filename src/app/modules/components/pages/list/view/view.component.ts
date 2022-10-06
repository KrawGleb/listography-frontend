import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, tap } from 'rxjs';
import { List } from 'src/app/models/list.model';
import { ListsService } from 'src/app/modules/shared/services/lists.service';
import { DestroyableComponent } from '../../../../shared/helpers/destroyable/destroyable.component';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ListViewComponent extends DestroyableComponent {
  private id!: number;
  public list?: List;

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
        tap((list: List) => {
          this.list = list;
        })
      )
      .subscribe();
  }
}
