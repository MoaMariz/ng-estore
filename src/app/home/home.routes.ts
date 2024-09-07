import {Routes} from '@angular/router'
import {ProductsGalleryComponent} from './components/products-gallery/products-gallery.component'
import { ProductdetailsComponent } from './components/productdetails/productdetails.component'

export const routes: Routes = [
      {
        path: 'products',
        component: ProductsGalleryComponent,
      },
      {
        path: 'product/:id',
        component: ProductdetailsComponent
      }
]
