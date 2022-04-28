import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { State } from 'src/app/shared/enums/states.enum';
import { Country } from 'src/app/shared/enums/countries.enum';
import { CustomerProfile } from 'src/app/shared/models/customers/customer_profile';
import { CustomerFinancialOther } from 'src/app/shared/models/customers/customer_financial_other';
import { PurchaseVehicleOther } from 'src/app/shared/models/vehicle-inventory/purchase_vehicle_other';
import { environment } from 'src/environments/environment';
import {CustomerPersonal} from '../../../../shared/models/customers/customer_personal';
import {CustomerContact} from '../../../../shared/models/customers/customer_contact';
import {CustomerCoborrower} from '../../../../shared/models/customers/customer_coborrower';

@Component({
  selector: 'app-financial-application',
  templateUrl: './financial-application.component.html',
  styleUrls: ['../shared.component.scss', './financial-application.component.scss']
})
export class FinancialApplicationComponent implements OnInit {

  @Input() customerProfile: CustomerProfile;
  @Input() totalPrice: number;
  @Input() totalTrade: number;

  isOpen = false;

  isLoading = false;

  customerId = '';

  states = State;
  countries = Country;

  purchaseVehicleOther: PurchaseVehicleOther = new PurchaseVehicleOther();
  // tradeInVehicle: TradeInVehicle = new TradeInVehicle;
  customerFinancialOther: CustomerFinancialOther = new CustomerFinancialOther();

  bankruptcy = false;
  reposession = false;
  //
  // tradeVehicleOpen = false;
  // purchaseVehicleOpen = false;

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    console.log(this.customerProfile);
  }

  get customerPersonalDetails(): CustomerPersonal {
    return this.customerProfile?.CustomerPersonalDetails;
  }

  get customerContactDetails(): CustomerContact {
    return this.customerProfile?.CustomerContactDetails;
  }

  get customerCoBorrower(): CustomerCoborrower {
    return this.customerProfile?.CoBorrower;
  }

  onNoClick(): void {

  }

  submitRequest(): void {
    this.isLoading = true;
    this.snackBar.open('The process has been initiated successfully!', 'Dismiss', {
      duration: environment.snackBarTimeout,
    });
    this.isLoading = false;
  }

}
