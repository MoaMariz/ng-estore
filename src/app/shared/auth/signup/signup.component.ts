import {Component, DestroyRef, inject, OnInit} from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import {matchPasswords} from '../validators/passwords.validators'
import {UserService} from '../../services/userService.service'
import {User} from '../../../shared/types/user.type'
import {NgClass} from '@angular/common'
import {debounceTime} from 'rxjs'
import { match } from 'assert'

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  providers: [UserService],
})
export class SignupComponent implements OnInit {
  private userService = inject(UserService)
  fb = inject(FormBuilder)
  destroyRef = inject(DestroyRef)

  userSignupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    address: new FormControl(''),
    country: new FormControl(''),
    state: new FormControl(''),
    city: new FormControl(''),
    pin: new FormControl(''),
    password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(5), matchPasswords]}),
    confirmPassword: new FormControl('', {
        validators: [Validators.required, matchPasswords]}),
    }) 

  alertMessage: string = ''
  alertType: number = 0 //0-success, 1-warning, 2-error

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

  ngOnInit() {
    const subscription = this.userSignupForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe({
        next: (value) => {
          window.localStorage.setItem('saved-form', JSON.stringify(value))
        },
      })

    this.destroyRef.onDestroy(() => subscription.unsubscribe())
  }

  onReset(): void {
    this.userSignupForm.reset()
  }

  onSubmit(): void {
    if (this.userSignupForm.invalid) {
      console.log("invalid form")
      return
    }
    
    console.log(this.userSignupForm)

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

    console.log(user)

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
