import { CustomField } from 'src/app/models/custom-field.model';
import { CustomFieldType } from 'src/app/models/enums/custom-field-type.enum';

export function getCustomFieldValue(field: CustomField | undefined) {
  if (!field) {
    throw new Error('Field is undefined.');
  }

  switch (field.type) {
    case CustomFieldType.BoolType:
      return field.boolValue;
    case CustomFieldType.DateTimeType:
      return field.dateTimeValue;
    case CustomFieldType.NumberType:
      return field.numberValue;
    case CustomFieldType.StringType:
      return field.stringValue;
    case CustomFieldType.TextType:
      return field.textValue;
    case CustomFieldType.SelectType:
      return field.selectOptions?.find((o) => o.value === field.selectValue)
        ?.text;
    default:
      throw new Error('Unknown field type.');
  }
}

export function setCustomFieldValue(
  field: CustomField | undefined,
  value: any
) {
  if (!field) {
    return;
  }

  switch (field.type) {
    case CustomFieldType.BoolType:
      field.boolValue = value as boolean;
      return field;
    case CustomFieldType.DateTimeType:
      field.dateTimeValue = value as Date;
      return field;
    case CustomFieldType.NumberType:
      field.numberValue = value as number;
      return field;
    case CustomFieldType.StringType:
      field.stringValue = value as string;
      return field;
    case CustomFieldType.TextType:
      field.textValue = value as string;
      return field;
    case CustomFieldType.SelectType:
      field.selectValue = value as number;
      return field;
    default:
      throw new Error('Unknown field type.');
  }
}
