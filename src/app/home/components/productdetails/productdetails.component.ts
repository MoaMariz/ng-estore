import {Component, inject, OnDestroy, OnInit} from '@angular/core'
import {RatingsComponent} from '../ratings/ratings.component'
import {ActivatedRoute} from '@angular/router'
import {ProductsService} from '../../services/products.service'
import {Product} from '../../../shared/types/products.type'
import {Subscription} from 'rxjs'
import { CurrencyPipe } from '@angular/common'

@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [RatingsComponent, CurrencyPipe],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.scss',
})
export class ProductdetailsComponent implements OnInit, OnDestroy {
  private activatedRoute = inject(ActivatedRoute)
  private productsService = inject(ProductsService)
  subscriptions: Subscription = new Subscription()
  product: Product[] | any = {}

  ngOnInit(): void {
    const id: number = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    this.subscriptions.add(
    this.productsService.getProduct(id).subscribe(product => {
      this.product = product
    }))
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
