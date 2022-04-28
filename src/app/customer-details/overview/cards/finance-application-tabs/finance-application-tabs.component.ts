import {Component, Input, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

import {State} from 'src/app/shared/enums/states.enum';
import {Country} from 'src/app/shared/enums/countries.enum';
import {EducationalLevel} from 'src/app/shared/enums/educational_levels.enum';
import {MaritalStatus} from '../../../../shared/enums/marital_statuses.enum';
import {CustomerProfile} from 'src/app/shared/models/customers/customer_profile';
import {CustomerFinancialOther} from 'src/app/shared/models/customers/customer_financial_other';
import {PurchaseVehicleOther} from 'src/app/shared/models/vehicle-inventory/purchase_vehicle_other';
import {TradeInVehicleResp} from 'src/app/shared/models/vehicle-inventory/trade_in_vehicle';

import {CustomerRecordsService} from 'src/app/shared/services/customer-records/customer-records.service';

import {InventoryService} from 'src/app/shared/services/inventory/inventory.service';
import {PurchaseVehicle} from 'src/app/shared/models/vehicle-inventory/purchase_vehicle';
import {environment} from 'src/environments/environment';
import {AddPurchaseVehicleDialogComponent} from '../../../../shared/components/dialogs/add-purchase-vehicle-dialog/add-purchase-vehicle-dialog.component';
import {ConfirmActionDialogComponent} from '../../../../shared/components/dialogs/confirm-action-dialog/confirm-action-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {AddTradeVehicleDialogComponent} from '../../../../shared/components/dialogs/add-trade-vehicle-dialog/add-trade-vehicle-dialog.component';
import {CustomerDigitalApplication} from '../../../../shared/models/customers/customer_digital_application';

@Component({
  selector: 'app-finance-application-tabs',
  templateUrl: './finance-application-tabs.component.html',
  styleUrls: ['./finance-application-tabs.component.scss']
})
export class FinanceApplicationTabsComponent implements OnInit {

  @Input() customerProfile: CustomerProfile;
  // @Input('digital-application') digitalApplication: CustomerDigitalApplication;
  @Input('total-price') totalPrice: number;
  @Input('total-trade') totalTrade: number;

  isOpen = false;
  // maskedSSN: string;
  // tradeVehicleOpen = false;
  // purchaseVehicleOpen = false;

  isLoading = false;
  // isLoadingcustomer = false;
  selectedIndex = 0;

  purchaseVehicleOther: PurchaseVehicleOther = new PurchaseVehicleOther();
  // tradeInVehicle: TradeInVehicle = new TradeInVehicle();
  customerFinancialOther: CustomerFinancialOther = new CustomerFinancialOther();

  bankruptcy = false;
  reposession = false;

  customerId = '';

  states = State;
  countries = Country;
  educationalLevels = EducationalLevel;
  // employmentStatuses = EmploymentStatus;
  maritalStatuses = MaritalStatus;
  // residencyTypes = ResidencyType;

  applicationDetails: any = {};

  purchaseVehicles: PurchaseVehicle[] = [];
  tradeVehicles: TradeInVehicleResp[] = [];

  data: any = {};


  constructor(private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private customerRecordsService: CustomerRecordsService,
              private inventoryService: InventoryService) {
  }

  ngOnInit(): void {
    console.log('Finance Application');
    this.data.globalcustomerId = this.customerProfile?.CustomerPersonalDetails?.customerGlobalId;
    this.data.eventcode = this.customerProfile?.EventCode;
    this.customerRecordsService.getCustomerDigitalApplication(this.data.globalcustomerId).subscribe(
    (digitalApplication: CustomerDigitalApplication) => {
      if (!digitalApplication) {return; }
      this.applicationDetails = digitalApplication;
      // this.bankruptcy = digitalApplication?.bankruptcy == 'Yes';
      // this.reposession = digitalApplication?.reposession == 'Yes';
      console.log('Application details here: ', digitalApplication);
    });

    this.getPurchaseVehicle();
    this.getTradeInVehicle();

    this.inventoryService.triggerRefresh().subscribe(resp => {
      if (resp === true){
        this.getPurchaseVehicle();
        this.getTradeInVehicle();
      }
    });
  }

  getTradeInVehicle(): void {
    this.isLoading = true;

    this.inventoryService.getCustomerTradeInVehicle(this.data.globalcustomerId).subscribe((tradeInV) => {
      this.tradeVehicles = tradeInV;
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
      this.snackBar.open('Failed to load trade in vehicle data.', 'Dismiss', {
        duration: environment.snackBarTimeout
      });
    });

    this.isLoading = true;
  }

  openTradeInVehicle(): any {
    return this.dialog.open(AddTradeVehicleDialogComponent, {
      width: '460px',
      data: this.customerProfile
    });
  }

  getPurchaseVehicle(): void {
    this.inventoryService.getCustomerPurchaseVehicle(this.data.globalcustomerId).subscribe((pv) => {
      this.purchaseVehicles = pv ?? [];
    });
  }

  openAddPurchaseVehicle(): any {
    return this.dialog.open(AddPurchaseVehicleDialogComponent, {
      width: '460px',
      data: {customerId: this.data.globalcustomerId}
    });
  }

  openDeleteConfirmationDialog(purchaseVehicleId: number): void {
    const dialogRef = this.dialog.open(ConfirmActionDialogComponent, {
      data: {message: 'You are about to delete a purchase vehicle previously added. Are you sure you want to remove it?'}
    });

    dialogRef.afterClosed().subscribe(resp => {
      if (resp === true) {
        this.deletePurchaseVehicle(purchaseVehicleId);
      }
    });
  }

  deletePurchaseVehicle(purchaseVehicleId: number): void {
    this.inventoryService.deletePurchaseVehicle(purchaseVehicleId, this.data.globalcustomerId).subscribe((delPurchaseVehicle) => {
      this.getPurchaseVehicle();
      this.snackBar.open('Purchase Vehicle has been removed.', 'Dismiss', {
        duration: environment.snackBarTimeout
      });
    }, (err) => {
      this.snackBar.open('Unable to remove purchase vehicle, please try again.', 'Dismiss', {
        duration: environment.snackBarTimeout
      });
    });
  }

  get customerPersonalDetails(): any {
    return this.customerProfile?.CustomerPersonalDetails;
  }

  get customerContactDetails(): any {
    return this.customerProfile?.CustomerContactDetails;
  }

  get customerCoBorrower(): any {
    return this.customerProfile?.CoBorrower;
  }

  selectTab(index: number): void {
    this.selectedIndex = index;
  }

}
