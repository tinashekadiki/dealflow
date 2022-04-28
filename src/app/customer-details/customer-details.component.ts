import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {BreadcrumbService} from 'xng-breadcrumb';
import {FullCustomerData} from '../shared/models/customers/full_customer_data';
import {CustomerRecordsService} from '../shared/services/customer-records/customer-records.service';
import {AddCustomerDialogComponent} from '../shared/components/dialogs/add-customer/add-customer-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {SearchCoboborrowerDialogComponent} from '../shared/components/dialogs/search-coboborrower-dialog/search-coboborrower-dialog.component';
import {DealProgressService} from '../shared/services/deal-progress/deal-progress.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

  isLoadingCustomer = true;
  customerId: string;
  customer: FullCustomerData;

  customer1Id: number;
  customer2id: number;

  constructor(private dialog: MatDialog, private activatedRoute: ActivatedRoute,
              private customerRecordsService: CustomerRecordsService,
              private breadcrumbService: BreadcrumbService,
              private dealProgress: DealProgressService) {
  }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(
      (params: ParamMap) => {
        // this.service.getHero(params.get('id')!));
        this.customerId = params.get('customerId');
        this.breadcrumbService.set('cname', '@customerName');
        this.getCustomer(this.customerId);
        this.customerRecordsService.triggerProfileRefresh().subscribe(b => {
          this.getCustomer(this.customerId);
        });
      });
  }

  acceptCoborrowerId(data: number): void {
    this.customer2id = data;
  }

  getCustomer(customerId: string): any {
    this.isLoadingCustomer = true;
    this.customerRecordsService.getCustomer(customerId).toPromise().then(customer => {
      console.log(customer);
      this.dealProgress.setCustomerid(customer.CustomerData.CustomerPersonalDetails.customerGlobalId,
        customer.CustomerData.CustomerPersonalDetails.id);
      this.customer = customer;
      this.breadcrumbService.set('@customerName');
    }).finally(() => {
      this.isLoadingCustomer = false;
    });
  }

  get customerCoBorrower(): any {
    return this.customer?.CustomerData.CoBorrower;
  }

  get customerProfile(): any {
    return this.customer?.CustomerData;
  }

  openAddCustomerDialog(): void {
    const dialogRef = this.dialog.open(AddCustomerDialogComponent, {
      width: '820px',
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res.success) {
      }
    });
  }

  openSearchCoboborrowerDialogComponent(): void {
    this.dialog.open(SearchCoboborrowerDialogComponent, {
      width: '460px',
      data: {customerId: this.customerProfile?.CustomerPersonalDetails?.id}
    });
  }

}
