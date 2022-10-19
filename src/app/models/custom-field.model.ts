import { CustomFieldType } from './enums/custom-field-type.enum';
import { SelectOption } from './select-option.model';

export interface CustomField {
  id: number;
  name: string;
  order: number;
  type: CustomFieldType;
  selectOptions?: SelectOption[];

  stringValue?: string | null;
  numberValue?: number | null;
  dateTimeValue?: Date | null;
  boolValue?: boolean | null;
  textValue?: string | null;
  selectValue?: number | null;
}
