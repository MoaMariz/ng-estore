import {Component, inject, OnInit} from '@angular/core'
import {HeaderComponent} from './components/header/header.component'
import {CatnavigationComponent} from './components/catnavigation/catnavigation.component'
import {SidenavigationComponent} from './components/sidenavigation/sidenavigation.component'
import {ProductsComponent} from './components/products/products.component'
import {CategoriesStoreItem} from './services/categoriesStoreItem.service'
import {ProductStoreItem} from './services/productsStoreItem.service'
import {ProductsService} from './services/products.service'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    CatnavigationComponent,
    SidenavigationComponent,
    ProductsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [CategoriesStoreItem, ProductStoreItem, ProductsService],
})
export class HomeComponent implements OnInit {
  categoryStoreItem = inject(CategoriesStoreItem)
  productStoreItem = inject(ProductStoreItem)

  ngOnInit(): void {
    this.categoryStoreItem.loadCategories()
    this.productStoreItem.loadProducts()
  }

  onSelectSubCategory(subCategoryId: number): void {
    this.productStoreItem.loadProducts('subcategoryid=' + subCategoryId)
  }
}
