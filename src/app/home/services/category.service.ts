import {inject, Injectable} from '@angular/core'
import {Category} from '../../shared/types/category.type'
import {HttpClient} from '@angular/common/http'
import {catchError, Observable, throwError} from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private httpClient = inject(HttpClient)

  getAllCategories(): Observable<Category[]> {
    return this.httpClient
      .get<Category[]>('http://localhost:5001/productcategories')
      .pipe(
        catchError((error) => {
          console.log(error)
          return throwError(
            () => new Error('Something went wrong fetching categories.')
          )
        })
      )
  }
}
