import { Injectable } from '@angular/core';
import {User} from '../../model/user';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registerUser(data:User): Observable<any> {
    return this.http.post<User>('http://localhost:3000/api/auth/register', data)
  }
}
