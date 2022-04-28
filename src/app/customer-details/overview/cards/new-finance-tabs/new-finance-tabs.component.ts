import { Component, Input, OnInit } from '@angular/core';
import { CustomerProfile } from '../../../../shared/models/customers/customer_profile';
import { CustomerDigitalApplication } from '../../../../shared/models/customers/customer_digital_application';
import { CustomerRecordsService } from '../../../../shared/services/customer-records/customer-records.service';
import { FormControl, FormGroup } from '@angular/forms';
import { State } from '../../../../shared/enums/states.enum';
import { Country } from '../../../../shared/enums/countries.enum';
import { MaritalStatus } from '../../../../shared/enums/marital_statuses.enum';
import { EducationalLevel } from '../../../../shared/enums/educational_levels.enum';
import { SnackBarNotificationService } from '../../../../shared/services/snack-bar-notification/snack-bar-notification.service';
import { InventoryService } from '../../../../shared/services/inventory/inventory.service';
import { TradeInVehicleResp } from '../../../../shared/models/vehicle-inventory/trade_in_vehicle';
import { PurchaseVehicle } from '../../../../shared/models/vehicle-inventory/purchase_vehicle';
import { AddPurchaseVehicleDialogComponent } from '../../../../shared/components/dialogs/add-purchase-vehicle-dialog/add-purchase-vehicle-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmActionDialogComponent } from 'src/app/shared/components/dialogs/confirm-action-dialog/confirm-action-dialog.component';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-finance-tabs',
  templateUrl: './new-finance-tabs.component.html',
  styleUrls: ['./new-finance-tabs.component.scss']
})
export class NewFinanceTabsComponent implements OnInit {
  @Input() customerProfile: CustomerProfile;
  @Input() totalPrice: any;
  @Input() totalTrade: any;

  selectedIndex = 0;
  states = State;
  countries = Country;
  maritalStatuses = MaritalStatus;
  applicationDetails: any = {};
  financeApplicationForm: FormGroup;
  educationalLevels: EducationalLevel;
  tradeInVehicles: TradeInVehicleResp[];
  purchaseVehicles: PurchaseVehicle[];

  constructor(private customerRecordsService: CustomerRecordsService,
    private snackBar: SnackBarNotificationService,
    private inventoryService: InventoryService,
    private snack: MatSnackBar,
    private dialog: MatDialog) {
    this.financeApplicationForm = new FormGroup({
      additionalIncome: new FormControl(''),
      additionalIncomeSource: new FormControl(''),
      address: new FormControl(''),
      annualIncome: new FormControl(''),
      bankruptcy: new FormControl(''),
      bankruptcyDate: new FormControl(''),
      birthday: new FormControl(''),
      blcTransactionId: new FormControl(''),
      branchId: new FormControl(''),
      canPreview: new FormControl(''),
      city: new FormControl(''),
      completed: new FormControl(''),
      confirmedEmailAddress: new FormControl(''),
      createdAt: new FormControl(''),
      driversLicenceState: new FormControl(''),
      driversLicenseNumber: new FormControl(''),
      educationLevel: new FormControl(''),
      email: new FormControl(''),
      employerName: new FormControl(''),
      employmentStatus: new FormControl(''),
      equifax: new FormControl(''),
      eventId: new FormControl(''),
      experian: new FormControl(''),
      firstName: new FormControl(''),
      globalCustomerId: new FormControl(''),
      housingStatus: new FormControl(''),
      id: new FormControl(''),
      jobTitle: new FormControl(''),
      lastName: new FormControl(''),
      lease: new FormControl(''),
      maritalStatus: new FormControl(''),
      middleName: new FormControl(''),
      monthlyMortgage: new FormControl(''),
      monthlyRent: new FormControl(''),
      numberOfDependents: new FormControl(''),
      otherPhoneNumber: new FormControl(''),
      ownership: new FormControl(''),
      parentId: new FormControl(''),
      peviousCity: new FormControl(''),
      phoneNumber: new FormControl(''),
      preferredContactMethod: new FormControl(''),
      preferredLanguage: new FormControl(''),
      prefix: new FormControl(''),
      previousAddress: new FormControl(''),
      previousAnnualIncome: new FormControl(''),
      previousEmployerName: new FormControl(''),
      previousEmploymentEndDate: new FormControl(''),
      previousEmploymentStartDate: new FormControl(''),
      previousJobTitle: new FormControl(''),
      previousPhoneNumber: new FormControl(''),
      previousState: new FormControl(''),
      previousZip: new FormControl(''),
      relatedTo: new FormControl(''),
      relatedToCanPreview: new FormControl(''),
      relatedToCompleted: new FormControl(''),
      relation: new FormControl(''),
      relationship: new FormControl(''),
      reposession: new FormControl(''),
      reposessionDate: new FormControl(''),
      requestType: new FormControl(''),
      ssn: new FormControl(''),
      startDate: new FormControl(''),
      state: new FormControl(''),
      suffix: new FormControl(''),
      timeAtAddressMonths: new FormControl(''),
      timeAtAddressYears: new FormControl(''),
      title: new FormControl(''),
      transactionId: new FormControl(''),
      transunion: new FormControl(''),
      workPhoneNumber: new FormControl(''),
      zip: new FormControl(''),
      country: new FormControl('')
    });
  }

