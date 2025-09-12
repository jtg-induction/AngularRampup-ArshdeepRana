import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { ValidationMessages } from 'app/constants';

import { AuthService , UserService} from '@shared/services/';
import { strongPasswordValidator ,uniqueUsernameValidator, uniqueEmailValidator, emailValidator } from '@shared/validators/';

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
  ) {}

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
    console.log("Hi");
    return this.form.controls;
  }

  getUsernameError(): string {
    const c = this.f['username'];
    if (!c) return '';
    if (c.hasError('required')) return ValidationMessages.USERNAME_REQUIRED;
    if (c.hasError('minlength')) return ValidationMessages.USERNAME_MIN;
    if (c.hasError('maxlength')) return ValidationMessages.USERNAME_MAX;
    if (c.hasError('usernameTaken')) return ValidationMessages.USERNAME_TAKEN;
    return '';
  }

  getEmailError(): string {
    const c = this.f['email'];
    if (!c) return '';
    if (c.hasError('required')) return ValidationMessages.EMAIL_REQUIRED;
    if (c.hasError('email') || c.hasError('validEmail')) return ValidationMessages.EMAIL_INVALID;
    if (c.hasError('emailTaken')) return ValidationMessages.EMAIL_EXISTS;
    return '';
  }

  getPasswordError(): string {
    console.log("in getPasswordError")
    const c = this.f['password'];
    if (!c) return '';
    if (c.hasError('required')) return ValidationMessages.PASSWORD_REQUIRED;
    if (c.hasError('minlength')) return ValidationMessages.PASSWORD_MIN;
    if (c.hasError('maxlength')) return ValidationMessages.PASSWORD_MAX;
    if (c.hasError('strongPassword')) {
      const errors = c.getError('strongPassword');
      if (!errors.hasUpper) return ValidationMessages.PASSWORD_UPPER;
      if (!errors.hasLower) return ValidationMessages.PASSWORD_LOWER;
      if (!errors.hasNumber) return ValidationMessages.PASSWORD_NUMBER;
      if (errors.specialCount < 2) return ValidationMessages.PASSWORD_SPECIAL;
      return ValidationMessages.PASSWORD_WEAK;
    }
    return '';
  }

  onSubmit() {

    if (!this.form) return;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting =  true;
    this.errorMessage = '';
    
    this.authService.register(this.form.value).subscribe({
      next : () => {
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
