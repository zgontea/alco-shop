import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackBarNotificationUtil } from 'src/app/utils/snack-bar-notification-util';
import { RegisterService } from '../../services/register/register.service';
import { User } from '../../wrappers/user';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  user: User = new User();
  cpassword = '';
  constructor(
    private registerService: RegisterService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  public ngOnInit(): void {}

  public ngOnDestroy(): void {}

  public comparePasswords(): boolean {
    return this.user.password === this.cpassword;
  }

  public registerUser(): void {
    if (!this.comparePasswords()) {
    } else {
      this.registerService.registerUser(this.user).subscribe({
        complete: () => {
          SnackBarNotificationUtil.showSnackBarSuccess(
            this._snackBar,
            'Konto zostało utworzone pomyslnie',
            'Zaloguj'
          )
            .afterDismissed()
            .subscribe({
              next: () => {
                this.router.navigateByUrl('/login');
              },
            });
        },
        error: () => {
          SnackBarNotificationUtil.showSnackBarSuccess(
            this._snackBar,
            'Wystąpił problem podczas próby utworzenia konta',
            'Zamknij'
          );
        },
      });
    }
  }
}
