import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { VALIDATION_MESSAGES } from 'app/constants';

import { AuthService } from '@shared/services/';
import { emailValidator } from '@shared/validators/';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.scss']
})

export class LoginComponent implements OnInit {
  form!: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email, emailValidator()]
      ],
      password: [
        '',
        [Validators.required]
      ]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  getEmailError(): string {
    const c = this.f['email'];
    if (!c) return '';
    if (c.hasError('required')) return VALIDATION_MESSAGES.EMAIL_REQUIRED;
    if (c.hasError('email') || c.hasError('validEmail')) return VALIDATION_MESSAGES.EMAIL_INVALID;
    return '';
  }

  getPasswordError(): string {
    const c = this.f['password'];
    if (!c) return '';
    if (c.hasError('required')) return VALIDATION_MESSAGES.PASSWORD_REQUIRED;
    return '';
  }

  onSubmit() {

    if (!this.form) return;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.authService.login(this.form.value).subscribe({
      next: () => {

        this.isSubmitting = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {

        if (err.status === 401 || err.status === 400) {
          this.errorMessage = 'Invalid email or password.';
        } else if (err.error?.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Login failed. Please try again.';
        }

        this.isSubmitting = false;
      }
    })
  }
}
