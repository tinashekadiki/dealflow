import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { State } from '../../../enums/states.enum';
import { Country } from '../../../enums/countries.enum';
import { CustomerProfile } from '../../../models/customers/customer_profile';
import { CreditReportService } from '../../../services/credit-report/credit-report.service'
import { Borrowers } from '../../../models/consent-request/borrowers';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-send-digital-application-dialog',
  templateUrl: './send-digital-application-dialog.component.html',
  styleUrls: ['./send-digital-application-dialog.component.scss']
})
export class SendDigitalApplicationDialogComponent implements OnInit {

  customercell: string;
  coborrowercustomercell: string;

  reportType: string = 'hard_inquiry';
  countryCode = '1';

  isLoading = false;

  creditBureau: any[] = [
    { name: 'Experian', value: 'experian', isChecked: false },
    { name: 'Equifax', value: 'equifax', isChecked: false },
    { name: 'TransUnion', value: 'transunion', isChecked: false }
  ];

  requestBody: any = {
    'coborrowerglobalcustomerid': '',
    'coborrowercustomercell': ''
  };

  constructor(public dialogRef: MatDialogRef<SendDigitalApplicationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private creditReportService: CreditReportService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    console.log("customer cell ellie is",this.data);
    this.customercell=this.data?.CustomerContactDetails.cellPhone;
    this.coborrowercustomercell=this.data?.CoBorrower.phoneNumber;

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitRequest() {
    this.isLoading = true;
    this.creditReportService.sendDigitalApp(this.processedRequestBody()).subscribe((resp) => {
      this.isLoading = false;
      this.dialogRef.close();
      this.snackBar.open('Digital application request submitted successfully!', 'Dismiss', {
        duration: environment.snackBarTimeout
      });
      console.log(resp);
    }, (err) => {
      this.isLoading = false;
      let err_message = "Failed to submit an 'order credit' request.";

      if(err.status == 417){
        err_message = err.error.error;
      }

      this.snackBar.open(err_message, 'Dismiss', {
        duration: environment.snackBarTimeout
      })
      console.log(err);
    });

  }

  processedRequestBody() {
    let custArray = []
    let creditBureauOpt = {};
    let profileIsCoBorrower =  this.data.relationType == "CoBorrower";

    let borrowerObj = {
      "coBorrower": profileIsCoBorrower,
      "formName": "digital application",
      "linkedTo": "",
    }
    let coBorrowerObj = {
      "coBorrower": !profileIsCoBorrower,
      "formName": "digital application",
      "linkedTo": "",
    }


    borrowerObj['globalCustomerId'] = this.data.CustomerPersonalDetails.customerGlobalId;
   // borrowerObj['phoneNumber']=this.data.CustomerContactDetails.cellPhone;
    borrowerObj['phoneNumber'] = this.countryCode + this.customercell;

    // this.requestBody['inquirytype'] = (this.hasCoBorrower) ? 'Joint' : 'Individual';
    // this.requestBody['inquiryrequest'] = (this.hasMultipleBureaus)?'Merge':'Other';
    this.creditBureau.forEach((value) => {
      creditBureauOpt[value.value] = this.booleanToYN(value.isChecked);
    });

    if (this.hasCoBorrower) {
      borrowerObj["linkedTo"] = this.data.CoBorrower.customerGlobalId;
      coBorrowerObj['globalCustomerId'] = this.data.CoBorrower.customerGlobalId;
      coBorrowerObj['phoneNumber'] = this.countryCode + this.coborrowercustomercell;
      coBorrowerObj['linkedTo'] = this.data.CustomerPersonalDetails.customerGlobalId;
      custArray.push({...coBorrowerObj,...creditBureauOpt});
    }

    custArray.unshift({...borrowerObj,...creditBureauOpt});

    return custArray;
  }

  get isReadyToSend() {
    let resp = !this.isLoading && this.customercell?.length == 10 && ((this.hasCoBorrower) ? (this.coborrowercustomercell?.length == 10) : true);

    return resp;
  }

  get customerPersonalDetails() {
    console.log(this.data?.CustomerPersonalDetails);
    return this.data?.CustomerPersonalDetails;
  }



  get coBorrowerDetails() {
    return this.data?.CoBorrower;
  }

  get hasCoBorrower(): boolean {
    return this.coBorrowerDetails != null || this.coBorrowerDetails != undefined;
  }

  get hasMultipleBureaus(): boolean {
    return this.creditBureau.filter(x => x.isChecked).length > 1;
  }


  booleanToYN(value: boolean): string {
    return (value) ? 'Y' : 'N';
  }

}
