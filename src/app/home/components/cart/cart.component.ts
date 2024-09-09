import {Component, inject} from '@angular/core'
import {CartService} from '../../services/cart.service'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import {CartItem} from '../../../shared/types/cart.type'
import {Router} from '@angular/router'
import {AsyncPipe, CurrencyPipe} from '@angular/common'
import {RatingsComponent} from '../ratings/ratings.component'

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FontAwesomeModule, AsyncPipe, CurrencyPipe, RatingsComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  faTrash = faTrash

  public cartService = inject(CartService)
  private router = inject(Router)

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
}
