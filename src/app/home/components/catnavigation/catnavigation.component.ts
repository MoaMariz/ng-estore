import {Component, inject, EventEmitter, Output} from '@angular/core'
import {CategoriesStoreItem} from '../../services/categoriesStoreItem.service'
import {AsyncPipe} from '@angular/common'
import { Category } from '../../../shared/types/category.type'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-catnavigation',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './catnavigation.component.html',
  styleUrl: './catnavigation.component.scss',
})
export class CatnavigationComponent {
  @Output()
  categoryClicked: EventEmitter<number> = new EventEmitter<number>()
  categoriesStoreItem = inject(CategoriesStoreItem)

  onCategoryClick(category: Category): void {
    this.categoryClicked.emit(category.id)
  }
}
