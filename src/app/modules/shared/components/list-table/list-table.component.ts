import { Component, Input, OnInit, ɵComponentFactory } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, takeUntil, tap } from 'rxjs';
import { CustomField } from 'src/app/models/custom-field.model';
import { Item } from 'src/app/models/item.model';
import { CommonResponse } from 'src/app/models/responses/common-response.model';
import { ListsService } from 'src/app/modules/shared/services/lists.service';
import { getCustomFieldValue } from 'src/app/helpers/custom-field.helpers';
import { DestroyableComponent } from 'src/app/modules/shared/helpers/destroyable/destroyable.component';
import { ItemDialogComponent } from 'src/app/modules/components/pages/list/update/item-dialog/item-dialog.component';

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.scss'],
})
export class ListTableComponent extends DestroyableComponent implements OnInit {
  @Input() public id!: number;
  @Input() public itemTemplate!: Item;
  @Input() public items!: Item[];
  @Input() public isEdit: boolean = false;

  public columnNames: string[] = [];

  constructor(
    private readonly listsService: ListsService,
    private readonly dialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
    this.columnNames = [
      'id',
      'name',
      ...(this.itemTemplate.customFields.map((f) => f.name) ?? []),
    ];
  }

  public getCustomFieldValue(field: CustomField) {
    return getCustomFieldValue(field);
  }

  public openAddItemDialog() {
    this.dialog
      .open(ItemDialogComponent, {
        data: {
          item: this.itemTemplate,
          edit: false,
        },
      })
      .afterClosed()
      .pipe(
        takeUntil(this.onDestroy$),
        filter((response: any) => !!response),
        tap((newItem: Item) => {
          this.listsService
            .addItem({
              listId: this.id,
              name: newItem.name,
              customFields: newItem.customFields,
            })
            .pipe(
              takeUntil(this.onDestroy$),
              filter((response) => response.succeeded),
              tap((response) => {
                response = response as CommonResponse<Item>;
                this.items.push(response.body as Item);
              })
            )
            .subscribe();
        })
      )
      .subscribe();
  }
}
