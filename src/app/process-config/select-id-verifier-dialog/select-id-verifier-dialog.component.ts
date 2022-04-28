import {Component, OnInit} from '@angular/core';
import {IDVerifier} from '../../shared/models/aggregator/aggregator_request';
import {PreFetchService} from '../../shared/services/pre-fetch/pre-fetch.service';
import {CdkServiceService} from '../../shared/services/cdk/cdk-service.service';
import {SnackBarNotificationService} from '../../shared/services/snack-bar-notification/snack-bar-notification.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-select-id-verifier-dialog',
  templateUrl: './select-id-verifier-dialog.component.html',
  styleUrls: ['./select-id-verifier-dialog.component.scss']
})
export class SelectIdVerifierDialogComponent implements OnInit {

  idVerifiers: IDVerifier[];
  idVerifier: IDVerifier;
  isLoading = false;

  constructor(private preFetchService: PreFetchService,
              public dialogRef: MatDialogRef<SelectIdVerifierDialogComponent>,
              private cdkService: CdkServiceService, private snackBar: SnackBarNotificationService) {
  }

  ngOnInit(): void {
    this.setIdVerifiers().then(() => console.log('ID Verifiers'));
  }

  private async setIdVerifiers(): Promise<any> {
    if (this.preFetchService.idVerifiers === undefined) {
      this.idVerifiers = await this.preFetchService.fetchIdVerifiers();
    } else {
      this.idVerifiers = this.preFetchService.idVerifiers;
    }
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  setIdVerifier(): Promise<any> {
    if (this.idVerifier === undefined){
      return;
    }
    else{
      this.isLoading = true;
      return this.cdkService.setIdVerifier(this.idVerifier.verifierId).then(res => {
        console.log(res);
        this.snackBar.displayMessage('Successfully updated ID verifier');
      }).catch(err => {
        console.warn(err);
        this.snackBar.displayError(err.error);
      }).finally(() => {
        this.isLoading = false;
      });
    }
  }
}
