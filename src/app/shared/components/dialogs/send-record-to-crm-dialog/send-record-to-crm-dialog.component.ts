import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AggregatorRequest} from '../../../models/aggregator/aggregator_request';
import {CdkServiceService} from '../../../services/cdk/cdk-service.service';
import {Product} from '../../../models/profile/settings.model';
import {PreFetchService} from '../../../services/pre-fetch/pre-fetch.service';
import {AuthorizationService} from '../../../services/authorization/authorization.service';

@Component({
  selector: 'app-send-record-to-crm-dialog',
  templateUrl: './send-record-to-crm-dialog.component.html',
  styleUrls: ['./send-record-to-crm-dialog.component.scss']
})
export class SendRecordToCrmDialogComponent implements OnInit {

  cdkRequest: AggregatorRequest;
  customer: any;
  eventcode: string;
  submitting = false;
  loading = false;
  crmList: Product[] = [];
  crm: Product;
  showSingle = false;

  constructor(private cdkService: CdkServiceService,
              public dialogRef: MatDialogRef<SendRecordToCrmDialogComponent>,
              private preFetchService: PreFetchService,
              private auth: AuthorizationService,
              private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.customer = this.data;
    this.setCrms().then((res) => {
      this.crmList = res;
      if (res.length === 1){
        this.showSingle = true;
        this.crm = res[0];
      }
      this.loading = false;
    });
  }

  async setCrms(): Promise<Product[]>{
      return await this.preFetchService.fetchCMSList();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitRequest(): void {
    if (this.crm === undefined){
      console.log('Select CRM');
      return;
    }
    this.submitting = true;

    this.cdkRequest = {
      branchId: this.auth.activeBranch.branchId,
      globalCustomerId: this.customer?.CustomerPersonalDetails.customerGlobalId,
      flag: this.crm.name,
      eventCode: this.customer?.EventCode,
      productSku: this.crm.productSku
    };

    this.submitting = true;

    this.cdkService.sendToAggregator(this.cdkRequest).subscribe(res => {
      console.log(res);
      this.snackBar.open('Request to submit customer data to CRM has been sent successfully', 'Dismiss', {
        duration: 5000
      });
      this.submitting = false;
      this.dialogRef.close({success: true});
    }, (err) => {
      this.submitting = false;
      this.snackBar.open('Unable to submit customer data to CRM. Please try again.', 'Dismiss', {
        duration: 5000
      });
      console.warn(err);
    });

  }

}
