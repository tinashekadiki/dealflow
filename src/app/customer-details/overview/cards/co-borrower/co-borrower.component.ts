import { Component, Input, OnInit } from '@angular/core';
import { CustomerCoborrower } from 'src/app/shared/models/customers/customer_coborrower';

@Component({
  selector: 'app-co-borrower',
  templateUrl: './co-borrower.component.html',
  styleUrls: ['../shared.component.scss', './co-borrower.component.scss']
})
export class CoBorrowerComponent implements OnInit {

  _coBorrower: CustomerCoborrower;

  @Input('customer-co-borrower') set customerCoBorrower(value: CustomerCoborrower) {
    this._coBorrower = value;
  }

  get customerCoBorrower(): CustomerCoborrower {
    return this._coBorrower;
  }

  get formattedAddress() {
    return this.customerCoBorrower?.address;
  }

  get phoneNumber() {
    return this.customerCoBorrower?.phoneNumber;
  }

  get licenseNumber() {
    return this.customerCoBorrower?.licenseNumber;
  }

  get expiryDate() {
    return this.customerCoBorrower?.expiryDate;
  }

  isOpen = false;

  ngOnInit() {
  }

}
