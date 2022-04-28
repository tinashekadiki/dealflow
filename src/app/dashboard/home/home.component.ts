import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CustomerListPaginated} from 'src/app/shared/models/customers/customer_list_paginated';
import {FilterObj} from 'src/app/shared/models/filters/filter_obj';
import {CustomerRecordsService} from 'src/app/shared/services/customer-records/customer-records.service';
import {SelectFilterDialogComponent} from './filters/select-filter-dialog/select-filter-dialog.component';
import {TextFilterDialogComponent} from './filters/text-filter-dialog/text-filter-dialog.component';

import {AddCustomerDialogComponent} from '../../shared/components/dialogs/add-customer/add-customer-dialog.component';
import {AddPurchaseVehicleDialogComponent} from '../../shared/components/dialogs/add-purchase-vehicle-dialog/add-purchase-vehicle-dialog.component';
import {AddTradeVehicleDialogComponent} from '../../shared/components/dialogs/add-trade-vehicle-dialog/add-trade-vehicle-dialog.component';
import {GenerateFinanceApplicationDialogComponent} from '../../customer-details/overview/cards/generate-finance-application-dialog/generate-finance-application-dialog.component';
import {SendDigitalApplicationDialogComponent} from '../../shared/components/dialogs/send-digital-application-dialog/send-digital-application-dialog.component';
import {SendRecordToCrmDialogComponent} from '../../shared/components/dialogs/send-record-to-crm-dialog/send-record-to-crm-dialog.component';
import {SendRecordToDmsDialogComponent} from '../../shared/components/dialogs/send-record-to-dms-dialog/send-record-to-dms-dialog.component';

