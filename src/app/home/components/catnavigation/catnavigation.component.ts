import {Component, DestroyRef, inject} from '@angular/core'
import { Category } from '../../../shared/types/category.type'
import { CategoryService } from '../../services/category.service'

@Component({
  selector: 'app-catnavigation',
  standalone: true,
  imports: [],
  templateUrl: './catnavigation.component.html',
  styleUrl: './catnavigation.component.scss',
})
export class CatnavigationComponent {
  categories: Category[] = []
  categoryService = inject(CategoryService)
  private destroyRef = inject(DestroyRef)
}
