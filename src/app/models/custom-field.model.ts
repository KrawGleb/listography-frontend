import { CustomFieldType } from "./enums/custom-field-type.enum";

export interface CustomField {
  id: number;
  name: string;
  order: number;
  type: CustomFieldType;

  stringValue?: string | null;
  intValue?: number | null;
  dateTimeValue?: Date | null;
  boolValue?: boolean | null;
}