  ngOnInit(): void {
    const template = document.getElementById('newFinanceTabs');
    template.addEventListener('scroll', event => {
      console.log('scrolling');
      const element = event.target;
      if (template.scrollHeight - template.scrollTop === template.clientHeight) {
        console.log('scrolled');
      }
    });
    this.getPurchaseVehicle();
    this.getTradeInVehicle();
    this.customerRecordsService.getCustomerDigitalApplication(this.customerProfile).subscribe(
      (digitalApplication: CustomerDigitalApplication) => {
        this.updateFinanceApplicationForm(digitalApplication);
        console.log("Digital Application: ", digitalApplication);
      });
  }

  selectTab(index): void {
    this.selectedIndex = index;
  }

  updateFinanceApplicationForm(digitalApplication: CustomerDigitalApplication): void {
    digitalApplication.birthday = this.customerRecordsService.formatDate(digitalApplication.birthday, 'input');
    this.financeApplicationForm.patchValue({
      ...digitalApplication
    });
    this.financeApplicationForm.patchValue({
      housingStatus: digitalApplication.housingStatus.name,
      employmentStatus: digitalApplication.employmentStatus.name,
      maritalStatus: digitalApplication.maritalStatus.name,
      additionalIncomeSource: digitalApplication?.additionalIncomeSource?.name ?? '',
      educationLevel: digitalApplication.educationLevel.name
    });
    console.log(this.financeApplicationForm.value);
    console.log('Bankruptcy:', this.financeApplicationForm.value.bankruptcy);
  }


  getTradeInVehicle(): void {
    this.inventoryService.getCustomerTradeInVehicle(this.customerProfile?.CustomerPersonalDetails?.customerGlobalId)
      .toPromise().then(tradeInV => {
        this.tradeInVehicles = tradeInV ?? [];
      }).catch(err => {
        this.snackBar.displayMessage('Failed to load trade in vehicle data.');
      });
  }

  getPurchaseVehicle(): void {
    this.inventoryService.getCustomerPurchaseVehicle(this.customerProfile?.CustomerPersonalDetails?.customerGlobalId)
      .toPromise().then(pv => {
        this.purchaseVehicles = pv ?? [];
      }).catch(err => {
        this.snackBar.displayMessage('Failed to load purchase in vehicle data.');
      });
  }

  openTradeInVehicle(): void {
  }

  submitApplication(): void {
  }

  handleScroll(event): void {
    console.log(event);
  }

  openAddPurchaseVehicle(): any {
    console.log(this.financeApplicationForm.value.globalCustomerId);
    return this.dialog.open(AddPurchaseVehicleDialogComponent, {
      width: '460px',
      data: { customerId: this.financeApplicationForm.value.globalCustomerId }
    });
  }

  openDeleteConfirmationDialog(vin: string) {
    const dialogRef = this.dialog.open(ConfirmActionDialogComponent, {
      data: { message: 'You are about to delete a trade in vehicle previously added. Are you sure you want to remove it?' }
    });

    dialogRef.afterClosed().subscribe(resp => {
      if (resp === true) {
        var payload = {
          vin: vin
        }
        this.inventoryService.deleteTradeVehicle(payload).subscribe((delPurchaseVehicle) => {
          console.log(delPurchaseVehicle);
          this.snack.open('Successfully deleted the trade vehicle record.', 'Dismiss', {
            duration: environment.snackBarTimeout
          });
          this.getTradeInVehicle()
        }, (err) => {
          this.snack.open('Failed to delete the trade vehicle record.', 'Dismiss', {
            duration: environment.snackBarTimeout
          });
          this.getTradeInVehicle()
        });
      }
    });
  }
}
