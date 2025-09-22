import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

import { REGULAR_EXPRESSIONS } from "app/constants";

export function emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value as string;

        if (!value) {
            return null;
        }

        const isValid = REGULAR_EXPRESSIONS.EMAIL_REGEX.test(value);

        return isValid ? null : {
            validEmail: {
                isValid
            }
        }
    }
}
