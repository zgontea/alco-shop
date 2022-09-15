import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UrlProviderService } from '../urlProvider/url-provider.service';
import { SnackBarNotificationUtil } from 'src/app/utils/snack-bar-notification-util';
import { Product } from 'src/app/wrappers/product';
import { CLOSE_BUTTON } from 'src/app/globals';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  public static shoppingCart: Product[] = [];
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  login(email: string, password: string) {
    return this.httpClient
      .post<{
        access_token: string;
        name: string;
        surname: string;
        is_admin: string;
        email: string;
        user_id: string;
      }>(UrlProviderService.login, {
        login: email,
        password: password,
      })
      .subscribe({
        next: (data) => {
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('name', data.name);
          localStorage.setItem('surname', data.surname);
          localStorage.setItem('is_admin', data.is_admin);
          localStorage.setItem('email', data.email);
          localStorage.setItem('user_id', data.user_id);
        },
        error: (error) => {
          SnackBarNotificationUtil.showSnackBarFailure(
            this._snackBar,
            'Niepoprawne dane logowania',
            CLOSE_BUTTON
          );
        },
        complete: () => {
          if (this.isAdmin) this.router.navigateByUrl('/admin-panel');
          else this.router.navigateByUrl('/products');
        },
      });
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('name');
    localStorage.removeItem('surname');
    localStorage.removeItem('is_admin');
    localStorage.removeItem('email');
    localStorage.removeItem('user_id');
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }

  public get isAdmin(): boolean {
    return localStorage.getItem('is_admin') === 'true';
  }
}
