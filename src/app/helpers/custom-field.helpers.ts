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
    case CustomFieldType.IntType:
      return field.intValue;
    case CustomFieldType.StringType:
      return field.stringValue;
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
    case CustomFieldType.IntType:
      field.intValue = value as number;
      return field;
    case CustomFieldType.StringType:
      field.stringValue = value as string;
      return field;
    default:
      throw new Error('Unknown field type.');
  }
}
