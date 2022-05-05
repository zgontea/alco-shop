import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UrlProviderService } from '../urlProvider/url-provider.service';
import { EventSnackBarComponent } from 'src/app/components/event-snack-bar/event-snack-bar.component';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    localStorage.removeItem('access_token');
  }

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
          this.showSnackBar('Niepoprawne dane logowania rurku', 'Zamknij');
          console.log('jebac disa');
        },
        complete: () => {
          this.router.navigateByUrl('/products');
        },
      });
  }

  showSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3500,
      panelClass: ['snack-failure'],
    });
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }
}
