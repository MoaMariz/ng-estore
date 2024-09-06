import {Component, DestroyRef, inject, OnInit} from '@angular/core'
import { AsyncPipe, CurrencyPipe } from '@angular/common'
import { RatingsComponent } from "../ratings/ratings.component";
import { ProductStoreItem } from '../../services/productsStoreItem.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CurrencyPipe, RatingsComponent, AsyncPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  
  productsStoreItem = inject(ProductStoreItem)
  private destroyRef = inject(DestroyRef)
  
}
