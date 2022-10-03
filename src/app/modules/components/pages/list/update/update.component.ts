import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil, tap } from 'rxjs';
import { CustomFieldType } from 'src/app/models/enums/custom-field-type.enum';
import { Item } from 'src/app/models/item.model';
import { List } from 'src/app/models/list.model';
import { UpdateListInfoRequest } from 'src/app/models/requests/list/update-info.request';
import { Tag } from 'src/app/models/tag.model';
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

  public form = new FormGroup({
    topic: new FormControl(),
    title: new FormControl(),
    description: new FormControl(),
    imageUrl: new FormControl(),
    tag: new FormControl(),
  });
  public tags: string[] = [];

  public list?: List;
  public columnNames: string[] = [];
  public items: any[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
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

  public getImageUrl() {
    return this.form.value.imageUrl;
  }

  public removeTag(tag: string) {
    this.tags = this.tags.filter((t) => t !== tag);
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

  public addTag() {
    const tag = this.form.value.tag;

    if (tag && this.tags.indexOf(tag) < 0) {
      this.tags.push(tag);
    }
    this.form.controls.tag.setValue('');
  }

  public saveListInfo() {
    const info = {
      id: this.id,
      title: this.form.value.title,
      description: this.form.value.description,
      imageUrl: this.form.value.imageUrl,
      tags: this.tags.map((t) => ({ name: t } as Tag)),
      topic: { name: this.form.value.topic },
    } as UpdateListInfoRequest;

    this.listsService.updateInfo(info)
      .pipe(
        takeUntil(this.onDestroy$),
        tap(() => this.router.navigateByUrl('/me')))
      .subscribe();
  }

  private setList(list: List) {
    this.form.setValue({
      topic: list.topic,
      title: list.title,
      description: list.description,
      imageUrl: list.imageUrl,
      tag: '',
    });

    this.tags = list.tags.map((tag) => tag.name);
    this.list = list;

    this.columnNames = [
      'id',
      'name',
      ...(list.itemTemplate?.customFields.map((f) => f.name) ?? []),
    ];
  }
}
