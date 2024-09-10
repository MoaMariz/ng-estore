import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../shared/types/user.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpClient = inject(HttpClient)
  
  createUser(user: User): Observable<any> {
    const url: string = 'http://localhost:5001/home/signup'
    return this.httpClient.post(url, user)
  }
}
