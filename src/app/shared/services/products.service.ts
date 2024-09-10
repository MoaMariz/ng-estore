import {inject, Injectable} from '@angular/core'
import {Product} from '../../shared/types/products.type'
import {HttpClient} from '@angular/common/http'
import {catchError, Observable, throwError} from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private httpClient = inject(HttpClient)

  getAllProducts(query?: string): Observable<Product[]> {
    let url: string = 'http://localhost:5001/products'
    if (query) {
      url += '?' + query
    }
    return this.httpClient.get<Product[]>(url).pipe(
      catchError((error) => {
        console.log(error)
        return throwError(
          () => new Error('Something went wrong fetching categories.')
        )
      })
    )
  }

  getProduct(id: number): Observable<Product[]> {
    const url: string = `http://localhost:5001/products/${id}`
    return this.httpClient.get<Product[]>(url)
  }
}
