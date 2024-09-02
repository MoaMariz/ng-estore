import { Injectable } from '@angular/core';
import { HomeComponent } from '../home.component';
import { Category } from '../../shared/types/category.type';
import { categories } from '../../shared/sampleData/categories.data';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  getAllCategories(): Category[] {
    return categories
  }
}
