import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CLOSE_BUTTON } from 'src/app/globals';
import { HttpErrorHandler } from 'src/app/utils/http-error-handler';
import { SnackBarNotificationUtil } from 'src/app/utils/snack-bar-notification-util';
import { RegisterService } from '../../services/register/register.service';
import { User } from '../../wrappers/user';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent
  extends HttpErrorHandler
  implements OnInit, OnDestroy
{
  user: User = new User();
  cpassword = '';
  constructor(
    private registerService: RegisterService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    super();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  comparePasswords(): boolean {
    return this.user.password === this.cpassword;
  }

  validateNameAndSurname(): boolean {
    var letters = /^[A-Za-z]+$/;
    if (this.user.name.match(letters) && this.user.surname.match(letters)) {
      return true;
    } else {
      return false;
    }
  }

  validatePhoneNumber(): boolean {
    return Boolean(this.user.phone
      .toLowerCase()
      .match(
        /^[1-9]\d*$/
      ));
  }

  validateEmail(): boolean {
    return Boolean(this.user.email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ));
  }

  validateForm(): boolean {
    let message = '';
    let valid = true;
    if (!this.comparePasswords()) {
      message = 'Hasła nie są takie same'
      valid = false;
    }
    if (!this.validateNameAndSurname()) {
      message = 'Imię i nazwisko nie może zawierać cyfr'
      valid = false;
    }
    if (!this.validatePhoneNumber()) {
      message = 'Niepoprawny format numeru telefonu'
      valid = false;
    }
    if (!this.validateEmail()) {
      message = 'Niepoprawny format adresu email'
      valid = false;
    }

    if (!valid) {
      SnackBarNotificationUtil.showSnackBarInfo(
        this.snackBar,
        message,
        CLOSE_BUTTON
      )
    }
    return valid;
  }

  registerUser(): void {
    if (!this.validateForm()) return;
    this.registerService.registerUser(this.user).subscribe({
      complete: () => {
        SnackBarNotificationUtil.showSnackBarSuccess(
          this.snackBar,
          'Konto zostało utworzone pomyślnie',
          'Zaloguj'
        )
          .afterDismissed()
          .subscribe({
            next: () => {
              this.router.navigateByUrl('/login');
            },
          });
      },
      error: (error: HttpErrorResponse) => {
        this.handleError(error, this.snackBar);
      },
    });
  }
}
