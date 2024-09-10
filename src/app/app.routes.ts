import {Routes} from '@angular/router'
import {NotFoundComponent} from './home/components/not-found/not-found.component'
import {routes as homeRoutes} from './home/home.routes'

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((mod) => mod.HomeComponent),
    children: homeRoutes,
  },
  {path: '', redirectTo: '/home/products', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent},
]
