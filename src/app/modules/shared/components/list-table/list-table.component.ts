import { Component, Input, OnInit, ɵComponentFactory } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomField } from 'src/app/models/custom-field.model';
import { Item } from 'src/app/models/item.model';
import { getCustomFieldValue } from 'src/app/helpers/custom-field.helpers';
import { DestroyableComponent } from 'src/app/modules/shared/helpers/destroyable/destroyable.component';
import { ListsService } from '../../services/api/lists.service';
import { RouteService } from '../../services/common/route.service';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { filter, takeUntil, tap } from 'rxjs';
import { CustomFieldType } from 'src/app/models/enums/custom-field-type.enum';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { List } from 'src/app/models/list.model';

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.scss'],
})
export class ListTableComponent extends DestroyableComponent {
  private _list?: List;
  private _itemTemplate?: Item;

  @Input() public id!: number;
  @Input() public items!: Item[];
  @Input() public isEdit: boolean = false;

  @Input()
  public get itemTemplate(): Item | undefined {
    return this._itemTemplate;
  }
  public set itemTemplate(value: Item | undefined) {
    if (value) {
      this._itemTemplate = value;

      const filteredFields = this.filterTableFields(
        this._itemTemplate.customFields
      );

      this.columnNames = [...(filteredFields.map((f) => f.name) ?? [])];
    }
  }

  @Input()
  public get list(): List | undefined {
    return this._list;
  }
  public set list(value: List | undefined) {
    if (value) {
      this._list = value;

      this.itemTemplate = value.itemTemplate;
      this.items = value.items;
    }
  }

  public columnNames: string[] = [];

  constructor(
    private readonly routerService: RouteService,
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly listsService: ListsService,
    private readonly datePipe: DatePipe
  ) {
    super();
  }

  public getCustomFieldValue(field: CustomField) {
    let value = getCustomFieldValue(field);

    if (field.type === CustomFieldType.DateTimeType) {
      value = this.datePipe.transform(value?.toString());
    }

    return value;
  }

  public addItem() {
    this.routerService.pushData({
      listId: this.id,
      template: this.itemTemplate,
    });

    this.router.navigateByUrl('/item/new');
  }

  public deleteItem(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'Item.Actions.Delete.ConfirmationTitle',
        message: 'Item.Actions.Delete.ConfirmationMessage',
      },
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((res) => res),
        takeUntil(this.onDestroy$),
        tap(() => {
          this.listsService
            .deleteItem(id)
            .pipe(
              takeUntil(this.onDestroy$),
              tap(() => (this.items = this.items.filter((i) => i.id !== id)))
            )
            .subscribe();
        })
      )
      .subscribe();
  }

  public editItem(item: Item) {
    this.routerService.pushData({
      listId: this.id,
      item: item,
      isEdit: true,
    });

    this.router.navigateByUrl(`/item/edit/${item.id}`);
  }

  public filterTableFields(fields: CustomField[]) {
    return fields.filter((f) => {
      const type = f.type;

      return [
        CustomFieldType.StringType,
        CustomFieldType.DateTimeType,
        CustomFieldType.SelectType,
      ].some((t) => t === type);
    });
  }
}
