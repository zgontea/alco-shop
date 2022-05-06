import { IfStmt } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtService } from '../../services/jwt/jwt.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  public _loginValid = true;
  public username = '';
  public password = '';

  constructor(private jwtService: JwtService, private router: Router, private _snackBar: MatSnackBar) {}

  public ngOnInit(): void {
    if (this.jwtService.loggedIn) {
      this.router.navigateByUrl('/products');
      console.log('Logged in');
    }
  }

  public ngOnDestroy(): void { }

  public onSubmit(): void {
    this.jwtService.login(this.username, this.password);
    this.jwtService.loggedIn ? this._loginValid = true : this._loginValid = false;    
  }

  get loginValid(): boolean {
    return this._loginValid;
  }
}
