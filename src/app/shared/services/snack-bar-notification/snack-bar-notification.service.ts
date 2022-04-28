import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SnackBarNotificationService {

  constructor(private snackBar: MatSnackBar) {
  }

  public displayMessage(message: string, timeout?: number): void {
    this.snackBar.open(`Request Successful: ${message}`, '', {
      duration: timeout ?? environment.snackBarTimeout,
      panelClass: ['mat-toolbar', 'mat-primary']
    });
  }

  public displayError(error: string): void {
    this.snackBar.open(`Something went wrong! ${error?.toString()}`, '', {
      duration: environment.snackBarTimeout,
      panelClass: ['mat-toolbar', 'core-error']
    });
  }
}
