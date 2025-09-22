import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { VALIDATION_MESSAGES } from 'app/constants';

import { AuthService, UserService } from '@shared/services';
import { strongPasswordValidator, uniqueUsernameValidator, uniqueEmailValidator, emailValidator } from '@shared/validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../auth.scss']
})

export class SignupComponent implements OnInit {
  form!: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.fb.group({
      username: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
        [uniqueUsernameValidator(this.userService)]
      ],
      email: [
        '',
        [Validators.required, Validators.email, emailValidator()],
        [uniqueEmailValidator(this.userService)],
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(8), strongPasswordValidator(), Validators.maxLength(16)]
      ]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  getUsernameError(): string {
    const c = this.f['username'];
    if (!c) return '';
    if (c.hasError('required')) return VALIDATION_MESSAGES.USERNAME_REQUIRED;
    if (c.hasError('minlength')) return VALIDATION_MESSAGES.USERNAME_MIN;
    if (c.hasError('maxlength')) return VALIDATION_MESSAGES.USERNAME_MAX;
    if (c.hasError('usernameTaken')) return VALIDATION_MESSAGES.USERNAME_TAKEN;
    return '';
  }

  getEmailError(): string {
    const c = this.f['email'];
    if (!c) return '';
    if (c.hasError('required')) return VALIDATION_MESSAGES.EMAIL_REQUIRED;
    if (c.hasError('email') || c.hasError('validEmail')) return VALIDATION_MESSAGES.EMAIL_INVALID;
    if (c.hasError('emailTaken')) return VALIDATION_MESSAGES.EMAIL_EXISTS;
    return '';
  }

  getPasswordError(): string {
    const c = this.f['password'];
    if (!c) return '';
    if (c.hasError('required')) return VALIDATION_MESSAGES.PASSWORD_REQUIRED;
    if (c.hasError('minlength')) return VALIDATION_MESSAGES.PASSWORD_MIN;
    if (c.hasError('maxlength')) return VALIDATION_MESSAGES.PASSWORD_MAX;
    if (c.hasError('strongPassword')) {
      const errors = c.getError('strongPassword');
      if (!errors.hasUpper) return VALIDATION_MESSAGES.PASSWORD_UPPER;
      if (!errors.hasLower) return VALIDATION_MESSAGES.PASSWORD_LOWER;
      if (!errors.hasNumber) return VALIDATION_MESSAGES.PASSWORD_NUMBER;
      if (errors.specialCount < 2) return VALIDATION_MESSAGES.PASSWORD_SPECIAL;
      return VALIDATION_MESSAGES.PASSWORD_WEAK;
    }
    return '';
  }

  onSubmit() {

    if (!this.form) return;
    if (this.form.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.authService.register(this.form.value).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.errorMessage = 'Signup failed. Please try again.'
        this.isSubmitting = false;
      }
    })
  }
}
