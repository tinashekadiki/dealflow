import { Component, Input, OnInit } from '@angular/core';
import { CustomerProfile } from 'src/app/shared/models/customers/customer_profile';

@Component({
  selector: 'app-desking-card',
  templateUrl: './desking.component.html',
  styleUrls: ['../shared.component.scss', './desking.component.scss']
})
export class DeskingComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('customer-profile') customerProfile: CustomerProfile;
  // tslint:disable-next-line: no-input-rename
  @Input('total-price') totalPrice: number;
  // tslint:disable-next-line: no-input-rename
  @Input('total-trade') totalTrade: number;

  isOpen = false;

  fees = 0;
  serviceContract = 0;
  insuranceGapVsi = 0;
  accessories = 0;
  totalTax = 0;
  downpayment = 0;

  constructor() { }

  ngOnInit(): void {
  }

  get amountFinanced(): number {
    return Number(this.totalPrice) + Number(this.fees) + Number(this.serviceContract) + Number(this.insuranceGapVsi)
     + Number(this.accessories) + Number(this.totalTax) - Number(this.downpayment) - Number(this.totalTrade);
  }

}
