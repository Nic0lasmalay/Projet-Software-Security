import { Injectable } from '@angular/core';
import {User} from '../../model/user';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';


interface AuthResponse{
  message :string;
  token : string;
  user:User;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  API_URL = "http://localhost:3000/api/auth";

  constructor(private http: HttpClient) {
  }

  registerUser(data: User): Observable<any> {
    return this.http.post<User>(`${this.API_URL}/register`, data)
  }

  login(data: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, data).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('currentUser', JSON.stringify(response.user));
        }
      })
    );
  }

  getUserIdFromToken():number| null
  {
    const token = localStorage.getItem('token');
    if(!token){
      return null;
    }
    try {
      const payloadBase64 = token.split('.')[1];
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);
      return payload.userId;
    }catch (e){
      console.error(e);
      return null;
    }
  }
}


