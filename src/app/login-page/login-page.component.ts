import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  public loginValid = true;
  public username = '';
  public password = '';

  public ngOnInit(): void { }

  public ngOnDestroy(): void { }

  public login(): void {

  }
}
