import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, tap } from 'rxjs';
import { List } from 'src/app/models/list.model';
import { ListsService } from 'src/app/modules/common/services/lists.service';
import { DestroyableComponent } from '../../../helpers/destroyable/destroyable.component';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ListViewComponent extends DestroyableComponent implements OnInit {
  private id!: number;
  public list?: List;
  public columnNames: string[] = [];
  public items: any[] = [];

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
          this.setList(list);
          this.items = this.list?.items ?? [];
          console.log(this.items);
        })
      )
      .subscribe();
  }

  ngOnInit(): void {}

  public getColumnValue(element: any, column: string) {
    return '';
  }

  private setList(list: List) {
    this.list = list;
    this.columnNames = [
      'id',
      'name',
      ...list.itemTemplate?.customFields.map((f) => f.name) ?? [],
    ];
  }
}
