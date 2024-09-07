import { Component, inject } from '@angular/core';
import { SidenavigationComponent } from "../sidenavigation/sidenavigation.component";
import { ProductsComponent } from "../products/products.component";
import { ProductStoreItem } from '../../services/productsStoreItem.service';

@Component({
  selector: 'app-products-gallery',
  standalone: true,
  imports: [SidenavigationComponent, ProductsComponent],
  templateUrl: './products-gallery.component.html',
  styleUrl: './products-gallery.component.scss'
})
export class ProductsGalleryComponent {
  private productsStoreItem = inject(ProductStoreItem)

  onSelectSubCategory(subCategoryId: number): void {
    this.productsStoreItem.loadProducts('subcategoryid=' + subCategoryId)
  }
}
