import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core'
import {Category} from '../../../shared/types/category.type'
import {CategoriesStoreItem} from '../../../shared/services/categoriesStoreItem.service'
import {CommonModule} from '@angular/common'
import {RouterLink} from '@angular/router'

@Component({
  selector: 'app-sidenavigation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidenavigation.component.html',
  styleUrl: './sidenavigation.component.scss',
})
export class SidenavigationComponent implements OnInit {
  @Output()
  subCategoryClicked: EventEmitter<number> = new EventEmitter<number>()
  categories: Category[] = []
  categoriesStoreItem = inject(CategoriesStoreItem)
  private destroyRef = inject(DestroyRef)

  ngOnInit() {
    const subscription = this.categoriesStoreItem.categories$.subscribe(
      (categories) => {
        this.categories = categories
      }
    )

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe()
    })
  }

  onSubCategoryClick(subCategory: Category): void {
    this.subCategoryClicked.emit(subCategory.id)
  }
  getCategories(parentCategoryId?: number): Category[] {
    return this.categories.filter((category) =>
      parentCategoryId
        ? category.parent_category_id === parentCategoryId
        : category.parent_category_id === null
    )
  }
}
