import {Injectable} from '@angular/core';
import {Process} from '../../models/customers/customer_profile';
import {CustomerRecordsService} from '../customer-records/customer-records.service';

@Injectable({
  providedIn: 'root'
})
export class DealProgressService {

  completedProcesses: any = {};
  customerIdList: any = {};

  constructor(private customerRecordService: CustomerRecordsService) {
  }

  set(customerId: string, completedProcs: Process[]) {
    this.completedProcesses[customerId] = completedProcs;
  }

  setCustomerid(customerId: string, customerIdNo: number) {
    this.customerIdList[customerId] = customerIdNo;
  }

  addNewCompletion(customerId: string, proc: Process) {
    this.generateEmptyArray(customerId);
    this.completedProcesses[customerId].push(proc);
  }

  removeProcess(customerId: string, proc: Process) {
    this.generateEmptyArray(customerId);
    let index: any;
    this.customerRecordService.deleteCustomerProcess(this.customerIdList[customerId], proc)?.subscribe(t => {
      while ((index = this.completedProcesses[customerId].findIndex((storedProc) => storedProc.processId == proc.processId)) > -1) {
        this.completedProcesses[customerId].splice(index, 1);
      }
    });

  }

  getCompletions(customerId: string) {
    this.generateEmptyArray(customerId);
    return this.completedProcesses[customerId];
  }

  generateEmptyArray(customerId: string) {
    if (this.completedProcesses[customerId] == undefined) {
      this.completedProcesses[customerId] = [];
    }
  }
}
