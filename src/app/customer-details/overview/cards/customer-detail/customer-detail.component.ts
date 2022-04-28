import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CustomerComplianceProcessList } from '../../../../shared/models/compliance/customer_compliance_process_list';
import { CustomerProfile } from '../../../../shared/models/customers/customer_profile';
import { ComplianceService } from '../../../../shared/services/compliance/compliance.service';
import { AddPurchaseVehicleDialogComponent } from '../../../../shared/components/dialogs/add-purchase-vehicle-dialog/add-purchase-vehicle-dialog.component';
import { AddTradeVehicleDialogComponent } from '../../../../shared/components/dialogs/add-trade-vehicle-dialog/add-trade-vehicle-dialog.component';
import { GenerateFinanceApplicationDialogComponent } from '../generate-finance-application-dialog/generate-finance-application-dialog.component';
import { SendRecordToDmsDialogComponent } from '../../../../shared/components/dialogs/send-record-to-dms-dialog/send-record-to-dms-dialog.component';
import { RedFlagDialogComponent } from './compliance-dialogs/red-flag-dialog/red-flag-dialog.component';
import { ConfirmActionDialogComponent } from 'src/app/shared/components/dialogs/confirm-action-dialog/confirm-action-dialog.component';
import { SearchCoboborrowerDialogComponent } from 'src/app/shared/components/dialogs/search-coboborrower-dialog/search-coboborrower-dialog.component';
import { CreditComplianceDialogComponent } from './compliance-dialogs/credit-compliance-dialog/credit-compliance-dialog.component';
import { environment } from 'src/environments/environment';
import { CustomerRecordsService } from 'src/app/shared/services/customer-records/customer-records.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComplianceProcess } from 'src/app/shared/models/compliance/compliance_processes';
import * as allComplianceProcessesList from '../../../../shared/enums/process.json';
import { CustomerDocumentFolderComponent } from './customer-document-folder/customer-document-folder.component';
import { SendDigitalApplicationDialogComponent } from 'src/app/shared/components/dialogs/send-digital-application-dialog/send-digital-application-dialog.component';
import { SendRecordToCrmDialogComponent } from 'src/app/shared/components/dialogs/send-record-to-crm-dialog/send-record-to-crm-dialog.component';
import { CustomerCompliance } from 'src/app/shared/models/customer-compliance/customer-compliance';
import { CustomerDisclosures } from 'src/app/shared/models/customer-disclosures/customer-disclosures';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['../shared.component.scss'],
})
export class CustomerDetailComponent implements OnInit {
  @Input('customer-profile') set customerProfile(value: CustomerProfile) {
    this._customerProfile = value;
    if (value === undefined) {
      return;
    }
    this._customerProfile.CustomerPersonalDetails.dateOfBirth =
      this.customerRecordsService.formatDate(
        this._customerProfile.CustomerPersonalDetails.dateOfBirth
      );

    // this._customerProfile.CustomerPersonalDetails.socialSecurityNumber =
    //   this.customerRecordsService.formatSsn(
    //     this._customerProfile.CustomerPersonalDetails.socialSecurityNumber
    //   );

    this._customerProfile.CustomerPersonalDetails.licenseExpirationDate =
      this.customerRecordsService.formatDate(
        this._customerProfile.CustomerPersonalDetails.licenseExpirationDate
      );

    console.log(
      this._customerProfile.CustomerPersonalDetails.socialSecurityNumber
    );

    this.mainProcesses = allComplianceProcessesList.processes;
    this.fetchComplianceRecords();
  }

  get customerProfile(): CustomerProfile {
    return this._customerProfile;
  }

  constructor(
    private dialog: MatDialog,
    private complianceService: ComplianceService,
    private customerRecordsService: CustomerRecordsService,
    private snackBar: MatSnackBar
  ) {}

  get customerPersonalDetails(): any {
    return this.customerProfile?.CustomerPersonalDetails;
  }

  get customerContactDetails(): any {
    return this.customerProfile?.CustomerContactDetails;
  }

