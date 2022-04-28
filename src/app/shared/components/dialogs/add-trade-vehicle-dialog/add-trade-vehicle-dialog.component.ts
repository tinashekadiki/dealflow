import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { State } from 'src/app/shared/enums/states.enum';
import { VehicleMake } from 'src/app/shared/enums/vehicle_makes.enum';

import { CustomerProfile } from '../../../models/customers/customer_profile';
import { TradeInVehicle } from '../../../models/vehicle-inventory/trade_in_vehicle';
import { Vehicle } from '../../../models/vehicle-inventory/vehicle';
import { Trade_Vehicle_Request } from 'src/app/shared/models/vehicle-inventory/trade_vehicle_request';
import { PolkTypeN } from 'src/app/shared/models/vehicle-inventory/polk_type_n';
import { NPermissions } from 'src/app/shared/models/vehicle-inventory/polk_type_n';
// import { NRequest } from 'src/app/shared/models/vehicle-inventory/polk_type_n';
import { PolkTypePv } from 'src/app/shared/models/vehicle-inventory/polk_type_pv';
import { PvPermissions } from 'src/app/shared/models/vehicle-inventory/polk_type_pv';
// import { PvRequest } from 'src/app/shared/models/vehicle-inventory/polk_type_pv';
import { InventoryService } from '../../../services/inventory/inventory.service';


@Component({
  selector: 'app-add-trade-vehicle-dialog',
  templateUrl: './add-trade-vehicle-dialog.component.html',
  styleUrls: ['../shared.dialogs.scss', './add-trade-vehicle-dialog.component.scss']
})
export class AddTradeVehicleDialogComponent implements OnInit {


  isLoading = false;
  gettingVehicle = false;
  states = State;
  vehicleMakes = VehicleMake;
  currentYear: number = (new Date()).getFullYear();
  vinValid=true;

  tradeVehicleRequest: Trade_Vehicle_Request = new Trade_Vehicle_Request;
  requestBranded = false;
  requestPlate = false;
  tradeVehicleN: PolkTypeN = new PolkTypeN;
  tradeVehiclePV: PolkTypePv = new PolkTypePv;

  customer: CustomerProfile;

  selectedTabIndex: number = 0;

