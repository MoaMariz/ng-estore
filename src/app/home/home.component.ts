import {Component, inject, OnInit} from '@angular/core'
import {HeaderComponent} from './components/header/header.component'
import {CatnavigationComponent} from './components/catnavigation/catnavigation.component'
import {SidenavigationComponent} from './components/sidenavigation/sidenavigation.component'
import {ProductsComponent} from './components/products/products.component'
import {CategoriesStoreItem} from './services/categoriesStoreItem.service'
import {ProductStoreItem} from './services/productsStoreItem.service'
import {ProductsService} from './services/products.service'
import {SearchKeyword} from '../shared/types/searchKeyword.type'
import { RouterOutlet } from '@angular/router'
import { CartService } from './services/cart.service'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    CatnavigationComponent,
    SidenavigationComponent,
    ProductsComponent,
    RouterOutlet
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [CategoriesStoreItem, ProductStoreItem, ProductsService, CartService],
})
export class HomeComponent implements OnInit {
  categoryStoreItem = inject(CategoriesStoreItem)
  productStoreItem = inject(ProductStoreItem)
  cartService = inject(CartService)

  ngOnInit(): void {
    this.categoryStoreItem.loadCategories()
    this.productStoreItem.loadProducts()
  }

  onSelectCategory(categoryId: number): void {
    this.productStoreItem.loadProducts('maincategoryid=' + categoryId)
  }

  onSearchKeyword(searchKeyword: SearchKeyword): void {
    this.productStoreItem.loadProducts(
      'maincategoryid=' +
        searchKeyword.categoryId +
        '&keyword=' +
        searchKeyword.keyword
    )
  }
}
