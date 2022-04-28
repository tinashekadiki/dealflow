import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, filter, finalize, switchMap, tap } from 'rxjs/operators';
import { Vehicle } from '../../../models/vehicle-inventory/vehicle';
import { InventoryService } from '../../../services/inventory/inventory.service';

@Component({
  selector: 'app-add-purchase-vehicle-dialog',
  templateUrl: './add-purchase-vehicle-dialog.component.html',
  styleUrls: ['../shared.dialogs.scss', './add-purchase-vehicle-dialog.component.scss']
})
export class AddPurchaseVehicleDialogComponent implements OnInit {

  searchStockNumberCtrl:FormControl = new FormControl('');
  searchVinCtrl:FormControl = new FormControl('');
  isLoading = false;
  isLoadingAutocomplete = false;

  filterVehicleList: Vehicle[];

  selectedVehicle:Vehicle;


  constructor(public dialogRef: MatDialogRef<AddPurchaseVehicleDialogComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any, 
  private inventoryService: InventoryService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.initiateStockSearch();
    this.initiateVinSearch();
  }

  initiateStockSearch(){
    this.searchStockNumberCtrl.valueChanges
      .pipe(
        filter(value=> typeof value == 'string'),
        // filter(value=> value.toString().trim().length > 3),
        debounceTime(500),
        tap(() => {
          console.log('in here');
          this.filterVehicleList = [];
          this.isLoadingAutocomplete = true;
        }),
        switchMap(value => this.getPurchaseVehicleByStockNo(value)
        .pipe(
          finalize(() => {
            this.isLoadingAutocomplete = false
          }),
        )
      )
    ).subscribe(data => {
      // console.log(data);
        this.filterVehicleList = data.vehicles
      });
  }

  initiateVinSearch(){
    this.searchVinCtrl.valueChanges
      .pipe(
        filter(value=> typeof value == 'string'),
        // filter(value=> value.toString().trim().length > 7),
        debounceTime(500),
        tap(() => {
          this.filterVehicleList = [];
          this.isLoadingAutocomplete = true;
        }),
        switchMap(value => this.getPurchaseVehicleByVin(value)
        .pipe(
          finalize(() => {
            this.isLoadingAutocomplete = false
          }),
        )
      )
    ).subscribe(resp => {
        this.filterVehicleList = resp.vehicles
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitRequest() {
    this.isLoading = true;
    this.inventoryService.addPurchaseVehicle(this.data.customerId,this.selectedVehicle.vin).subscribe((res)=>{
      console.log(res);
      this.isLoading = false;
      this.snackBar.open('Vehicle has been added','Dismiss',{
        duration: 5000
      });
      this.dialogRef.close();
    },(err)=>{
      this.isLoading = false;
      this.snackBar.open('Unable to add vehicle, please try again','Dismiss',{
        duration: 5000
      });
    })
    
  }

  displayStockNoFn(vehicle:Vehicle){
    return vehicle.vehicleStock;
  }

  displayVinFn(vehicle:Vehicle){
    return vehicle.vin;
  }

  displayVehicleName(v:Vehicle){
    return v.year+' '+v.makeName+' '+v.model+' '+v.bodyStyle;
  }

  getPurchaseVehicleByStockNo(value:string){
    return this.getVehicleInventoryList({vehicleStock:value.toString().toUpperCase()});
  }

  getPurchaseVehicleByVin(value:string){
    return this.getVehicleInventoryList({vin:value.toString().toUpperCase()});
  }

  getVehicleInventoryList(params:any){
    return this.inventoryService.getVehicleInventoryList(params);
  }

  clearSelection(){
    this.searchStockNumberCtrl.setValue('');
    this.searchVinCtrl.setValue('');
    this.selectedVehicle = undefined;
  }

  get readyToSubmit(){
    return this.selectedVehicle != undefined && this.data.hasOwnProperty('customerId');
  }

}
