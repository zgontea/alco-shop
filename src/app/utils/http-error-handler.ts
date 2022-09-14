import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  BAD_REQUEST_ERROR,
  NO_ACCESS_ERROR,
  CLOSE_BUTTON,
  LOGIN_TIME_OUT,
  SESSION_EXPIRED_ERROR,
  ACCOUNT_ALREADY_EXIST,
  CONFLICT,
} from '../globals';
import { SnackBarNotificationUtil } from './snack-bar-notification-util';

export class HttpErrorHandler {
  constructor() {}

  public handleError(error: HttpErrorResponse, snackBar: MatSnackBar) {
    let noAccessStatuses = [401, 403];
    let message = BAD_REQUEST_ERROR;
    if (noAccessStatuses.includes(error.status)) {
      message = NO_ACCESS_ERROR;
    } else if (error.status === LOGIN_TIME_OUT) {
      message = SESSION_EXPIRED_ERROR;
      localStorage.clear();
    } else if (error.status === CONFLICT) {
      message = ACCOUNT_ALREADY_EXIST;
    }
    SnackBarNotificationUtil.showSnackBarFailure(
      snackBar,
      message,
      CLOSE_BUTTON
    );
  }
}
