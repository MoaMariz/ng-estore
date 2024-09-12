import {Component, inject, OnInit} from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import {RouterLink} from '@angular/router'
import {UserService} from '../../services/userService.service'
import {LoginToken} from '../../types/user.type'
import { NgClass } from '@angular/common'
import { Location } from '@angular/common'


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  userLoginForm: FormGroup
  private fb = inject(FormBuilder)
  private userService = inject(UserService)
  private location = inject(Location)
  alertType: number = 0
  alertMessage: string = ''

  ngOnInit(): void {

    this.userLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  get email(): AbstractControl<any, any> | null {
    return this.userLoginForm.get('email')
  }

  get password(): AbstractControl<any, any> | null {
    return this.userLoginForm.get('password')
  }

  onSubmit(): void {
    this.userService.login(this.email?.value, this.password?.value).subscribe({
      next: (result: LoginToken) => {
        this.userService.activateToken(result)
        this.alertType = 0
        this.alertMessage = 'Login Successfull'
        setTimeout(() => {
          this.location.back()
        }, 1000);
      }, error: (error) => {
        this.alertType = 2
        this.alertMessage = error.error.message
      }
    })
  }
}