  get formattedAddress(): any {
    const contactInfo = this.customerContactDetails;
    return (
      (contactInfo?.mailingStreetAddress1
        ? contactInfo.mailingStreetAddress1 + ', '
        : '') +
      (contactInfo?.mailingStreetAddress2
        ? contactInfo.mailingStreetAddress2 + ', '
        : '')
    );
  }

  get cityStateCode(): any {
    const contactInfo = this.customerContactDetails;
    return (
      (contactInfo?.mailingCity ? contactInfo.mailingCity + ', ' : '') +
      (contactInfo?.state ? contactInfo.state + ', ' : '') +
      (contactInfo?.postalCode ? contactInfo.postalCode : '')
    );
  }

  _customerProfile: CustomerProfile;
  dateOfBirth: any;
  isLoadingCompliance = true;
  customerComplianceProcessList: CustomerComplianceProcessList;
  mainProcesses: ComplianceProcess[] = [];
  customerCompliance: CustomerCompliance;
  customerDisclosures: CustomerDisclosures[] = [];
  disclosures = [];
  x;
  processDetails: any = {};
  @Input() isProfileLoading = false;

  ngOnInit(): void {
    this.fetchComplianceRecords();
    this.mainProcesses = allComplianceProcessesList.processes;
    // if (this.customerProfile?.CustomerPersonalDetails?.socialSecurityNumber.length === 0){
    //   this.customerProfile.CustomerPersonalDetails.socialSecurityNumber = null;
    // }
  }

  fetchComplianceRecords(): any {
    console.log('using new endpoint');
    this.complianceService
      .fetchComplianceRecord(this.customerPersonalDetails?.customerGlobalId)
      .subscribe(
        (ccpl: CustomerCompliance) => {
          console.log('Customer Compliance: ', ccpl);
          this.customerCompliance = ccpl;
          this.fetchSignedConsents();
          this.isLoadingCompliance = false;
        },
        (err) => {
          console.log('Customer Compliance Error: ', err);
          this.isLoadingCompliance = false;
        }
      );
  }

  fetchSignedConsents(): any {
    console.log('Customer Consents: ');
    let cellPhone = this.customerContactDetails?.cellPhone.replace('(', '');
    cellPhone = cellPhone.replace(')', '');
    cellPhone = cellPhone.replace(/\-/g, '');
    console.log('The Cellphone', cellPhone);
    this.complianceService
      .fetchSignedConsent(
        this.customerPersonalDetails?.customerGlobalId,
        cellPhone
      )
      .subscribe(
        (signedConsents) => {
          console.log('Customer Consents: ', signedConsents);
          this.customerDisclosures = signedConsents;
          this.disclosures = this.customerDisclosures.map(
            (disclosure) => disclosure.consents?.disclosureName
          );
          console.log('Customer Disclosures: ', this.disclosures);
          this.isLoadingCompliance = false;
        },
        (err) => {
          console.log('Customer Compliance Error: ', err);
          this.isLoadingCompliance = false;
        }
      );
  }

  get expiredLicense(): any {
    return this.customerCompliance?.ExpiredLicense;
  }

  checkExpiredLicense(): any {
    let data = { colorClass: 'neutral', icon: 'hourglass_bottom' };
    switch (this.expiredLicense?.page?.pageId) {
      case 'RFG07':
        data = { colorClass: 'success', icon: 'check_circle' };
      case 'RFG39':
        switch (this.expiredLicense?.resolutionRequestsModel?.page?.pageId) {
          case 'NON00':
            data = { colorClass: 'danger', icon: 'warning' };
            break;
          case 'RFG88':
            data = { colorClass: 'pending', icon: 'check_circle' };
            break;
          case 'OVELA':
            data = { colorClass: 'pending', icon: 'check_circle' };
            break;
          case 'OVELD':
            data = { colorClass: 'danger', icon: 'warning' };
            break;
        }
    }
    return data;
  }

  get idVerification(): any {
    return this.customerCompliance?.IdVerification;
  }

