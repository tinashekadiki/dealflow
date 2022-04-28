import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreditReportService } from 'src/app/shared/services/credit-report/credit-report.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-request-credit-dialog',
  templateUrl: './request-credit-dialog.component.html',
  styleUrls: ['./request-credit-dialog.component.scss']
})
export class RequestCreditDialogComponent implements OnInit {

  customercell: string;
  coborrowercustomercell: string;

  reportType = 'HARD';

  isLoading = false;

  creditBureau: any[] = [
    { name: 'Experian', value: 'experian', isChecked: false },
    { name: 'Equifax', value: 'equifax', isChecked: false },
    { name: 'TransUnion', value: 'transunion', isChecked: false }
  ];

  constructor(public dialogRef: MatDialogRef<RequestCreditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private creditReportService: CreditReportService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.isLoading = false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitRequest(): void {
    console.log('submitting');
    this.isLoading = true;
    this.creditReportService.requestCreditInformation(this.processedRequestBody()).then((resp) => {
      this.isLoading = false;
      this.dialogRef.close(resp);
      this.snackBar.open('Order Credit request submitted successfully!', 'Dismiss', {
        duration: environment.snackBarTimeout
      });
      console.log(resp);
    }, (err) => {
      this.isLoading = false;
      this.dialogRef.close();
      const err_message = err.error.error;
      this.snackBar.open(err_message, 'Dismiss', {
        duration: environment.snackBarTimeout
      });
      console.log(err);
    });

  }

  processedRequestBody(): any {
    const creditBureauOpt = {
      sourceSystem: 'WEB',
      inquiryType: this.reportType,
      globalCustomerId: this.data.customerProfile.CustomerPersonalDetails.customerGlobalId,
      relatedTo: this.data.customerProfile.CoBorrower ? this.data.customerProfile.CoBorrower.customerGlobalId : '',
    };
    this.creditBureau.forEach((value) => {
      creditBureauOpt[value.value] = value.isChecked;
    });
    return creditBureauOpt;
  }

  get isReadyToSend(): boolean {
    return !this.isLoading && (this.creditBureau.findIndex(v => v.isChecked) > -1);
  }

  get customerPersonalDetails(): any {
    return this.data.customerProfile?.CustomerPersonalDetails;
  }

  get hasMultipleBureaus(): boolean {
    return this.creditBureau.filter(x => x.isChecked).length > 1;
  }

}
