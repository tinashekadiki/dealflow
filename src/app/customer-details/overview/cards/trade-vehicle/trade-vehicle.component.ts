import { CustomerContact } from './../../../../shared/models/customers/customer_contact';
import { CustomerPersonal } from './../../../../shared/models/customers/customer_personal';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { filter, take } from 'rxjs/operators';

import { AddTradeVehicleDialogComponent } from 'src/app/shared/components/dialogs/add-trade-vehicle-dialog/add-trade-vehicle-dialog.component';
import { ConfirmActionDialogComponent } from 'src/app/shared/components/dialogs/confirm-action-dialog/confirm-action-dialog.component';
import { InventoryService } from 'src/app/shared/services/inventory/inventory.service';
import { TradeInVehicleResp } from 'src/app/shared/models/vehicle-inventory/trade_in_vehicle';

import { CustomerProfile } from 'src/app/shared/models/customers/customer_profile';
import { CustomerCoborrower } from 'src/app/shared/models/customers/customer_coborrower';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-trade-vehicle-card',
  templateUrl: './trade-vehicle.component.html',
  styleUrls: ['../shared.component.scss', './trade-vehicle.component.scss']
})
export class TradeVehicleComponent implements OnInit {

  @Output() getTotalTradeInValue = new EventEmitter<number>();

  totalTradeInValue = 0;

  // tslint:disable-next-line: no-input-rename
  @Input('customerprofile') customerProfile: CustomerProfile;

  customerId = '';

  tradeInVehicle: TradeInVehicleResp[];

  isLoading = false;

  check = 0;

  constructor(private route: ActivatedRoute, private inventoryService: InventoryService,
    private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.customerId = params.get('customerId');
        this.getTradeInVehicle();
        this.initialiseRefreshTrigger();
      });
  }

  initialiseRefreshTrigger(): void {
    this.inventoryService.triggerRefresh().pipe(filter((trig) => trig === true)).subscribe(() => {
      this.getTradeInVehicle();
    });
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

  getTradeInVehicle() {
    this.isLoading = true;

    this.inventoryService.getCustomerTradeInVehicle(this.customerId).subscribe((tradeInV) => {
      console.log('Trade In Vehicle', tradeInV);

      this.tradeInVehicle = tradeInV;
      this.tradeInVehicle.forEach(vehicle => {
        this.totalTradeInValue += Number(vehicle.attributes.MSRP);
      });
      this.getTotalTradeInValue.emit(this.totalTradeInValue);
      this.isLoading = false;
    }, (err) => {
      this.isLoading = false;

      this.snackBar.open('Failed to load trade in vehicle data.', 'Dismiss', {
        duration: environment.snackBarTimeout
      });
    });

    this.isLoading = true;
  }

  openTradeInVehicle() {
    return this.dialog.open(AddTradeVehicleDialogComponent, {
      width: '460px',
      data: this.customerProfile
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
          this.snackBar.open('Successfully deleted the trade vehicle record.', 'Dismiss', {
            duration: environment.snackBarTimeout
          });
          this.getTradeInVehicle()
        }, (err) => {
          this.snackBar.open('Failed to delete the trade vehicle record.', 'Dismiss', {
            duration: environment.snackBarTimeout
          });
          this.getTradeInVehicle()
        });
      }
    });
  }

}
