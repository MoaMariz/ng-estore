import {Component, DestroyRef, inject, OnInit} from '@angular/core'
import {Category} from '../../../shared/types/category.type'
import {CategoryService} from '../../services/category.service'
import {NgFor} from '@angular/common'

@Component({
  selector: 'app-sidenavigation',
  standalone: true,
  imports: [NgFor],
  templateUrl: './sidenavigation.component.html',
  styleUrl: './sidenavigation.component.scss',
})
export class SidenavigationComponent implements OnInit {
  categories: Category[] = []
  categoryService = inject(CategoryService)
  private destroyRef = inject(DestroyRef)

  ngOnInit() {
    const subscription = this.categoryService
      .getAllCategories()
      .subscribe((categories) => {
        this.categories = categories
      })

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe()
    })
  }

  getCategories(parentCategoryId?: number): Category[] {
    return this.categories.filter((category) =>
      parentCategoryId
        ? category.parent_category_id === parentCategoryId
        : category.parent_category_id === null
    )
  }
}