  checkIdVerification(): any {
    let data = { colorClass: 'neutral', icon: 'hourglass_bottom' };
    switch (this.idVerification?.page?.pageId) {
      case 'RFG07':
        if (this.expiredLicense?.page?.pageId != 'RFG39') {
          data = { colorClass: 'success', icon: 'check_circle' };
        } else {
          data = { colorClass: 'pending', icon: 'check_circle' };
        }
        break;
      case 'RFG03':
        switch (this.idVerification?.resolutionRequestsModel?.page?.pageId) {
          case 'NON00':
            data = { colorClass: 'danger', icon: 'warning' };
            break;
          case 'RFG08':
            data = { colorClass: 'pending', icon: 'check_circle' };
            break;
          case 'RFG09':
            data = { colorClass: 'danger', icon: 'warning' };
            break;
          case 'OVRFA':
            data = { colorClass: 'pending', icon: 'check_circle' };
            break;
          case 'OVRFD':
            data = { colorClass: 'danger', icon: 'warning' };
            break;
        }
        break;
    }
    return data;
  }

  get syntheticFraud(): any {
    return this.customerCompliance?.SyntheticFraud;
  }

  checkSyntheticFraud(): any {
    let data = { colorClass: 'neutral', icon: 'hourglass_bottom' };
    switch (this.syntheticFraud?.page?.pageId) {
      case 'SYN07':
        data = { colorClass: 'success', icon: 'check_circle' };
        break;
      case 'SYN03':
        switch (this.syntheticFraud?.resolutionRequestsModel?.page?.pageId) {
          case 'SYN08':
            data = { colorClass: 'pending', icon: 'check_circle' };
            break;
          case 'SYN09':
            data = { colorClass: 'danger', icon: 'warning' };
            break;
          case 'OVSYA':
            data = { colorClass: 'pending', icon: 'check_circle' };
            break;
          case 'OVSYD':
            data = { colorClass: 'danger', icon: 'warning' };
            break;
        }
        break;
      case 'SYN33':
        data = { colorClass: 'danger', icon: 'warning' };
        break;
    }
    return data;
  }

  get regulatoryComplianceMla(): any {
    return this.customerCompliance?.RegulatoryComplianceMla;
  }

  checkRegulatoryComplianceMla(): any {
    let data = { colorClass: 'neutral', icon: 'hourglass_bottom' };
    switch (this.regulatoryComplianceMla?.page?.pageId) {
      case 'OFC07':
        data = { colorClass: 'success', icon: 'check_circle' };
        break;
      case 'OFC03':
        switch (
          this.regulatoryComplianceMla?.regulatoryComplianceOfac?.page?.pageId
        ) {
          case 'OFC08':
            data = { colorClass: 'pending', icon: 'check_circle' };
            break;
          case 'OFC09':
            data = { colorClass: 'pending', icon: 'check_circle' };
            break;
        }
        break;
    }
    return data;
  }

  get regulatoryComplianceOfac(): any {
    return this.customerCompliance?.RegulatoryComplianceOfac;
  }

  checkRegulatoryComplianceOfac(): any {
    let data = { colorClass: 'neutral', icon: 'hourglass_bottom' };
    switch (this.regulatoryComplianceOfac?.page?.pageId) {
      case 'OFC07':
        data = { colorClass: 'success', icon: 'check_circle' };
        break;
      case 'OFC03':
        switch (
          this.regulatoryComplianceOfac?.resolutionRequestsModel?.page?.pageId
        ) {
          case 'OFC08':
            data = { colorClass: 'pending', icon: 'check_circle' };
            break;
          case 'OFC09':
            data = { colorClass: 'pending', icon: 'check_circle' };
            break;
        }
        break;
    }
    return data;
  }

  get applicationDisclosures(): any {
    return this.customerDisclosures;
  }

  checkApplicationDisclosures(): any {
    let data = { colorClass: 'neutral', icon: 'hourglass_bottom' };
    if (this.applicationDisclosures.length > 0) {
      // data = { colorClass: 'pending', icon: 'hourglass_bottom' };
      // if (this.applicationDisclosures.length > 1) {
        data = { colorClass: 'success', icon: 'check_circle' };
      // }
    }
    return data;
  }

  get dataUsageConsents(): any {
    return this.customerDisclosures;
  }

