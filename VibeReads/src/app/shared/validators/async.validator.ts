import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { UserService } from '@shared/services/user.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of, timer } from 'rxjs';

export function uniqueUsernameValidator(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) return of(null);

    return timer(500).pipe(
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

    return timer(500).pipe(
      switchMap(() =>
        userService.checkEmail(control.value).pipe(
          map(isUnique => (isUnique ? null : { emailTaken: true })),
          catchError(() => of(null))
        )
      )
    );
  };
}
