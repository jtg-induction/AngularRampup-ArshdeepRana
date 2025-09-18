import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

import { RegularExpressions } from "app/constants";

export function emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value as string;

        if (!value) {
            return null;
        }

        const isValid = RegularExpressions.EMAIL_REGX.test(value);

        return isValid ? null : {
            validEmail: {
                isValid
            }
        }
    }
}
