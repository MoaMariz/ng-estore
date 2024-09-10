import {Component, inject, OnInit} from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import {matchPasswords} from '../validators/passwords.validators'
import {UserService} from '../../services/userService.service'
import {User} from '../../../shared/types/user.type'
import { NgClass } from '@angular/common'

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  providers: [UserService],
})
export class SignupComponent implements OnInit {
  userSignupForm: FormGroup
  private userService = inject(UserService)
  fb = inject(FormBuilder)

  alertMessage: string = ''
  alertType: number = 0 //0-success, 1-warning, 2-error

  ngOnInit(): void {
    this.userSignupForm = this.fb.record(
      {
        email: ['', [Validators.required, Validators.email]],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        address: [''],
        country: [''],
        state: [''],
        city: [''],
        pin: [''],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: matchPasswords,
      }
    )
  }

  get firstName(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('firstName')
  }

  get lastName(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('lastName')
  }

  get email(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('email')
  }

  get password(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('password')
  }

  get confirmPassword(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('confirmPassword')
  }

  onSubmit(): void {
    const user: User = {
      email: this.email?.value,
      firstName: this.firstName?.value,
      lastName: this.lastName?.value,
      address: this.userSignupForm.get('address')?.value,
      country: this.userSignupForm.get('country')?.value,
      state: this.userSignupForm.get('state')?.value,
      city: this.userSignupForm.get('city')?.value,
      pin: this.userSignupForm.get('pin')?.value,
      password: this.password?.value,
    }

    this.userService.createUser(user).subscribe({
      next: (result) => {
        if (result.message === 'success') {
          this.alertMessage = 'User Created successfully'
          this.alertType = 0
        } else if (result.message === 'Email already exists') {
          this.alertMessage = result.message
          this.alertType = 1
        }
      },
      error: (error) => {
        this.alertMessage = error
        this.alertType = 2
      },
    })
  }
}
