import {Component, inject, OnDestroy, OnInit} from '@angular/core'
import {CartService} from '../../../shared/services/cart.service'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import {CartItem, DeliveryAddress} from '../../../shared/types/cart.type'
import {Router} from '@angular/router'
import {AsyncPipe, CurrencyPipe, NgClass} from '@angular/common'
import {RatingsComponent} from '../ratings/ratings.component'
import {Validators, FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms'
import {UserService} from '../../../shared/services/userService.service'
import {LoggedUser} from '../../../shared/types/user.type'
import {Subscription} from 'rxjs'
import { OrderService } from '../../../shared/services/order.service'

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FontAwesomeModule, AsyncPipe, CurrencyPipe, RatingsComponent, ReactiveFormsModule, NgClass],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit, OnDestroy {
  faTrash = faTrash
  orderForm: FormGroup
  user: LoggedUser
  fb = inject(FormBuilder)
  subscriptions: Subscription = new Subscription()
  alertType: number = 0
  alertMessage: string = ''
  disableCheckout: boolean

  private orderService = inject(OrderService)
  private userService = inject(UserService)
  public cartService = inject(CartService)
  private router = inject(Router)

  constructor() {
    this.user = {
      firstName: '',
      lastName: '',
      address: '',
      country: '',
      city: '',
      email: '',
    }

    this.subscriptions.add(this.userService.loggedUser$.subscribe(loggedUser => {
      if(loggedUser.firstName) {
        this.user = loggedUser
      }
    }))
  }

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      name: [`${this.user.firstName} ${this.user.lastName}`, Validators.required],
      address: [this.user.address, Validators.required],
      country: [this.user.country, Validators.required],
      city: [this.user.city, Validators.required],
    })  
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  navigateToHome(): void {
    this.router.navigate(['home/products'])
  }

  updateQuantity($event: any, cartItem: CartItem): void {
    if ($event.target.innerText === '+') {
      this.cartService.addProduct(cartItem.product)
    } else if ($event.target.innerText === '-') {
      this.cartService.decreaseProductQuantity(cartItem)
    }
  }

  removeItem(cartItem: CartItem): void {
    this.cartService.removeProduct(cartItem)
  }

  onSubmit(): void {
    if(this.userService.isUserAuthenticated) {
      const deliveryAddress: DeliveryAddress = {
        userName: this.orderForm.get('name')?.value,
        address: this.orderForm.get('address')?.value,
        country: this.orderForm.get('country')?.value,
        city: this.orderForm.get('city')?.value
      }
      this.subscriptions.add(this.orderService.saveOrder(deliveryAddress, this.user.email).subscribe({
        next: result => {
          this.cartService.clearCart()
          this.alertMessage = 'Order registered!'
          this.alertType = 0
          this.disableCheckout = true
        },
        error: (error) => {
          this.alertType = 2
          if(error.error.message === "Authentication failed!") {
            this.alertMessage = "Please login to register your order."
          } else {
            this.alertMessage = error.error.message
          }
        }
      }))
    }
  }
}
