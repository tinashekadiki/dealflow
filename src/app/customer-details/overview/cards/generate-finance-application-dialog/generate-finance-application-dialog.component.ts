import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { State } from '../../../../shared/enums/states.enum';
import { Country } from '../../../../shared/enums/countries.enum';
import { EducationalLevel } from 'src/app/shared/enums/educational_levels.enum';
import { EmploymentStatus } from 'src/app/shared/enums/employment_statuses.enum';
import { MaritalStatus } from '../../../../shared/enums/marital_statuses.enum';
import { ResidencyType } from '../../../../shared/enums/residency_types.enum';
import { CustomerProfile } from '../../../../shared/models/customers/customer_profile';
import { CustomerFinancialOther } from 'src/app/shared/models/customers/customer_financial_other';
import { PurchaseVehicleOther } from 'src/app/shared/models/vehicle-inventory/purchase_vehicle_other';
import { TradeInVehicle } from 'src/app/shared/models/vehicle-inventory/trade_in_vehicle';

@Component({
  selector: 'app-generate-finance-application-dialog',
  templateUrl: './generate-finance-application-dialog.component.html',
  styleUrls: ['../../../../shared/components/dialogs/shared.dialogs.scss', './generate-finance-application-dialog.component.scss']
})
export class GenerateFinanceApplicationDialogComponent implements OnInit {

  isLoading = false;
  isOpen = false;
  isLoadingCustomer = false;
  selectedIndex: number = 0;

  customerId: string = '';
  customer: CustomerProfile;

  states = State;
  countries = Country;
  educationalLevels = EducationalLevel;
  employmentStatuses = EmploymentStatus;
  maritalStatuses = MaritalStatus;
  residencyTypes = ResidencyType;

  purchaseVehicleOther: PurchaseVehicleOther = new PurchaseVehicleOther;
  tradeInVehicle: TradeInVehicle = new TradeInVehicle;
  customerFinancialOther: CustomerFinancialOther = new CustomerFinancialOther;

  bankruptcy = false;
  reposession = false;

  tradeVehicleOpen = false;
  purchaseVehicleOpen = false;


  constructor(private dialogRef: MatDialogRef<GenerateFinanceApplicationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: CustomerProfile, private snackBar: MatSnackBar) { }

  /* nextStep() {
    if (this.selectedIndex != 5) {
      this.selectedIndex = this.selectedIndex + 1;
    }
    console.log(this.selectedIndex);
  }

  previousStep() {
    if (this.selectedIndex != 0) {
      this.selectedIndex = this.selectedIndex - 1;
    }
    console.log(this.selectedIndex);
  } */

  ngOnInit(): void {
    this.customer = this.data;
  }


  get customerPersonalDetails() {
    return this.customer?.CustomerPersonalDetails;
  }

  get customerContactDetails() {
    return this.customer?.CustomerContactDetails;
  }

  get customerCoBorrower() {
    return this.customer?.CoBorrower;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitRequest() {
    this.dialogRef.close();
    this.isLoading = true;
    this.snackBar.open('The process has been initiated successfully!', 'Dismiss', {
      duration: 5000
    });
  }

}
