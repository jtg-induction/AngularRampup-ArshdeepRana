import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { RegularExpressions } from 'app/constants/';

export function strongPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;

    if (!value) {
      return null; 
    }

    const hasUpper = RegularExpressions.HAS_UPPER.test(value);
    const hasLower = RegularExpressions.HAS_LOWER.test(value);
    const hasNumber = RegularExpressions.HAS_NUMBER.test(value);

    // match non-alphanumeric chars
    const specialMatches = value.match(RegularExpressions.HAS_SPECIALS);
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
