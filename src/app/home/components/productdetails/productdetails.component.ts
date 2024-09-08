import {Component, inject, OnDestroy, OnInit} from '@angular/core'
import {RatingsComponent} from '../ratings/ratings.component'
import {ActivatedRoute} from '@angular/router'
import {ProductsService} from '../../services/products.service'
import {Product} from '../../../shared/types/products.type'
import {Subscription} from 'rxjs'
import { CurrencyPipe, NgIf } from '@angular/common'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { CartService } from '../../services/cart.service'
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'

@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [RatingsComponent, CurrencyPipe, NgIf, FontAwesomeModule],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.scss',
})
export class ProductdetailsComponent implements OnInit, OnDestroy {
  faShoppingCart = faShoppingCart

  private activatedRoute = inject(ActivatedRoute)
  private productsService = inject(ProductsService)
  private cartService = inject(CartService)
  
  subscriptions: Subscription = new Subscription()
  product: Product[] | any = {}

  ngOnInit(): void {
    const id: number = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    this.subscriptions.add(
    this.productsService.getProduct(id).subscribe(product => {
      this.product = product
    }))
  }

  addToCart(){
    this.cartService.addProduct(this.product)
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
