import { AbstractControl, AsyncValidatorFn } from '@angular/forms';

import { of, timer } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { UserService } from '@shared/services';

const TIMER_DURATION = 500;


export function uniqueUsernameValidator(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) return of(null);

    return timer(TIMER_DURATION).pipe(
      switchMap(() =>
        userService.checkUsername(control.value).pipe(
          map(isUnique => (isUnique ? null : { usernameTaken: true })),
          catchError(() => of(null))
        )
      )
    );
  };
}

export function uniqueEmailValidator(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) return of(null);

    return timer(TIMER_DURATION).pipe(
      switchMap(() =>
        userService.checkEmail(control.value).pipe(
          map(isUnique => (isUnique ? null : { emailTaken: true })),
          catchError(() => of(null))
        )
      )
    );
  };
}
