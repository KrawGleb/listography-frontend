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
import { SelectOption } from 'src/app/models/select-option.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class ListCreateComponent extends DestroyableComponent {
  public CustomFieldTypes = CustomFieldType;

  public customFields: FormGroup[] = [];
  public selectTemplates: {
    customField: FormGroup;
    options: FormGroup[];
  }[] = [];

  constructor(
    private readonly listsService: ListsService,
    private readonly router: Router,
    private readonly spinnerService: GlobalSpinnerService
  ) {
    super();
  }

  public addCustomField() {
    const customField = new FormGroup({
      name: new FormControl(''),
      type: new FormControl(''),
      order: new FormControl(this.customFields.length),
    });

    customField.valueChanges
      .pipe(
        takeUntil(this.onDestroy$),
        tap((_) => this.onItemTemplateChanged(customField))
      )
      .subscribe();

    this.customFields.push(customField);
  }

  public removeCustomField(field: FormGroup) {
    this.customFields = this.customFields.filter((f) => f !== field);

    this.selectTemplates = this.selectTemplates.filter(
      (t) => t.customField !== field
    );
  }

  public getSelectTemplate(customField: FormGroup) {
    return this.selectTemplates.find((t) => t.customField === customField);
  }

  public addSelectOption(customField: FormGroup) {
    const template = this.getSelectTemplate(customField)!;
    const selectOption = new FormGroup({
      value: new FormControl(template.options.length + 1),
      text: new FormControl(''),
    });
    template.options.push(selectOption);
  }

  public removeSelectOption(option: FormGroup) {
    this.selectTemplates.forEach(
      (t) => (t.options = t.options.filter((o) => o !== option))
    );
  }

  public onSave(request: SaveListInfoRequest) {
    this.createList(request);
  }

  private onItemTemplateChanged(group: FormGroup) {
    if (group.value.type === this.CustomFieldTypes.SelectType) {
      this.selectTemplates.push({
        customField: group,
        options: [],
      });
    } else {
      this.selectTemplates = this.selectTemplates.filter(
        (t) => t.customField !== group
      );
    }
  }

  private createList(listInfo: SaveListInfoRequest) {
    const customFields = this.collectCustomFields();

    const list = {
      title: listInfo.title,
      description: listInfo.description,
      imageUrl: listInfo.imageUrl,
      topic: listInfo.topic,
      itemTemplate: {
        customFields: customFields,
      } as Item,
    } as List;

    const createList$ = this.listsService.create(list);
    this.spinnerService
      .wrap(createList$)
      .pipe(
        takeUntil(this.onDestroy$),
        tap(() => this.router.navigateByUrl('/me'))
      )
      .subscribe();
  }

  private collectCustomFields() {
    const customFields = this.customFields.map((control) => {
      const selectOptions = this.selectTemplates
        .find((t) => t.customField === control)
        ?.options.map((o) => o.value as SelectOption);

      return {
        name: control.value.name,
        type: control.value.type,
        order: control.value.order,
        selectOptions: selectOptions,
      } as CustomField;
    });

    return customFields;
  }
}
