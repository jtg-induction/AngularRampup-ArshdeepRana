import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function emailValidator() : ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
        const value = control.value as string;

        if(!value) {
            return null;
        }

        const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);

        return isValid
            ? null
            : {
                validEmail : {
                    isValid
                }
            }
    
    }
}
