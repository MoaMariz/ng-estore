import {Component, inject, OnInit} from '@angular/core'
import {HeaderComponent} from './components/header/header.component'
import {CatnavigationComponent} from './components/catnavigation/catnavigation.component'
import {SidenavigationComponent} from './components/sidenavigation/sidenavigation.component'
import {ProductsComponent} from './components/products/products.component'
import {CategoriesStoreItem} from '../shared/services/categoriesStoreItem.service'
import {ProductStoreItem} from '../shared/services/productsStoreItem.service'
import {ProductsService} from '../shared/services/products.service'
import {SearchKeyword} from '../shared/types/searchKeyword.type'
import {RouterOutlet, NavigationEnd, Router} from '@angular/router'
import {CartService} from '../shared/services/cart.service'
import {filter} from 'rxjs'
import { UserService } from '../shared/services/userService.service'
import { OrderService } from '../shared/services/order.service'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    CatnavigationComponent,
    SidenavigationComponent,
    ProductsComponent,
    RouterOutlet,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [
    CategoriesStoreItem,
    ProductStoreItem,
    ProductsService,
    CartService,
    UserService,
    OrderService
  ],
})
export class HomeComponent implements OnInit {
  private categoryStoreItem = inject(CategoriesStoreItem)
  private productStoreItem = inject(ProductStoreItem)
  private router = inject(Router)


  constructor(){
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        if ((event as NavigationEnd).url === '/home') {
          this.router.navigate(['/home/products'])
        }
      })
  }
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
