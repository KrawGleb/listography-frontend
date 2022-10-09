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

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.scss'],
})
export class ListTableComponent extends DestroyableComponent implements OnInit {
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

      this.columnNames = [
        'id',
        'name',
        ...(this._itemTemplate.customFields.map((f) => f.name) ?? []),
      ];
    }
  }

  private _itemTemplate?: Item;

  public columnNames: string[] = [];

  constructor(
    private readonly routerService: RouteService,
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly listsService: ListsService
  ) {
    super();
  }

  ngOnInit(): void {}

  public getCustomFieldValue(field: CustomField) {
    return getCustomFieldValue(field);
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
      isEdit: true
    });

    this.router.navigateByUrl(`/item/edit/${item.id}`);
  }
}
