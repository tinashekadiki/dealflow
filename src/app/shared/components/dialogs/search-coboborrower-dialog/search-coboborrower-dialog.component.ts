import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, filter, finalize, switchMap, tap } from 'rxjs/operators';
import { Customer } from 'src/app/shared/models/customers/customer_list_paginated';
import { CustomerRecordsService } from 'src/app/shared/services/customer-records/customer-records.service';
import { AddCustomerDialogComponent } from '../add-customer/add-customer-dialog.component';
import { SearchCustomersComponent } from '../search-customers/search-customers.component';

@Component({
  selector: 'app-search-coboborrower-dialog',
  templateUrl: './search-coboborrower-dialog.component.html',
  styleUrls: ['./search-coboborrower-dialog.component.scss']
})
export class SearchCoboborrowerDialogComponent implements OnInit {

  isLoading=false;
  isLoadingAutocomplete = false;
  searchCustomerCtrl:FormControl = new FormControl('');

  customerList:Customer[] = [];



  selCustomer:Customer;

  constructor(private dialog: MatDialog, private dialogRef: MatDialogRef<SearchCoboborrowerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private customerRecordsService: CustomerRecordsService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.initiateCustomerSearch(this.data.customerId);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSelectedCustomer(customerObj){
    this.selCustomer = customerObj.selectedOptions.selected[0]?.value;
  }

  initiateCustomerSearch(current: number){
    this.searchCustomerCtrl.valueChanges
      .pipe(
        // filter(value=> typeof value == 'string' && value.toString().trim().length > 3),
        debounceTime(500),
        tap(() => {
          this.customerList = [];
          this.isLoadingAutocomplete = true;
          this.selCustomer = undefined;
        }),
        switchMap(value => this.getCustomerList(value)
        .pipe(
          finalize(() => {
            this.isLoadingAutocomplete = false
          }),
        )
      )
    ).subscribe(data => {
      console.log(data);
      let customers = data.customers
        this.customerList = customers.filter(customer => customer.id !== current);
      }, (err) => {
        this.snackBar.open(`Could not reach server for customer search.`, 'Dismiss', {
          duration: 5000,
        });
      });
  }

  getCustomerList(search:string) {
    return this.customerRecordsService.getCustomers({ size: 7, searchValue: search});
  }

  submitRequest(): void {
    this.customerRecordsService.addCoBorrower(this.data.customerId,this.selCustomer.id).subscribe((resp)=>{
      this.snackBar.open(`Co-Borrower successfully added!.`, 'Dismiss', {
        duration: 5000,
      });

      console.log(resp);

      this.dialogRef.close(resp);

    }, 
    (err) => {
        this.snackBar.open(`Could not reach server to add Co-Borrower.`, 'Dismiss', {
          duration: 5000,
        });
      })
  }

}


