import {Component, inject, EventEmitter, Output} from '@angular/core'
import {
  faSearch,
  faUserCircle,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import {RouterLink} from '@angular/router'
import {CategoriesStoreItem} from '../../services/categoriesStoreItem.service'
import {AsyncPipe} from '@angular/common'
import {SearchKeyword} from '../../../shared/types/searchKeyword.type'

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
  @Output()
  searchClicked: EventEmitter<SearchKeyword> = new EventEmitter<SearchKeyword>()

  onClickSearch(keyword: string, categoryId: string): void {
    this.searchClicked.emit({
      categoryId: parseInt(categoryId),
      keyword: keyword,
    })
  }
}
