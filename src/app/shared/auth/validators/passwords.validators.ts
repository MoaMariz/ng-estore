import {AbstractControl, ValidatorFn, ValidationErrors} from '@angular/forms'

export const matchPasswords: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password')?.value
  const confirmPassword = control.get('confirmPassword')?.value
  if (password === confirmPassword) {
    return null
  }
  return {passwordMismatch: true}
}
