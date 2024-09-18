import {
  Component,
  inject,
  EventEmitter,
  Output,
  OnInit,
  OnDestroy,
} from '@angular/core'
import {
  faSearch,
  faUserCircle,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import {RouterLink, NavigationEnd, Router} from '@angular/router'
import {CategoriesStoreItem} from '../../../shared/services/categoriesStoreItem.service'
import {AsyncPipe} from '@angular/common'
import {SearchKeyword} from '../../../shared/types/searchKeyword.type'
import {filter, Subscription} from 'rxjs'
import {CartService} from '../../../shared/services/cart.service'
import {UserService} from '../../../shared/services/userService.service'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  faSearch = faSearch
  faUserCircle = faUserCircle
  faShoppingCart = faShoppingCart

  navigationSearch: boolean = true
  isUserAuthenticated: boolean = false
  userName: string = ''

  private router = inject(Router)
  public cartService = inject(CartService)
  public categoriesStoreItem = inject(CategoriesStoreItem)
  public userService = inject(UserService)
  subscription: Subscription = new Subscription()

  @Output()
  searchClicked: EventEmitter<SearchKeyword> = new EventEmitter<SearchKeyword>()

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.navigationSearch = event.url === '/home/products' ? true : false
      })

    this.subscription.add(
      this.userService.isUserAuthenticated$.subscribe((result) => {
        this.isUserAuthenticated = result
      })
    )

    this.subscription.add(
      this.userService.loggedUser$.subscribe((result) => {
        this.userName = result.firstName
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  logout(): void {
    this.userService.logout()
  }

  onClickSearch(keyword: string, categoryId: string): void {
    this.searchClicked.emit({
      categoryId: parseInt(categoryId),
      keyword: keyword,
    })
  }

  pastOrders(): void {
    this.router.navigate(['home/pastorders'])
  }

  navigateToCart(): void {
    this.router.navigate(['home/cart'])
  }
}
