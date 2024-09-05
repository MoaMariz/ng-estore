import {Component, inject} from '@angular/core'
import {
  faSearch,
  faUserCircle,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import {RouterLink} from '@angular/router'
import {CategoriesStoreItem} from '../../services/categoriesStoreItem.service'
import {AsyncPipe} from '@angular/common'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  faSearch = faSearch
  faUserCircle = faUserCircle
  faShoppingCart = faShoppingCart
  categoriesStoreItem = inject(CategoriesStoreItem)
}