import {FullCustomerData} from '../../shared/models/customers/full_customer_data';
import {CustomerProfile} from '../../shared/models/customers/customer_profile';
import {ConfirmActionDialogComponent} from 'src/app/shared/components/dialogs/confirm-action-dialog/confirm-action-dialog.component';
import {SearchCoboborrowerDialogComponent} from 'src/app/shared/components/dialogs/search-coboborrower-dialog/search-coboborrower-dialog.component';
import {ArchiveSearchDialogComponent} from './filters/archive-search-dialog/archive-search-dialog.component';
import {environment} from 'src/environments/environment';
import {formatDate} from '@angular/common';
import {ProcessConfigService} from 'src/app/shared/services/process-config/process-config.service';
import {SingleProcess} from 'src/app/shared/models/process-config/confuguration.model';
import {MatTable} from '@angular/material/table';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  events: string[] = [];
  opened: boolean;

  isLoadingCustomer = true;
  customerId: string;
  customer: CustomerProfile;

  @ViewChild('customerListTable') matCustomerTable: MatTable<any>;

  displayedColumns: string[] = ['name', 'email', 'phone', 'buying_stage', 'compliance_flag', 'action'];
  page = 0;
  pageSize = 25;
  totalElements = 0;
  isLoading = true;
  search = '';
  archivedDateRange = {
    startDate: '',
    endDate: ''
  };

  customerList: CustomerListPaginated;
  filters: Array<FilterObj> = [];
  propertyDisplay = {
    firstName: 'First Name',
    lastName: 'Last Name',
    buyingStage: 'Buying Stage',
    complianceFlag: 'Compliance Flag',
  };

  complianceFlagList: any[] = [
    {title: 'New', value: 'New'},
    {title: 'Active', value: 'Active'},
    {title: 'Blocked', value: 'Blocked'},
  ];

  customerBuyingProcessList: SingleProcess[] = [];

  constructor(private customerRecordsService: CustomerRecordsService,
              private processConfigService: ProcessConfigService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.processConfigService.loadProcesses().then(processList => {
      this.customerBuyingProcessList = processList;
    });

    this.getCustomerList();

  }

  handlePageChange(event): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getCustomerList();
  }

  openSearchDialog(): void {
    const dialogRef = this.dialog.open(TextFilterDialogComponent, {
      width: '450px',
      data: {name: 'searchValue', displayName: 'Search Customer', value: '', label: 'Type customer name', actionBtn: 'Search'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) {
        return;
      }
      this.search = result.value.trim();
      this.filters = [];
      this.archivedDateRange  = {
        startDate: '',
        endDate: ''
      };
      this.getCustomerList();

    });
  }

  openArchivedSearchDialog(): void {
    const dialogRef = this.dialog.open(ArchiveSearchDialogComponent, {
      width: '450px',
      data: {
        name: 'archivedSearchValue',
        displayName: 'Search Archived Customer',
        value: {},
        label: 'Type customer name',
        actionBtn: 'Search'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) {
        return;
      }

      this.filters = [];
      this.search = '';
      this.archivedDateRange.startDate = formatDate(result.value.min, 'MM/dd/yyyy', 'en-US');
      this.archivedDateRange.endDate = formatDate(result.value.max, 'MM/dd/yyyy', 'en-US');
      this.getArchivedCustomerList();

    });
  }

  openTextDialog(name: string, displayName: string): void {
    const dialogRef = this.dialog.open(TextFilterDialogComponent, {
      width: '250px',
      data: {name, displayName, value: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) {
        return;
      }

      this.applyFilter(result.name, result.value);
    });
  }

  openSelectDialog(name: string, displayName: string, options: any[]): void {
    const dialogRef = this.dialog.open(SelectFilterDialogComponent, {
      width: '260px',
      data: {name, displayName, value: '', options}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) {
        return;
      }

      this.applyFilter(result.name, result.value, result.options.find(opt => opt.value === result.value).title);
    });
  }


  applyFilter(property: string, value: any, displayValue: any = null): any {
    if (value === undefined || value === null || value.toString().trim() === '') {
      return;
    }

    const index = this.getPropetyIndex(property);
    const filter: FilterObj = {property, value, displayValue};
    if (index === -1) {
      this.filters.push(filter);
      this.search = '';
      this.archivedDateRange = {
        startDate: '',
        endDate: ''
      };
      this.getCustomerList();
      return;
    }

    this.filters.splice(index, 1, filter);
    this.search = '';
    this.archivedDateRange = {
      startDate: '',
      endDate: ''
    };

    this.getCustomerList();
  }

  processIdToBuyingStage(processId: number): any {
    return this.customerBuyingProcessList.find(comp => comp.processId.toString() === processId.toString())?.name;
  }

  removeFilter(index: number): void {
    this.filters.splice(index, 1);
    this.getCustomerList();
  }

  getPropetyIndex(property: string): number {
    return this.filters.findIndex(f => f.property === property);
  }

  clearFilters(): void {
    this.filters = [];
    this.getCustomerList();
  }

  clearSearch(): void {
    this.search = '';
    this.getCustomerList();
  }

  clearArchiveSearch(): void {
    this.archivedDateRange  = {
      startDate: '',
      endDate: ''
    };
    this.getCustomerList();
  }

  get isArchiveSearch(): boolean {
    return this.archivedDateRange.startDate != "" && this.archivedDateRange.endDate != "";
  }

  getCustomerList(): void {
    this.customerList = undefined;
    this.isLoading = true;
    const params = {page: this.page, size: this.pageSize, searchValue: ''};

    if (this.search.trim() !== '') {
      params.searchValue = this.search;
    }

    this.filters.forEach(obj => {
      params[obj.property] = obj.value;
    });

    this.customerRecordsService.getCustomers(params).subscribe((customerss) => {
      this.customerList = customerss;
      this.page = customerss.currentPage;
      this.totalElements = customerss.totalItems;
      this.isLoading = false;
    }, (err) => {
      this.snackBar.open(`Failed to load customer list.`, 'Dismiss', {
        duration: environment.snackBarTimeout,
      });
      this.isLoading = false;
    });
  }

  getArchivedCustomerList(): void {
    this.customerList = undefined;
    this.isLoading = true;
    const params = {page: this.page, size: this.pageSize, ...this.archivedDateRange};

    this.customerRecordsService.getArchivedCustomers(params).subscribe((customerss) => {
      this.customerList = customerss;
      this.page = this.customerList.currentPage;
      this.totalElements = this.customerList.totalItems;
      this.isLoading = false;
    }, (err) => {
      this.snackBar.open(`Failed to load archived customer results.`, 'Dismiss', {
        duration: environment.snackBarTimeout,
      });
      this.isLoading = false;
    });
  }

  get optionListCustomerBuyingStage(): any {
    return this.customerBuyingProcessList.map(proc => {
      return {
        value: proc.processId, title : proc.name
      };
    });
  }

  openSearchCoboborrowerDialogComponent(customerId): void {
    this.dialog.open(SearchCoboborrowerDialogComponent, {
      width: '460px',
      data: {customerId}
    });
  }

  openAddCustomerDialog(): void {
    const dialogRef = this.dialog.open(AddCustomerDialogComponent, {
      width: '820px',
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res === undefined) {
        return;
      }

      if (res.success) {
        this.getCustomerList();
      }
    });
  }

  openAddPurchaseVehicleDialog(customerId: string): void {

    this.dialog.open(AddPurchaseVehicleDialogComponent, {
      width: '460px',
      data: {customerId}
    });
  }

  openAddTradeVehicleDialog(): void {

    this.dialog.open(AddTradeVehicleDialogComponent, {
      width: '460px',
      data: this.customer
    });
  }

  openSendDigitalApplicationDialog(): void {
    this.isLoadingCustomer = true;

    this.dialog.open(SendDigitalApplicationDialogComponent, {
      width: '460px',
      data: this.customer
    });
  }

  openGenerateFinanceApplicationDialog(): void {

    this.dialog.open(GenerateFinanceApplicationDialogComponent, {
      width: '1040px',
      data: this.customer
    });
  }

  openSendRecordToDMSDialog(): void {

    this.dialog.open(SendRecordToDmsDialogComponent, {
      width: '460px',
      data: this.customer
    });
  }

  openSendRecordToCRMDialog(customerId: string): void {

    this.dialog.open(SendRecordToCrmDialogComponent, {
      width: '460px',
      data: this.customer
    });
  }

  confirmArchiveCustomer(customerId: string): any {
    const dialogRef = this.dialog.open(ConfirmActionDialogComponent, {
      data: {message: 'You are about to archive a customer and they will no longer appear on this list. Are you sure you want to proceed?'}
    });

    dialogRef.afterClosed().subscribe(resp => {
      if (resp === true) {
        this.customerRecordsService.markAsArchived(customerId).subscribe(archiveResp => {
          const index = this.customerList.customers.findIndex(cust => cust.customerGlobalId === customerId);

          if (index > -1) {
            this.customerList.customers[index].complianceFlag = 'ARCHIVED';
          }

          this.snackBar.open(`The customer has been successfully archived.`, 'Dismiss', {
            duration: environment.snackBarTimeout,
          });

        }, (err) => {
          this.snackBar.open(`Failed to archive the customer.`, 'Dismiss', {
            duration: environment.snackBarTimeout,
          });
        });
      }
    });
  }

  confirmDeleteCustomer(customerId: string): any {
    const dialogRef = this.dialog.open(ConfirmActionDialogComponent, {
      data: {
        message: 'You are about to delete a customer record. Are you sure you want to proceed?',
        actionBtn: ' Delete'
      }
    });

    dialogRef.afterClosed().subscribe(resp => {
      console.log(resp);
      if (resp === undefined) {
        return;
      }
      if (resp === true) {
        this.customerRecordsService.deleteCustomer(customerId).subscribe((resp1) => {
          const index = this.customerList.customers.findIndex(cust => cust.customerGlobalId == customerId);

          console.log(index);
          if (index > -1) {
            this.customerList?.customers?.splice(index, 1);
            this.matCustomerTable.renderRows();
          }

          this.snackBar.open(`The customer has been deleted.`, 'Dismiss', {
            duration: environment.snackBarTimeout,
          });

        });
      }
    });
  }

  getCustomer(customerId: string): void {

    this.isLoadingCustomer = true;

    this.customerRecordsService.getCustomer(customerId)
      .subscribe((cust: FullCustomerData) => {
        this.customer = cust.CustomerData;

        this.isLoadingCustomer = false;
      }, (err) => {

        this.isLoadingCustomer = false;
      });
  }

  get customerCoBorrower(): any {
    return this.customer?.CoBorrower;
  }

  get customerProfile(): any {
    return this.customer;
  }

}
