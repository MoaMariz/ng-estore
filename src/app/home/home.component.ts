import { Component, inject } from '@angular/core';
import { HeaderComponent } from "./components/header/header.component";
import { CatnavigationComponent } from "./components/catnavigation/catnavigation.component";
import { SidenavigationComponent } from "./components/sidenavigation/sidenavigation.component";
import { ProductsComponent } from "./components/products/products.component";
import { CategoriesStoreItem } from './services/categoriesStoreItem.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, CatnavigationComponent, SidenavigationComponent, ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers:[CategoriesStoreItem]
})
export class HomeComponent {

  categoryStoreItem = inject(CategoriesStoreItem)
  constructor(){
    this.categoryStoreItem.loadCategories()
  }
}
