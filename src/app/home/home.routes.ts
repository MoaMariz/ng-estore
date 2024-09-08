import {Routes} from '@angular/router'
import {ProductsGalleryComponent} from './components/products-gallery/products-gallery.component'
import { ProductdetailsComponent } from './components/productdetails/productdetails.component'
import { CartComponent } from './components/cart/cart.component'

export const routes: Routes = [
      {
        path: 'products',
        component: ProductsGalleryComponent,
      },
      {
        path: 'product/:id',
        component: ProductdetailsComponent
      },
      {
        path: 'cart',
        component: CartComponent
      }
]
