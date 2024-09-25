import {Component, inject, EventEmitter, Output, OnInit} from '@angular/core'
import {CategoriesStoreItem} from '../../../shared/services/categoriesStoreItem.service'
import {AsyncPipe} from '@angular/common'
import {Category} from '../../../shared/types/category.type'
import {RouterLink} from '@angular/router'
import {NavigationEnd, Router} from '@angular/router'
import {filter} from 'rxjs'
import { ProductStoreItem } from '../../../shared/services/productsStoreItem.service'

@Component({
  selector: 'app-catnavigation',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './catnavigation.component.html',
  styleUrl: './catnavigation.component.scss',
})
export class CatnavigationComponent implements OnInit {
  @Output()
  categoryClicked: EventEmitter<number> = new EventEmitter<number>()
  categoriesStoreItem = inject(CategoriesStoreItem)
  productStoreItem = inject(ProductStoreItem)

  displayOptions: boolean = true
  private router = inject(Router)

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.displayOptions = event.url === '/home/products' ? true : false
      })
  }

  onCategoryClick(category: Category): void {
    this.categoryClicked.emit(category.id)
  }

  onHomeClick(): void {
    this.productStoreItem.loadProducts()
  }
}
