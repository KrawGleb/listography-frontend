import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomField } from 'src/app/models/custom-field.model';
import { CustomFieldType } from 'src/app/models/enums/custom-field-type.enum';
import { Item } from 'src/app/models/item.model';
import { GetCustomFieldValue, SetCustomFieldValue } from 'src/app/modules/components/helpers/custom-field.helpers';

@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.scss'],
})
export class ItemDialogComponent {
  public types = CustomFieldType;
  public form = new FormGroup({});
  public item!: Item;
  public isEdit!: boolean;

  constructor(
    private readonly dialogRef: MatDialogRef<ItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { item: Item; edit: boolean }
  ) {
    this.item = data.item;
    this.isEdit = data.edit;

    this.parseCustomFields();
  }

  public parseCustomFields() {
    this.form = new FormGroup({});

    this.form.addControl('name', new FormControl(this.item.name));

    this.item.customFields
      .forEach((field: CustomField) => {
        const controlValue = this.isEdit
          ? GetCustomFieldValue(field)
          : '';

        this.form.addControl(field.name, new FormControl(controlValue));
      });
  }

  public saveItem() {
    Object.keys(this.form.value)
      .filter((k) => k !== 'name')
      .forEach((key) => {
        const field = this.item.customFields.find((f) => f.name == key);
        const value = (this.form.value as any)[key];
        SetCustomFieldValue(field, value);
      });

    this.item.name = (this.form.value as any).name;

    this.dialogRef.close(this.item);
  }
}
