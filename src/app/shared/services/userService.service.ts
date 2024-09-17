import {inject, Injectable, Inject, PLATFORM_ID} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable, BehaviorSubject} from 'rxjs'
import {LoginToken, User, LoggedUser} from '../../shared/types/user.type'
import {isPlatformBrowser} from '@angular/common'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false)
  private loggedUser: BehaviorSubject<LoggedUser> = new BehaviorSubject(
    <LoggedUser>{}
  )
  private isBrowser: boolean
  private autoLogoutTimer: any
  private authToken: string

  httpClient = inject(HttpClient)

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId)
    if (this.isBrowser) {
      this.loadToken()
    }
  }

  get isUserAuthenticated(): boolean {
    return this.isAuthenticated.value
  }

  get isUserAuthenticated$(): Observable<boolean> {
    return this.isAuthenticated.asObservable()
  }

  get loggedUser$(): Observable<LoggedUser> {
    return this.loggedUser.asObservable()
  }

  get loggedInUser(): LoggedUser { 
    return this.loggedUser.value
  }

  get token(): string {
    return this.authToken
  }

  createUser(user: User): Observable<any> {
    const url: string = 'http://localhost:5001/users/signup'
    return this.httpClient.post(url, user)
  }

  login(email: string, password: string): Observable<any> {
    const url: string = 'http://localhost:5001/users/login'
    return this.httpClient.post(url, {email: email, password: password})
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.clear()
    }
    this.isAuthenticated.next(false)
    this.loggedUser.next(<LoggedUser>{})
    clearTimeout(this.autoLogoutTimer)
  }

  private setAutoLogoutTimer(duration: number): void {
    this.autoLogoutTimer = setTimeout(() => {
      this.logout()
    }, duration)
  }

  loadToken(): void {
    if (this.isBrowser) {
      const token: string | null = localStorage.getItem('token')
      const expirationTime: string | null =
        localStorage.getItem('expirationTime')
      if (!token || !expirationTime) {
        return
      } else {
        const expiresIn: number =
          new Date(expirationTime).getTime() - new Date().getTime()
        if (expiresIn > 0) {
          const firstName: string | null = localStorage.getItem('firstName')
          const lastName: string | null = localStorage.getItem('lastName')
          const address: string | null = localStorage.getItem('address')
          const country: string | null = localStorage.getItem('country')
          const city: string | null = localStorage.getItem('city')
          const email: string | null = localStorage.getItem('email')

          const user: LoggedUser = {
            firstName: firstName !== null ? firstName : '',
            lastName: lastName !== null ? lastName : '',
            address: address !== null ? address : '',
            country: country !== null ? country : '',
            city: city !== null ? city : '',
            email: email !== null ? email : '',
          }

          this.isAuthenticated.next(true)
          this.loggedUser.next(user)
          this.setAutoLogoutTimer(expiresIn)
          this.authToken = token
        } else {
          this.logout()
        }
      }
    }
  }

  activateToken(token: LoginToken): void {
    if (this.isBrowser) {
      localStorage.setItem('token', token.token)
      localStorage.setItem(
        'expirationTime',
        new Date(Date.now() + token.expirationTime * 1000).toISOString()
      )
      localStorage.setItem('firstName', token.user.firstName)
      localStorage.setItem('lastName', token.user.lastName)
      localStorage.setItem('address', token.user.address)
      localStorage.setItem('country', token.user.country)
      localStorage.setItem('city', token.user.city)
      localStorage.setItem('email', token.user.email)
    }

    this.isAuthenticated.next(true)
    this.loggedUser.next(token.user)
    this.setAutoLogoutTimer(token.expirationTime * 1000)
    this.authToken = token.token
  }
}
