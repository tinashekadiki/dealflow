import { Component, Input, OnInit } from '@angular/core';
import { CustomerProfile } from 'src/app/shared/models/customers/customer_profile';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {


  // tslint:disable-next-line: no-input-rename
  @Input('customer-profile') customerProfile: CustomerProfile;

  // tslint:disable-next-line: no-input-rename
  @Input('is-profile-loading') isProfileLoading = true;

  totalVehiclePrice = 0;

  totalTradeInValue = 0;

  constructor() { }

  ngOnInit(): void {
    console.log(this.customerProfile);
  }

  acceptTotalPrice(data): number {
    return this.totalVehiclePrice = data;
  }

  acceptTotalTradeInValue(data): number {
    return this.totalTradeInValue = data;
  }

}
