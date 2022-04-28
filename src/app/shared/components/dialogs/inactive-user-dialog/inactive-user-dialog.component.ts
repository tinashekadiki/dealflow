import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthorizationService } from 'src/app/shared/services/authorization/authorization.service';

@Component({
  selector: 'app-inactive-user-dialog',
  templateUrl: './inactive-user-dialog.component.html',
  styleUrls: ['./inactive-user-dialog.component.scss']
})
export class InactiveUserDialogComponent implements OnInit {

  countDownSec: number;
  interval;

  constructor(public dialogRef: MatDialogRef<InactiveUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.countDownSec = this.data.countdown

    this.interval = setInterval(() => {
      console.log(this.countDownSec)
      if (this.countDownSec == 0) {
        clearInterval(this.interval)
        this.dialogRef.close("timed_out")
      }
      this.countDownSec--;
    }, 1000)

  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    if (this.interval != undefined) {
      clearInterval(this.interval)
    }

  }

}
