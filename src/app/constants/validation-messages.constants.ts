export const VALIDATION_MESSAGES = {
  // Username related validation messages
  USERNAME_REQUIRED: 'Username is required.',
  USERNAME_MIN: 'Username must be at least 3 characters long.',
  USERNAME_MAX: 'Username cannot be longer than 20 characters',
  USERNAME_TAKEN: 'Username already exists.',

  // Email related validation messages
  EMAIL_REQUIRED: 'Email is required.',
  EMAIL_INVALID: 'Invalid email format.',
  EMAIL_EXISTS: 'Email already exists.',

  // Password related validation messages
  PASSWORD_REQUIRED: 'Password is required.',
  PASSWORD_MIN: 'Password must be at least 8 characters long.',
  PASSWORD_MAX: 'Password cannot be longer than 16 characters',
  PASSWORD_UPPER: 'Password must contain at least one uppercase letter.',
  PASSWORD_LOWER: 'Password must contain at least one lowercase letter.',
  PASSWORD_NUMBER: 'Password must contain at least one number.',
  PASSWORD_SPECIAL: 'Password must contain at least 2 special characters.',
  PASSWORD_WEAK: 'Password is not strong enough.'
}
