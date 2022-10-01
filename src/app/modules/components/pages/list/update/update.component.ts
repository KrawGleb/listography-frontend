import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, tap } from 'rxjs';
import { CustomFieldType } from 'src/app/models/enums/custom-field-type.enum';
import { Item } from 'src/app/models/item.model';
import { List } from 'src/app/models/list.model';
import { ListsService } from 'src/app/modules/common/services/lists.service';
import { DestroyableComponent } from '../../../helpers/destroyable/destroyable.component';
import { NewItemDialogComponent } from './new-item-dialog/new-item-dialog.component';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class ListUpdateComponent extends DestroyableComponent {
  private id!: number;
  public list?: List;
  public columnNames: string[] = [];
  public items: any[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly listsService: ListsService,
    private readonly dialog: MatDialog
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
        })
      )
      .subscribe();
  }

  ngOnInit(): void {}

  public getColumnValue(element: Item, column: string) {
    if (column === 'id' || column === 'name') {
      return element[column];
    }

    const field = element.customFields.find((f) => f.name == column);

    switch (field?.type) {
      case CustomFieldType.StringType:
        return field.stringValue;
      case CustomFieldType.BoolType:
        return field.boolValue;
      case CustomFieldType.IntType:
        return field.intValue;
      case CustomFieldType.DateTimeType:
        return field.dateTimeValue?.toString().split('T')[0]; // TODO: Fix it
      default:
        return '';
    }
  }

  public openAddDialog() {
    this.dialog
      .open(NewItemDialogComponent, {
        data: {
          itemTemplate: this.list?.itemTemplate,
        },
      })
      .afterClosed()
      .pipe(
        tap((newItem: Item) => {
          this.listsService
            .addItem({
              listId: this.id,
              name: newItem.name,
              customFields: newItem.customFields,
            })
            .subscribe();
          this.items.push(newItem);
        })
      )
      .subscribe();
  }

  private setList(list: List) {
    console.log(list);
    this.list = list;

    this.columnNames = [
      'id',
      'name',
      ...(list.itemTemplate?.customFields.map((f) => f.name) ?? []),
    ];
  }
}
