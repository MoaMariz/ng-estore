import {Component, inject} from '@angular/core'
import {AsyncPipe, CurrencyPipe} from '@angular/common'
import {RatingsComponent} from '../ratings/ratings.component'
import {ProductStoreItem} from '../../services/productsStoreItem.service'
import {RouterLink} from '@angular/router'

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CurrencyPipe, RatingsComponent, AsyncPipe, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  productsStoreItem = inject(ProductStoreItem)
}
