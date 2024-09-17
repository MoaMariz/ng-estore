import {Routes} from '@angular/router'
import {ProductsGalleryComponent} from './components/products-gallery/products-gallery.component'
import { ProductdetailsComponent } from './components/productdetails/productdetails.component'
import { CartComponent } from './components/cart/cart.component'
import { SignupComponent } from '../shared/auth/signup/signup.component'
import path from 'path'
import { LoginComponent } from '../shared/auth/login/login.component'
import { PastordersComponent } from './components/pastorders/pastorders.component'

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
      },
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'pastorders',
        component: PastordersComponent
      }
]
