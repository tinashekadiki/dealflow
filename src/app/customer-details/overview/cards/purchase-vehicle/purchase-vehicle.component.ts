import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {filter} from 'rxjs/operators';
import {AddPurchaseVehicleDialogComponent} from 'src/app/shared/components/dialogs/add-purchase-vehicle-dialog/add-purchase-vehicle-dialog.component';
import {ConfirmActionDialogComponent} from 'src/app/shared/components/dialogs/confirm-action-dialog/confirm-action-dialog.component';
import {PurchaseVehicle} from 'src/app/shared/models/vehicle-inventory/purchase_vehicle';
import {InventoryService} from 'src/app/shared/services/inventory/inventory.service';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'app-purchase-vehicle-card',
  templateUrl: './purchase-vehicle.component.html',
  styleUrls: ['../shared.component.scss', './purchase-vehicle.component.scss']
})
export class PurchaseVehicleComponent implements OnInit {

  @Output() getTotalPrice = new EventEmitter<number>();

  customerId: string;

  purchaseVehicle: PurchaseVehicle[];

  totalPrice: number = 0;

  isLoading = true;

  constructor(private route: ActivatedRoute, private inventoryService: InventoryService,
              private snackBar: MatSnackBar, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.customerId = params.get('customerId');
        this.getPurchaseVehicle();
        this.initialiseRefreshTrigger();
      });

  }

  initialiseRefreshTrigger(): void {
    this.inventoryService.triggerRefresh().pipe(filter((trig) => trig === true)).subscribe(() => {
      this.getPurchaseVehicle();
    });
  }

  getPurchaseVehicle(): void {
    this.isLoading = true;
    this.inventoryService.getCustomerPurchaseVehicle(this.customerId).subscribe((prchsVhcl) => {
      this.purchaseVehicle = prchsVhcl;
      this.purchaseVehicle.forEach(vehicle => {
        this.totalPrice += vehicle.price;
      });
      this.getTotalPrice.emit(this.totalPrice);
      this.isLoading = false;
    }, (err) => {
      this.isLoading = false;
      this.snackBar.open('Failed to load purchase vehicle data.', 'Dismiss', {
        duration: environment.snackBarTimeout
      });
    })
  }

  openAddPurchaseVehicle(): any {
    return this.dialog.open(AddPurchaseVehicleDialogComponent, {
      width: '460px',
      data: {customerId: this.customerId}
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
    this.inventoryService.deletePurchaseVehicle(purchaseVehicleId, this.customerId).subscribe((delPurchaseVehicle) => {
      this.getPurchaseVehicle();
      this.snackBar.open('Vehicle has been removed.', 'Dismiss', {
        duration: environment.snackBarTimeout
      });
    }, (err) => {
      this.snackBar.open('Unable to remove vehicle, please try again.', 'Dismiss', {
        duration: environment.snackBarTimeout
      });
    });
  }

}
