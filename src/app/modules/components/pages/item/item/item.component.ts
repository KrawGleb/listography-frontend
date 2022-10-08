import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, takeUntil, tap } from 'rxjs';
import { getRandomColor } from 'src/app/helpers/random-color.helper';
import { Item } from 'src/app/models/item.model';
import { DestroyableComponent } from 'src/app/modules/shared/helpers/destroyable/destroyable.component';
import { ListsService } from 'src/app/modules/shared/services/api/lists.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent extends DestroyableComponent {
  private id!: number;

  public item?: Item;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly listsService: ListsService
  ) {
    super();

    this.id = +this.route.snapshot.paramMap.get('id')!;

    this.listsService
      .getItem(this.id)
      .pipe(
        takeUntil(this.onDestroy$),
        map((response) => response.body),
        tap((item) => (this.item = item))
      )
      .subscribe();
  }

  public getRandomColor = getRandomColor;
}
