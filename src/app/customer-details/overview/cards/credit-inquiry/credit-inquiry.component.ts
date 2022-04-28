import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {PreviousCredit} from 'src/app/shared/models/credit-report/credit_response';
import {RequestCreditDialogComponent} from '../../../../shared/components/dialogs/request-credit-dialog/request-credit-dialog.component';
import {CustomerProfile} from '../../../../shared/models/customers/customer_profile';
import {CreditReportService} from '../../../../shared/services/credit-report/credit-report.service';
import {ActualCreditReport} from '../../../../shared/models/credit-report/actual_credit_response';
import {AuthorizationService} from '../../../../shared/services/authorization/authorization.service';

@Component({
  selector: 'app-credit-inquiry-card',
  templateUrl: './credit-inquiry.component.html',
  styleUrls: ['../shared.component.scss', './credit-inquiry.component.scss']
})
export class CreditInquiryComponent implements OnInit {
  @Input() customerProfile: CustomerProfile;
  isOpen = false;
  isLoadingCredit = true;
  pdfLoading = false;
  pdfSrc = '';
  creditReport: ActualCreditReport;

  constructor(private route: ActivatedRoute,
              private creditReportService: CreditReportService,
              private authorisationService: AuthorizationService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log('init');
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.getExistingReport(params.get('customerId'));
      });
  }

  getExistingReport(customerId: string): any {
    this.isLoadingCredit = true;
    this.creditReportService.getExistingReport(customerId).toPromise().then((credReport: PreviousCredit[]) => {
        if (credReport.length){
          this.creditReportService.getActualReport(credReport).toPromise().then(resp => {
            this.updateSrc(this.creditReportService.getPDFReport(credReport));
            this.isLoadingCredit = false;
            this.creditReport = resp;
          });
        }
      }).catch(err => {
      console.log(err);
    }).finally(() => {
      this.isLoadingCredit = false;
    });
  }

  creditBureauExists(bureau): boolean{
    if (this.creditReport === undefined) { return false; }
    return this.creditReport.responseGroup.response.find(
      response => response !== undefined).responsedata.find(data => data !== undefined).creditresponse.creditscore.findIndex(cScore =>
      cScore.creditRepositorySourceType.toUpperCase() === bureau.toUpperCase()) !== -1;
  }

  getCreditBureau(bureau): any{
    if (this.creditReport === undefined) { return undefined; }
    return this.creditReport.responseGroup.response.find(
      response => response !== undefined).responsedata.find(data => data !== undefined).creditresponse.creditscore.find(cScore =>
      cScore.creditRepositorySourceType.toUpperCase() === bureau.toUpperCase());
  }

  updateSrc(pdfSrc): any {
      if (this.pdfSrc !== pdfSrc) {
        this.pdfLoading = true;
        this.pdfSrc = pdfSrc;
     }
      this.isOpen = true;
  }

  get isDataAvailable(): boolean {
    return (this.creditReport !== undefined);
  }

  openCreditInquiryDialog(): void {
    const dialogRef = this.dialog.open(RequestCreditDialogComponent, {
      width: '460px',
      data: { customerProfile: this.customerProfile }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.route.paramMap.subscribe(
        (params: ParamMap) => {
          this.getExistingReport(params.get('customerId'));
        });
    });
  }

  authorisationToken(): string{
    return `Bearer ${this.authorisationService.userAccessToken}`;
  }
}
