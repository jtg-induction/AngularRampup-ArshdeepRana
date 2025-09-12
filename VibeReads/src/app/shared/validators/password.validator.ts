import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function strongPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;

    if (!value) {
      return null; 
    }

    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);

    // match non-alphanumeric chars
    const specialMatches = value.match(/[^A-Za-z0-9]/g);
    const specialCount = specialMatches ? specialMatches.length : 0;

    const passwordValid = hasUpper && hasLower && hasNumber && specialCount >= 2;

    return passwordValid
      ? null
      : {
          strongPassword: {
            hasUpper,
            hasLower,
            hasNumber,
            specialCount,
          },
        };
  };
}
