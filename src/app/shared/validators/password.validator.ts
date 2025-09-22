import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { REGULAR_EXPRESSIONS } from 'app/constants/';

export function strongPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;

    if (!value) {
      return null;
    }

    const hasUpper = REGULAR_EXPRESSIONS.HAS_UPPER.test(value);
    const hasLower = REGULAR_EXPRESSIONS.HAS_LOWER.test(value);
    const hasNumber = REGULAR_EXPRESSIONS.HAS_NUMBER.test(value);

    // match non-alphanumeric chars
    const specialMatches = value.match(REGULAR_EXPRESSIONS.HAS_SPECIALS);
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
