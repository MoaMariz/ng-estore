import {Component, DestroyRef, inject, OnInit} from '@angular/core'
import {CategoriesStoreItem} from '../../services/categoriesStoreItem.service'
import {AsyncPipe} from '@angular/common'

@Component({
  selector: 'app-catnavigation',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './catnavigation.component.html',
  styleUrl: './catnavigation.component.scss',
})
export class CatnavigationComponent {
  categoriesStoreItem = inject(CategoriesStoreItem)
}
