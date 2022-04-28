import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string) {
    console.log('Siema');
    
    return this.httpClient
      .post<{ access_token: string }>('http://25.50.55.41:8090/auth/login', {
        email,
        password,
      })
      .pipe(
        tap((res) => {
          localStorage.setItem('access_token', res.access_token);
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }
}
