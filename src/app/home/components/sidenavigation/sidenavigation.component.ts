import {Component, inject} from '@angular/core'
import {Category} from '../../../shared/types/category.type'
import {CategoryService} from '../../services/category.service'
import { NgFor } from '@angular/common'

@Component({
  selector: 'app-sidenavigation',
  standalone: true,
  imports: [NgFor],
  templateUrl: './sidenavigation.component.html',
  styleUrl: './sidenavigation.component.scss',
})
export class SidenavigationComponent {
  categories: Category[] = []
  categoryService = inject(CategoryService)

  constructor() {
    this.categories = this.categoryService.getAllCategories()
  }

  getCategories(parentCategoryId?: number): Category[] {
    return this.categories.filter(category => category.parent_category_id === parentCategoryId)
  }
}
