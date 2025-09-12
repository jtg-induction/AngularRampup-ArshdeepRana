export class ValidationMessages {
  static readonly USERNAME_REQUIRED = 'Username is required 😄';
  static readonly USERNAME_MIN = 'Minimum 3 characters';
  static readonly USERNAME_MAX = "Maximum 15 characters allowed"
  static readonly USERNAME_TAKEN = 'Username is already taken 😭'

  static readonly EMAIL_REQUIRED = 'Email is required 😄';
  static readonly EMAIL_INVALID = 'Invalid email format 😒';
  static readonly EMAIL_EXISTS = 'Username is already taken 😭';

  static readonly PASSWORD_REQUIRED = 'Password is required 😄';
  static readonly PASSWORD_MIN = 'Password must be at least 8 characters long ';
  static readonly PASSWORD_MAX = 'Password cannot be longer than 16 characters';
  static readonly PASSWORD_UPPER = 'Password must contain at least one uppercase letter 🔠';
  static readonly PASSWORD_LOWER = 'Password must contain at least one lowercase letter 🔡';
  static readonly PASSWORD_NUMBER = 'Password must contain at least one number 🔢';
  static readonly PASSWORD_SPECIAL = 'Password must contain at least 2 special characters ⭐💰';
  static readonly PASSWORD_WEAK = 'Password is not strong enough 😤';

  
}
