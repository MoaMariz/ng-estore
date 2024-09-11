import {inject, Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {LoginToken, User} from '../../shared/types/user.type'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  httpClient = inject(HttpClient)

  createUser(user: User): Observable<any> {
    const url: string = 'http://localhost:5001/users/signup'
    return this.httpClient.post(url, user)
  }

  login(email: string, password: string): Observable<any> {
    const url: string = 'http://localhost:5001/users/login'
    return this.httpClient.post(url, {email: email, password: password})
  }

  activateToken(token: LoginToken): void {
    localStorage.setItem('token', token.token)
    localStorage.setItem('expirationTime', new Date(Date.now() + token.expirationTime * 1000).toISOString())
  }
}
