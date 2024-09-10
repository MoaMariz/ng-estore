import {StoreItem} from '../types/storeItem.type'
import {Category} from '../../shared/types/category.type'
import {CategoryService} from './category.service'
import {inject, Injectable} from '@angular/core'
import {Observable, map} from 'rxjs'

@Injectable()
export class CategoriesStoreItem extends StoreItem<Category[]> {
  categoryService = inject(CategoryService)

  constructor() {
    super([])
  }

  async loadCategories() {
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.setValue(categories)
    })
  }

  get categories$(): Observable<Category[]> {
    return this.value$
  }

  get topLevelCategories$(): Observable<Category[]> {
    return this.value$.pipe(
      map((categories) => 
        categories.filter((category) => category.parent_category_id === null)
      )
    )
  }
}
