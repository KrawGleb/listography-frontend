import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function notAllowedChars(chars: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;

    return value && [...value].some(v => chars.indexOf(v) > -1)
      ? { notAllowedChars: true }
      : null;
  };
}
