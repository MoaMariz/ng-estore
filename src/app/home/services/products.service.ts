import {Injectable} from '@angular/core'
import {ProductListItem} from '../../shared/types/products.type'
import {products} from '../../shared/data/products.data'

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor() {}

  getProductsList(): ProductListItem[] {
    return products
  }
}