  checkDataUsageConsents(): any {
    let data = { colorClass: 'neutral', icon: 'hourglass_bottom' };
    if (this.dataUsageConsents.length > 0) {
      // data = { colorClass: 'pending', icon: 'hourglass_bottom' };
      // if (this.dataUsageConsents.length > 1) {
        data = { colorClass: 'success', icon: 'check_circle' };
      // }
    }
    return data;
  }

  openSearchCoboborrowerDialogComponent(): void {
    this.dialog.open(SearchCoboborrowerDialogComponent, {
      width: '460px',
      data: { customerId: this.customerProfile?.CustomerPersonalDetails?.id },
    });
  }

  openComplianceDetails(procName: string): any {
    let flag = '';
    const customer =
      this.customerPersonalDetails?.firstName +
      ' ' +
      this.customerPersonalDetails?.lastName;
    const customerGlobalId = this.customerPersonalDetails?.customerGlobalId;
    const procDetail = {};
    const complianceStatus = this.complianceDisplayOptions(procName);
    const customerDisclosures = this.customerDisclosures;
    const disclosures = this.disclosures;
    switch (procName) {
      case 'Application Disclosures':
        return this.dialog.open(CreditComplianceDialogComponent, {
          width: '600px',
          maxHeight: '83vh',
          data: {
            customer,
            customerGlobalId,
            complianceStatus,
            procDetail: this.applicationDisclosures,
            procName,
            hasData: true,
            flag,
            // customerDisclosures,
            disclosures
          },
        });
      case 'Data Usage Consents':
        return this.dialog.open(CreditComplianceDialogComponent, {
          width: '600px',
          maxHeight: '83vh',
          data: {
            customer,
            customerGlobalId,
            complianceStatus,
            procDetail: this.dataUsageConsents,
            procName,
            hasData: true,
            flag,
            customerDisclosures,
            disclosures
          },
        });
      case 'Expired Drivers License':
        flag = 'ExpiredLicense';
        return this.dialog.open(RedFlagDialogComponent, {
          width: '600px',
          maxHeight: '83vh',
          data: {
            customer,
            customerGlobalId,
            complianceStatus,
            procDetail: this.expiredLicense,
            procName,
            hasData: true,
            flag,
          },
        });
      case 'Identity Verification':
        flag = 'IdVerification';
        return this.dialog.open(RedFlagDialogComponent, {
          width: '600px',
          maxHeight: '83vh',
          data: {
            customer,
            customerGlobalId,
            complianceStatus,
            procDetail: this.idVerification,
            procName,
            hasData: true,
            flag,
          },
        });
      case 'Synthetic Fraud':
        flag = 'SyntheticFraud';
        return this.dialog.open(RedFlagDialogComponent, {
          width: '600px',
          maxHeight: '83vh',
          data: {
            customer,
            customerGlobalId,
            complianceStatus,
            procDetail: this.syntheticFraud,
            procName,
            hasData: true,
            flag,
          },
        });
      case 'OFAC':
        flag = 'Ofac';
        return this.dialog.open(RedFlagDialogComponent, {
          width: '600px',
          maxHeight: '83vh',
          data: {
            customer,
            customerGlobalId,
            complianceStatus,
            procDetail: this.regulatoryComplianceOfac,
            procName,
            hasData: true,
            flag,
          },
        });
      case 'Active-Duty - MLA':
        flag = 'Mla';
        return this.dialog.open(RedFlagDialogComponent, {
          width: '600px',
          maxHeight: '83vh',
          data: {
            customer,
            customerGlobalId,
            complianceStatus,
            procDetail: this.regulatoryComplianceMla,
            procName,
            hasData: true,
            flag,
          },
        });
      default:
        return this.dialog.open(RedFlagDialogComponent, {
          width: '600px',
          maxHeight: '83vh',
          data: {
            customer,
            customerGlobalId,
            complianceStatus,
            procDetail,
            procName,
            mainProcesses: this.mainProcesses,
            hasData: true,
            flag,
          },
        });
    }
  }

