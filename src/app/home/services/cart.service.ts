import {CallTracker} from 'assert'
import {Cart, CartItem} from '../../shared/types/cart.type'
import {Product} from '../../shared/types/products.type'
import {Observable} from 'rxjs'
import {StoreItem} from '../../shared/data/storeItem'

export class CartService extends StoreItem<Cart> {
  constructor() {
    super({
      products: [],
      totalAmount: 0,
      totalProducts: 0,
    })
  }

  get cart$(): Observable<Cart> {
    return this.value$
  }

  get cart(): Cart {
    return this.value
  }

  addProduct(product: Product): void {
    const cartProduct: CartItem | undefined = this.cart.products.find(
      (cartProduct) => cartProduct.product.id === product.id
    )

    if (!cartProduct) {
      this.cart.products = [
        ...this.cart.products,
        {
          product: product,
          amount: product.price,
          quantity: 1,
        },
      ]
    } else {
        cartProduct.quantity++
    }
    this.cart.totalAmount += Number(product.price)
    ++this.cart.totalProducts
  }
}
