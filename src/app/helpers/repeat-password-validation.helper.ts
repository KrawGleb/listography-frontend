import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function checkPasswords(group: AbstractControl): ValidationErrors | null {
  const formGroup = group as FormGroup;
  const password = group.get('password')?.value;
  const repeatPassword = group.get('repeatPassword')?.value;

  if (password !== repeatPassword) {
    formGroup.controls['repeatPassword'].setErrors({ notMatch: true });
  }

  return password === repeatPassword
    ? null
    : {
        notMatch: true,
      };
}