  complianceDisplayOptions(processName: string): any {
    let data = { colorClass: 'neutral', icon: 'hourglass_bottom' };
    switch (processName) {
      case 'Identity Verification':
        data = this.checkIdVerification();
        break;
      case 'Expired Drivers License':
        data = this.checkExpiredLicense();
        break;
      case 'Synthetic Fraud':
        data = this.checkSyntheticFraud();
        break;
      case 'OFAC':
        data = this.checkRegulatoryComplianceOfac();
        break;
      case 'Active-Duty - MLA':
        data = this.checkRegulatoryComplianceMla();
        break;
      case 'Application Disclosures':
        data = this.checkApplicationDisclosures();
        break;
      case 'Data Usage Consents':
        data = this.checkDataUsageConsents();
        break;
      default:
        data = { colorClass: 'neutral', icon: 'hourglass_bottom' };
    }
    return data;
  }

  hasAnyApplicationDisclosure(currentPages): boolean {
    let match = false;
    const applicationPages = this.mainProcesses
      .find((el) => el.process === 'Application Disclosures')
      .pages.map((el) => el.page);
    currentPages.forEach((el) => {
      if (applicationPages.includes(el)) {
        match = true;
      }
    });
    return match;
  }

  hasAnyDataDisclosure(currentPages): boolean {
    let match = false;
    const dataPages = this.mainProcesses
      .find((el) => el.process === 'Data Usage Consents')
      .pages.map((el) => el.page);
    currentPages.forEach((el) => {
      if (dataPages.includes(el)) {
        match = true;
      }
    });
    return match;
  }

  openAddPurchaseVehicleDialog(): void {
    this.dialog.open(AddPurchaseVehicleDialogComponent, {
      width: '460px',
      data: {
        customerId:
          this.customerProfile?.CustomerPersonalDetails?.customerGlobalId,
      },
    });
  }

  openAddTradeVehicleDialog(): void {
    this.dialog.open(AddTradeVehicleDialogComponent, {
      width: '460px',
      data: this._customerProfile,
    });
  }

  openSendDigitalApplicationDialog(): void {
    this.dialog.open(SendDigitalApplicationDialogComponent, {
      width: '460px',
      data: this._customerProfile,
    });
  }

  openGenerateFinanceApplicationDialog(): void {
    if (!this.customerProfile) {
      return;
    }
    this.dialog.open(GenerateFinanceApplicationDialogComponent, {
      width: '1040px',
      data: this._customerProfile,
    });
  }

  openSendRecordToDMSDialog(): void {
    this.dialog.open(SendRecordToDmsDialogComponent, {
      width: '460px',
      data: this._customerProfile,
    });
  }

  openSendRecordToCRMDialog(): void {
    this.dialog.open(SendRecordToCrmDialogComponent, {
      width: '460px',
      data: {
        customerGlobalId:
          this._customerProfile?.CustomerPersonalDetails.customerGlobalId,
        eventCode: this._customerProfile?.EventCode,
      },
    });
  }

  confirmArchiveCustomer(customerId: string): void {
    const dialogRef = this.dialog.open(ConfirmActionDialogComponent, {
      data: {
        message:
          'You are about to archive a customer and they will no longer appear on this list. Are you sure you want to proceed?',
      },
    });

    dialogRef.afterClosed().subscribe((resp) => {
      if (resp === true) {
        this.customerRecordsService.markAsArchived(customerId).subscribe(
          (markResp) => {
            if (this._customerProfile) {
              this._customerProfile.ComplianceFlag = 'ARCHIVED';
            }

            this.snackBar.open(
              `The customer has been successfully archived.`,
              'Dismiss',
              {
                duration: environment.snackBarTimeout,
              }
            );
          },
          (err) => {
            this.snackBar.open(`Failed to archive the customer.`, 'Dismiss', {
              duration: environment.snackBarTimeout,
            });
          }
        );
      }
    });
  }

  openCustomerFolderDialog(): void {
    console.log(this.customerProfile.CustomerPersonalDetails.customerGlobalId);

    this.dialog.open(CustomerDocumentFolderComponent, {
      width: '800px',
      height: '400px',
      data: this._customerProfile.CustomerPersonalDetails.customerGlobalId,
    });
  }
}
