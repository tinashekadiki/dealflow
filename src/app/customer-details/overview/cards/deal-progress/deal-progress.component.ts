import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Process } from 'src/app/shared/models/customers/customer_profile';
import { CustomerRecordsService } from 'src/app/shared/services/customer-records/customer-records.service';
import { DealProgressService } from 'src/app/shared/services/deal-progress/deal-progress.service';

@Component({
  selector: 'app-deal-progress-card',
  templateUrl: './deal-progress.component.html',
  styleUrls: ['./deal-progress.component.scss']
})
export class DealProgressComponent implements OnInit {

  @Input('completed-processes') set completedProcesses(value: Process[]){
    this.dealProgressService.set(this.activeRoute.snapshot.params.customerId);
  }
  customerBuyingProcessList;
  isLoadingList = true;
  customerGlobalId = this.activeRoute.snapshot.params.customerId;

  constructor(private customerRecordsService: CustomerRecordsService,
              private dealProgressService: DealProgressService,
              private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCustomerBuyingProcessList();
    console.log('Processes completion stage', this.customerBuyingProcessList);
  }

  getCustomerBuyingProcessList(): any{
    this.isLoadingList = true;
    this.customerRecordsService.getDealerProcessList().subscribe((obj) => {
      this.customerBuyingProcessList = obj;
      this.isLoadingList = false;
    }, (err) => {
      this.isLoadingList = false;
    });
  }

  isProcessCompleted(processId: number): boolean{
    return this.completedProcessList?.findIndex(prc => prc.processId === processId) > -1;
  }

  get isLoading(): boolean{
    return this.isLoadingList;
  }

  get completedProcessList(): any{
    return this.dealProgressService.getCompletions(this.activeRoute.snapshot.params.customerId);
  }

}
