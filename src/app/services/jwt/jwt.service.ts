import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { UrlProviderService } from '../urlProvider/url-provider.service';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.httpClient
      .post<{ access_token: string }>(UrlProviderService.login, {
        login: email,
        password: password,
      })
      .subscribe({
        next: (data) => {
          localStorage.setItem('access_token', data.access_token);
        },
        error: (error) => {
          console.log('Error');
        },
        complete: () => {
          this.router.navigateByUrl('/products');
        },
      });
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }
}
