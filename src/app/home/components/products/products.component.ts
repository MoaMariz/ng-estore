import {Component, inject} from '@angular/core'
import {AsyncPipe, CurrencyPipe} from '@angular/common'
import {RatingsComponent} from '../ratings/ratings.component'
import {ProductStoreItem} from '../../services/productsStoreItem.service'
import {RouterLink} from '@angular/router'
import { Product } from '../../../shared/types/products.type'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { CartService } from '../../services/cart.service'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CurrencyPipe, RatingsComponent, AsyncPipe, RouterLink, FontAwesomeModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  productsStoreItem = inject(ProductStoreItem)
  faShoppingCart = faShoppingCart;
  cartService = inject(CartService)

  addToCart(product: Product) {
    this.cartService.addProduct(product);
  }
}
