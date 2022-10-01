import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomFieldType } from 'src/app/models/enums/custom-field-type.enum';
import { Item } from 'src/app/models/item.model';

@Component({
  selector: 'app-new-item-dialog',
  templateUrl: './new-item-dialog.component.html',
  styleUrls: ['./new-item-dialog.component.scss'],
})
export class NewItemDialogComponent {
  public types = {
    string: CustomFieldType.StringType,
    number: CustomFieldType.IntType,
    boolean: CustomFieldType.BoolType,
    date: CustomFieldType.DateTimeType,
  };

  public form = new FormGroup({});

  public itemTemplate!: Item;

  constructor(
    private readonly dialogRef: MatDialogRef<NewItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { itemTemplate: Item }
  ) {
    this.itemTemplate = data.itemTemplate;

    this.parseCustomFields();
  }

  public parseCustomFields() {
    this.form = new FormGroup({});

    this.form.addControl('name', new FormControl(''));

    this.itemTemplate.customFields
      .map((f) => f.name)
      .forEach((controlName) =>
        this.form.addControl(controlName, new FormControl(''))
      );
  }

  public saveItem() {
    Object.keys(this.form.value)
      .filter((k) => k !== 'name')
      .forEach((key) => {
        const field = this.itemTemplate.customFields.find((f) => f.name == key);
        switch (field?.type) {
          case this.types.boolean:
            field.boolValue = (this.form.value as any)[key];
            break;
          case this.types.number:
            field.intValue = +(this.form.value as any)[key];
            break;
          case this.types.string:
            field.stringValue = (this.form.value as any)[key];
            break;
          case this.types.date:
            field.dateTimeValue = new Date((this.form.value as any)[key]);
            break;
          default:
            break;
        }
      });

    this.itemTemplate.name = (this.form.value as any).name;

    this.dialogRef.close(this.itemTemplate);
  }
}
