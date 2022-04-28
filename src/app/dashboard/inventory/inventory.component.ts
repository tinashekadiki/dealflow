import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FilterObj } from 'src/app/shared/models/filters/filter_obj';
import { VehicleListPaginated } from 'src/app/shared/models/vehicle-inventory/vehicle_list_paginated';
import { InventoryService } from 'src/app/shared/services/inventory/inventory.service';
import { environment } from 'src/environments/environment';
import { RangeFilterDialogComponent } from '../home/filters/range-filter-dialog/range-filter-dialog.component';
import { RangeSelectFilterDialogComponent } from '../home/filters/range-select-filter-dialog/range-select-filter-dialog.component';
import { SelectFilterDialogComponent } from '../home/filters/select-filter-dialog/select-filter-dialog.component';
import { TextFilterDialogComponent } from '../home/filters/text-filter-dialog/text-filter-dialog.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  events: string[] = [];
  opened: boolean;

  displayedColumns: string[] = ['ymmt','vin','stock_number','ext_color','mileage','price']
  page:number = 0;
  pageSize:number = 25;
  totalElements:number = 0;
  isLoading = true;
  currentYear: number = (new Date()).getFullYear();
  search:string = '';


  vehicleList: VehicleListPaginated;
  filters: Array<FilterObj> = new Array();
  propertyDisplay = {
    makeName: 'Vehicle Make',
    vin: 'VIN',
    vehicleStock: 'Stock Number',
    year: 'Year',
    price: 'Price',
    mileage: 'Mileage',
  }


  constructor(private snackBar: MatSnackBar, private dialog: MatDialog, private inventoryService: InventoryService) { }

  ngOnInit(): void {
    
    this.getVehicleList();
  }

  handlePageChange(event){
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getVehicleList();
  }

  getVehicleList(){
    this.vehicleList = undefined;
    this.isLoading = true;
    let params = {page: this.page,size: this.pageSize};

    if(this.search.trim() != ''){
      params['searchValue'] = this.search;
    }

    this.filters.forEach(obj => { 
      if(typeof obj.value == 'object'){
        params[obj.property+'1'] = obj.value['min'];
        params[obj.property+'2'] = obj.value['max'];
      }else{
        params[obj.property] = obj.value;
      }
    });
    
    this.inventoryService.getVehicleInventoryList(params).subscribe((vehicles)=>{
      this.vehicleList = vehicles;
      this.page = vehicles.currentPage
      // this.pageSize = customerss.size;
      this.totalElements = vehicles.totalItems;
      this.isLoading = false;
    },(err)=>{
      this.snackBar.open(`Failed to load vehicle list.`, 'Dismiss', {
        duration: environment.snackBarTimeout,
      });
      this.isLoading = false;
    });
  }

  openSearchDialog(): void {
    const dialogRef = this.dialog.open(TextFilterDialogComponent, {
      width: '450px',
      data: { name:'searchValue', displayName:'Search Vehicle', value: '', label:'Type vehicle name', actionBtn:'Search' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == undefined) {
        return;
      }
      this.search = result.value.trim();
      this.filters = new Array();
      this.getVehicleList();
      
    })
  }

  openTextDialog(name: string, displayName: string): void {
    const dialogRef = this.dialog.open(TextFilterDialogComponent, {
      width: '250px',
      data: { name, displayName, value: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == undefined) {
        return;
      }

      this.applyFilter(result.name, result.value)
    })
  }
    
  openSelectDialog(name: string, displayName: string, options: any[]): void {
    const dialogRef = this.dialog.open(SelectFilterDialogComponent, {
      width: '260px',
      data: { name, displayName, value: '', options }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == undefined) {
        return;
      }

      this.applyFilter(result.name, result.value, result.options.find(opt => opt.value == result.value).title)
    });
  }

  openRangeDialog(name: string, displayName: string){
    // let rangeFilter:ValueRange;
    const dialogRef = this.dialog.open(RangeFilterDialogComponent, {
      width: '450px',
      data: { name, displayName, value: {min:null, max:null} }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == undefined) {
        return;
      }

      this.applyFilter(result.name, result.value,)
    });
  }

  openRangeSelectDialog(name: string, displayName: string, options: any[]){
    // let rangeFilter:ValueRange;
    const dialogRef = this.dialog.open(RangeSelectFilterDialogComponent, {
      width: '450px',
      data: { name, displayName, value: {min:null, max:null}, options }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == undefined) {
        return;
      }

      this.applyFilter(result.name, result.value)
    });
  }

  applyFilter(property: string, value: any, displayValue: any = null) {
    if (value == undefined || value == null || value.toString().trim() == '') return;

    let index = this.getPropetyIndex(property);
    const filter: FilterObj = { property, value, displayValue };
    if (index == -1) {
      this.filters.push(filter);
      this.search = '';
      this.getVehicleList();
      return;
    }

    this.filters.splice(index, 1, filter);
    this.search = '';
    this.getVehicleList();
  }

  removeFilter(index: number) {
    this.filters.splice(index, 1);
    this.getVehicleList();
  }

  getPropetyIndex(property: string) {
    return this.filters.findIndex(f => f.property === property);
  }

  clearFilters() {
    this.filters = new Array();
    this.getVehicleList();
  }

  clearSearch(){
    this.search = '';
    this.getVehicleList();
  }

  displayValue(value:any){
    if(typeof value === 'object'){
      // if(!isEmpty(value.min) && !isEmpty(value.max)){
        return value.min +' - '+value.max;
      // }
      // if(isEmpty(value.max)){
      //   return '≥'+value.min
      // }

      // if(isEmpty(value.min)){
      //   return '≤'+value.max
      // }
    }
    return value
  }

  range(start:number, stop:number, step:number) {
   return [...Array(Math.abs(stop-start))].map((_, i) => {
     let val = start + i * step
     return {title:val,value:val};
    });
  }

}
