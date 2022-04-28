import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AggregatorRequest } from '../../../models/aggregator/aggregator_request';
import { CustomerProfile } from '../../../models/customers/customer_profile';
import { CdkServiceService } from '../../../services/cdk/cdk-service.service';
import {PreFetchService} from '../../../services/pre-fetch/pre-fetch.service';
import {Product} from '../../../models/profile/settings.model';
import {AuthorizationService} from "../../../services/authorization/authorization.service";


@Component({
  selector: 'app-send-record-to-dms-dialog',
  templateUrl: './send-record-to-dms-dialog.component.html',
  styleUrls: ['./send-record-to-dms-dialog.component.scss']
})
export class SendRecordToDmsDialogComponent implements OnInit {

  cdkRequest: AggregatorRequest;
  customer: CustomerProfile;
  dms: Product;
  products: Product[] = [];
  submitting = false;
  showSingle = false;
  loading = false;

  constructor(private cdkService: CdkServiceService,
              public dialogRef: MatDialogRef<SendRecordToDmsDialogComponent>,
              private preFetchService: PreFetchService,
              private auth: AuthorizationService,
              private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: CustomerProfile) { }

  ngOnInit(): void {
    this.customer = this.data;
    this.loading = true;
    this.setDmses().then((res) => {
      this.products = res;
      if (res.length === 1){
        this.showSingle = true;
        this.dms = res[0];
      }
      console.log(this.products);
      this.loading = false;
    });
  }

  async setDmses(): Promise<Product[]>{
    return await this.preFetchService.fetchDMSList();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitRequest(): void {
    if (this.products === undefined){
      return;
    }
    this.submitting = true;
    this.cdkRequest = {
      branchId: this.auth.activeBranch.branchId,
      globalCustomerId: this.customer?.CustomerPersonalDetails.customerGlobalId,
      flag: this.dms.name,
      eventCode: this.customer?.EventCode,
      productSku: this.dms.productSku
    };

    this.cdkService.sendToAggregator(this.cdkRequest).subscribe(res => {
      // console.log(res);
      this.snackBar.open('Request to submit customer data to DMS has been sent successfully', 'Dismiss', {
        duration: 5000
      });
      this.dialogRef.close({ success: true });
    }, (err) => {
      this.submitting = false;
      this.snackBar.open('Unable to submit customer data to DMS. Please try again.', 'Dismiss', {
        duration: 5000
      });
      // console.log(err);
    });

  }

}
