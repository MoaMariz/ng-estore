import {Component, inject, EventEmitter, Output, OnInit} from '@angular/core'
import {
  faSearch,
  faUserCircle,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import {RouterLink, NavigationEnd, Router} from '@angular/router'
import {CategoriesStoreItem} from '../../services/categoriesStoreItem.service'
import {AsyncPipe} from '@angular/common'
import {SearchKeyword} from '../../../shared/types/searchKeyword.type'
import { filter } from 'rxjs'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  faSearch = faSearch
  faUserCircle = faUserCircle
  faShoppingCart = faShoppingCart

  private router = inject(Router)
  navigationSearch: boolean = true

  categoriesStoreItem = inject(CategoriesStoreItem)
  @Output()
  searchClicked: EventEmitter<SearchKeyword> = new EventEmitter<SearchKeyword>()

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.navigationSearch = event.url === '/home/products'
     ? true : false})
  }

  onClickSearch(keyword: string, categoryId: string): void {
    this.searchClicked.emit({
      categoryId: parseInt(categoryId),
      keyword: keyword,
    })
  }
}
