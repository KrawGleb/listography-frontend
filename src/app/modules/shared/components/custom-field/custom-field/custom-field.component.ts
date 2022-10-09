import { Component, Input, OnInit } from '@angular/core';
import { CustomField } from 'src/app/models/custom-field.model';
import { CustomFieldType } from 'src/app/models/enums/custom-field-type.enum';

@Component({
  selector: 'app-custom-field',
  templateUrl: './custom-field.component.html',
  styleUrls: ['./custom-field.component.scss'],
})
export class CustomFieldComponent {
  @Input() public field!: CustomField;

  public CustomFieldType = CustomFieldType;
}
