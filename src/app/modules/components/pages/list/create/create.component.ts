import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { List } from 'src/app/models/list.model';
import { CustomField } from 'src/app/models/custom-field.model';
import { Item } from 'src/app/models/item.model';
import { CustomFieldType } from 'src/app/models/enums/custom-field-type.enum';
import { ListsService } from 'src/app/modules/common/services/lists.service';
import { DestroyableComponent } from '../../../helpers/destroyable/destroyable.component';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class ListCreateComponent extends DestroyableComponent {
  public itemTemplateControls: any[] = [];
  public customFieldTypes = {
    string: CustomFieldType.StringType,
    number: CustomFieldType.IntType,
    date: CustomFieldType.DateTimeType,
    boolean: CustomFieldType.BoolType,
  };

  public form = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
    image: new FormControl(),
    topic: new FormControl(),
  });

  constructor(private readonly listsService: ListsService) {
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

  public createList() {
    const list = {
      title: this.form.value.title,
      description: this.form.value.description,
      imageUrl: this.form.value.image,
      topic: {
        name: this.form.value.topic,
      },
    } as List;

    const customFields = this.itemTemplateControls.map((control) => {
      return {
        name: control.value.name,
        type: control.value.type,
        order: control.value.order,
      } as CustomField;
    });

    list.itemTemplate = {
      customFields,
    } as Item;

    console.log(list);
    this.listsService.create(list).pipe(takeUntil(this.onDestroy$)).subscribe();
  }
}
