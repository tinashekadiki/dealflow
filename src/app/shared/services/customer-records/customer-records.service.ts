import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, retry, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CustomerListPaginated } from '../../models/customers/customer_list_paginated';
import { FullCustomerData } from '../../models/customers/full_customer_data';
import { NewCustomer } from '../../models/customers/new_customer';
import { CustomerCreated } from '../../models/customers/customer_created';
import { AuthorizationService } from '../authorization/authorization.service';
import { CustomerProfile, Process } from '../../models/customers/customer_profile';
import { CustomerDigitalApplication } from '../../models/customers/customer_digital_application';
import { request } from "express";

@Injectable({
  providedIn: 'root'
})
export class CustomerRecordsService {

  constructor(private http: HttpClient, private userService: AuthorizationService) {
  }

  public customerCreated: CustomerCreated;
  private _profileRefreshTrigger: BehaviorSubject<boolean> = new BehaviorSubject(false);

  formatDate(date: string, type = 'display'): string {
    const day = date.substr(8, 2);
    let month = date.substr(5, 2);
    const year = date.substr(0, 4);
    if (type === 'display') {
      month = environment.monthNames[parseInt(month, 10) - 1];
      return `${month.toString()} ${day}, ${year}`;
    } else if (type === 'input') {
      return `${month}/${day}/${year}`;
    }
  }

  formatSsn(ssn: string): string {
    // check if already formatted
    if (ssn !== undefined){
      if (ssn.includes('-') || ssn.length === 0){
        return ssn;
      }
      else{
        return `${ssn.slice(0, 3)}-${ssn.slice(3, 5)}-${ssn.slice(5, 9)}`;
      }
    }
  }

  // POST
  addCustomer(newCustomer: NewCustomer): Observable<any> {
    const data = {
      ...newCustomer,
      branchId: this.userService.getActiveBranch?.branchId
    };

    return this.http.post(environment.manualCreateProfileUrl, data, { responseType: 'text' });
  }


  shouldTriggerProfileRefresh(shouldI: boolean): any {
    this._profileRefreshTrigger.next(shouldI);
  }

  triggerProfileRefresh(): any {
    return this._profileRefreshTrigger.asObservable();
  }


  addCoBorrower(customer_id: number, borrower_id: number): any {
    const data = {
      firstCustomerId: customer_id,
      secondCustomerId: borrower_id
    };

    return this.http.post(environment.addCustomerCoBorrowerUrl, data).pipe(
      map((resp) => {
        this.shouldTriggerProfileRefresh(true);
        return resp;
      })
    );
  }

  getCustomers(params = {}): Observable<CustomerListPaginated> {
    return this.http.get<CustomerListPaginated>(environment.customerListBaseUrl, { params })
      .pipe(
        shareReplay({ bufferSize: 1, refCount: true }),
        retry(1));
  }

  getArchivedCustomers(params = {}): Observable<CustomerListPaginated> {
    return this.http.get<CustomerListPaginated>(environment.dateSearchArchivedCustomerUrl, { params })
      .pipe(
        shareReplay({ bufferSize: 1, refCount: true }),
        retry(1));
  }

  getCustomer(customerId: string): Observable<FullCustomerData> {
    const data = {
      request: {
        globalcustomerid: customerId
      }
    };

    return this.http.post<FullCustomerData>(environment.customerProfileBaseUrl, data)
      .pipe(
        map((custData) => {
          console.log("SSN: ", custData.CustomerData.CustomerPersonalDetails.socialSecurityNumber);
          console.log("cellPhone: ", custData.CustomerData.CustomerContactDetails.cellPhone);
          custData.CustomerData.CustomerPersonalDetails.socialSecurityNumber = this.formatSSN(custData.CustomerData.CustomerPersonalDetails.socialSecurityNumber);
          custData.CustomerData.CustomerContactDetails.cellPhone = this.formatCellPhone(custData.CustomerData.CustomerContactDetails.cellPhone);
          return custData;
        }),
        shareReplay({ bufferSize: 1, refCount: true }),
        retry(1));
  }


  deleteCustomer(customerId: string): Observable<any> {
    const data = {
      globalcustomerid: customerId
    };

    return this.http.post(environment.deleteCustomerUrl, data, { responseType: 'text' });
  }

  getCustomerDigitalApplication(customer: CustomerProfile): Observable<any> {
    let requestBody;
    if (customer.CoBorrower === null) {
      requestBody = {
        globalCustomerId: customer.CustomerPersonalDetails.customerGlobalId
      };
    }
    else {
      requestBody = {
        globalCustomerId: customer.CustomerPersonalDetails.customerGlobalId,
        coborrowerId: customer.CoBorrower.customerGlobalId
      };
    }
    return this.http.post(environment.retrieveDigitalApplicationRequestUrl, requestBody).pipe(retry(1));
  }

  getCustomerProcessList(customerId: number): Observable<Process[]> {
    return this.http.get<Process[]>(environment.specificCustomerSalesProcess + customerId)
      .pipe(
        shareReplay({ bufferSize: 1, refCount: true }),
        retry(1));
  }

  deleteCustomerProcess(customerId: string, process: Process): Observable<any> {
    if (customerId === undefined || process === undefined) {
      return;
    }

    return this.http.post<any>(environment.deleteCustomerSalesProcess + customerId + '/' + process.processId, {})
      .pipe(
        shareReplay({ bufferSize: 1, refCount: true }),
        retry(1));
  }

  markAsArchived(customerId: string): any {
    const data = {
      request: {
        globalcustomerid: customerId,
        status: 'ARCHIVED'
      }
    };

    return this.http.post(environment.markArchivedCustomerUrl, data, { responseType: 'text' })
      .pipe(
        shareReplay({ bufferSize: 1, refCount: true }),
        retry(1));

  }

  getDealerProcessList(): Observable<any> {
    return this.http.get(environment.saleProcessConfigurationUrl + this.userService?.activeBranch.branchId + '/SALES');
  }

  getApplicationDetails(data: any): Observable<any> {
    return this.http.post(environment.applicationDetailsUrl, data);
  }

  getCustomerFolder(globalcustomerId: any) {
    const payload = {
      request: {
        globalcustomerid: globalcustomerId,
        branchid: this.userService.getActiveBranch?.branchId,
        parentid: this.userService.activeUser.organisationalId
      }
    }
    return this.http.post(environment.getCustomerFolderUrl, payload);
  }

  formatSSN (SSN: any): any {
    let formatted = /^\(\d{3}\)-\d{2}-\d{4}$/;
    if (formatted.test(SSN)) {
      return SSN;
    }
    else if (SSN.length == 9) {
      let formattedSSN = SSN.replace(/\d{5}/, 'XXX-XX-');
      return formattedSSN;
    }
    else {
      return
    }
  }

  formatCellPhone (cellPhone: string): string {
    let formatted = /^\(\d{3}\)-\d{3}-\d{4}$/;
    if (formatted.test(cellPhone)) {
      return cellPhone;
    }
    else if (cellPhone.length == 10) {
      let formattedCellPhone = '(' + cellPhone.substring(0,3) + ')' + '-' + cellPhone.substring(3,6) + '-' + cellPhone.substring(6,10);
      return formattedCellPhone
    }
    else {
      return cellPhone.replace(/ /g, '').replace(/\)/, ')-');
    }
  }

}
