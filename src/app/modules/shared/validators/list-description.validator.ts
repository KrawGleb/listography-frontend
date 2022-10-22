import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ListValidationRules } from 'src/app/models/validation/rules/list-validation-rules';

export function richTextMaxLengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value.length > ListValidationRules.descriptionMaxLength
      ? { maxLength: true }
      : null;
  };
}