  getModelYear = (start: number, stop: number, step: number) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));

  modelYears = this.getModelYear(this.currentYear, this.currentYear - 150, -1);

  constructor(public dialogRef: MatDialogRef<AddTradeVehicleDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: CustomerProfile, private snackBar: MatSnackBar, private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.customer = this.data;
    // console.log('Trade Vehicle N: ', this.tradeVehicleN);
    // console.log('Trade Vehicle PV: ', this.tradeVehiclePV);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // submitRequest() {
  //   if (this.selectedTabIndex == 0 && this.tradeVehicleRequest.make && this.tradeVehicleRequest.year) {
  //     this.submitRequestN();
  //   }

  //   // else if (this.selectedTabIndex == 1 && this.tradeVehicleRequest.LICENSEPLATE && this.tradeVehicleRequest.LICENSESTATE) {
  //   //   this.submitRequestPV();
  //   // } else {
  //   //   this.snackBar.open('Unable to construct the query. Please choose to either use Vehicle Details OR License Plate. Please try again.', 'Dismiss', {
  //   //     duration: 5000
  //   //   });
  //   // }
  // }

  // submitRequestN() {
  //   this.isLoading = true;

  //   this.tradeVehicleN.permissions = new NPermissions();
  //   this.tradeVehicleN.request = [];

  //   this.tradeVehicleN.permissions.globalcustomerid = this.customer.CustomerPersonalDetails.customerGlobalId;
  //   this.tradeVehicleN.permissions.settingcode = 'POLK';

  //   this.tradeVehicleN.requestBranded = 'y';
  //   this.tradeVehicleN.requestPlate = 'y';

  //   this.tradeVehicleN.request.push({
  //     STREETADDRESS: this.customer.CustomerContactDetails.mailingStreetAddress1,
  //     State: this.customer.CustomerContactDetails.state,
  //     FIRSTNAME: this.customer.CustomerPersonalDetails.firstName,
  //     SURNAME: this.customer.CustomerPersonalDetails.lastName,
  //     RequestId: '1',
  //     City: this.customer.CustomerContactDetails.city,
  //     zipcode: this.customer.CustomerContactDetails.postalCode,
  //     make: this.tradeVehicleRequest.make,
  //     modelYear: this.tradeVehicleRequest.modelYear,
  //   });

  //   // console.log('Trade Vehicle N', this.tradeVehicleN);

  //   this.inventoryService.getQueryPolkTypeN(this.tradeVehicleN).subscribe(res => {
  //     console.log(res);
  //     this.snackBar.open('Vehicle details have been submitted successfully', 'Dismiss', {
  //       duration: 5000
  //     });
  //     this.dialogRef.close({ success: true });
  //   }, (err) => {
  //     this.isLoading = false;
  //     this.snackBar.open('Unable to reach the server. Please try again.', 'Dismiss', {
  //       duration: 5000
  //     })
  //     console.log(err);
  //   });
  // }

  // submitRequestPV() {
  //   this.isLoading = true;

  //   this.tradeVehiclePV.permissions = new PvPermissions();
  //   this.tradeVehiclePV.request = [];

  //   this.tradeVehiclePV.permissions.globalcustomerid = this.customer.CustomerPersonalDetails.customerGlobalId;
  //   this.tradeVehiclePV.permissions.settingcode = 'POLK';
  //   this.tradeVehiclePV.requestBranded = 'y';

  //   this.tradeVehiclePV.request.push({
  //     REQUESTID: '1',
  //     LICENSEPLATE: this.tradeVehicleRequest.LICENSEPLATE,
  //     LICENSESTATE: this.tradeVehicleRequest.LICENSESTATE
  //   },
  //     // {
  //     //   REQUESTID: '2',
  //     //   LICENSESTATE: 'WY',
  //     //   LICENSEPLATE: 'PRI68'
  //     // }
  //     );

  //   // console.log('Trade Vehicle Pv', this.tradeVehiclePV);

  //   this.inventoryService.getQueryPolkTypePV(this.tradeVehiclePV).subscribe(res => {
  //     console.log(res);
  //     this.snackBar.open('Vehicle details have been submitted successfully', 'Dismiss', {
  //       duration: 5000
  //     });
  //     this.dialogRef.close({ success: true });
  //   }, (err) => {
  //     this.isLoading = false;
  //     this.snackBar.open('Unable to reach the server. Please try again.', 'Dismiss', {
  //       duration: 5000
  //     })
  //     console.log(err);
  //   });
  // }

  submitRequestAddTradeIn() {
    this.isLoading = true;
    this.tradeVehicleRequest.globalCustomerId = this.customer.CustomerPersonalDetails.customerGlobalId;
    this.inventoryService.addTradeInVehicle(this.tradeVehicleRequest).subscribe(data => {
      console.log(data);
      this.isLoading = false;
      this.snackBar.open('Vehicle details have been submitted successfully', 'Dismiss', {
        duration: 5000
      });
      this.dialogRef.close({ success: true });
    }, error => {
      this.isLoading = false;
      this.snackBar.open('Unable to reach the server. Please try again.', 'Dismiss', {
        duration: 5000
      })
      console.log(error);
    })

  }

  updateFormWithVehicleData(value) {
    if(value.length > 17 || value.length< 11){
      this.vinValid = false;
      console.log(this.vinValid);

    }
    this.gettingVehicle = true;
    this.inventoryService.getTradeInVehicle(this.tradeVehicleRequest.vin).subscribe((data: any) => {
      this.tradeVehicleRequest.make = data.Results[0].Make
      this.tradeVehicleRequest.year = data.Results[0].ModelYear
      this.tradeVehicleRequest.model = data.Results[0].Model
      this.gettingVehicle = false
    }, error => {
      this.gettingVehicle = false
      this.snackBar.open('Unable get vehicle details', 'Dismiss', {
        duration: 5000
      })
    })
  }
}
