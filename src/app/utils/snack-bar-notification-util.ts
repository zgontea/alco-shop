import { MatSnackBar } from '@angular/material/snack-bar';

export class SnackBarNotificationUtil {
  constructor() {}

  public static showSnackBarFailure(
    snackBar: MatSnackBar,
    message: string,
    action: string
  ) {
    return snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['snack-failure'],
      verticalPosition: 'top',
    });
  }

  public static showSnackBarSuccess(
    snackBar: MatSnackBar,
    message: string,
    action: string
  ) {
    return snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['snack-success'],
      verticalPosition: 'top',
    });
  }

  public static showSnackBarInfo(
    snackBar: MatSnackBar,
    message: string,
    action: string
  ) {
    return snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['snack-info'],
      verticalPosition: 'top',
    });
  }
}
