import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { List } from 'src/app/models/list.model';
import { CustomField } from 'src/app/models/custom-field.model';
import { Item } from 'src/app/models/item.model';
import { CustomFieldType } from 'src/app/models/enums/custom-field-type.enum';
import { DestroyableComponent } from '../../../../shared/helpers/destroyable/destroyable.component';
import { takeUntil, tap } from 'rxjs';
import { SaveListInfoRequest } from 'src/app/models/requests/list/save-info.request';
import { Router } from '@angular/router';
import { ListsService } from 'src/app/modules/shared/services/api/lists.service';
import { GlobalSpinnerService } from 'src/app/modules/shared/components/spinner/global-spinner.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class ListCreateComponent extends DestroyableComponent {
  public itemTemplateControls: FormGroup[] = [];
  public CustomFieldTypes = CustomFieldType;

  constructor(
    private readonly listsService: ListsService,
    private readonly router: Router,
    private readonly spinnerService: GlobalSpinnerService
  ) {
    super();
  }

  public addCustomField() {
    const group = new FormGroup({
      name: new FormControl(''),
      type: new FormControl(''),
      order: new FormControl(this.itemTemplateControls.length),
    });

    this.itemTemplateControls.push(group);
  }

  public removeCustomField(field: FormGroup) {
    this.itemTemplateControls = this.itemTemplateControls.filter(
      (f) => f !== field
    );
  }

  public onSave(request: SaveListInfoRequest) {
    this.createList(request);
  }

  private createList(listInfo: SaveListInfoRequest) {
    const customFields = this.itemTemplateControls.map((control) => {
      return {
        name: control.value.name,
        type: control.value.type,
        order: control.value.order,
      } as CustomField;
    });

    const list = {
      title: listInfo.title,
      description: listInfo.description,
      imageUrl: listInfo.imageUrl,
      topic: listInfo.topic,
      itemTemplate: {
        customFields: customFields,
      } as Item,
    } as List;

    let createList$ = this.listsService.create(list);

    this.spinnerService
      .wrap(createList$)
      .pipe(
        takeUntil(this.onDestroy$),
        tap(() => this.router.navigateByUrl('/me'))
      )
      .subscribe();
  }
}
