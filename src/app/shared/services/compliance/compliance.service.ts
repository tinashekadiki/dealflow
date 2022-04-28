import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { shareReplay, retry, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ComplianceConsentDetail } from '../../models/compliance/compliance_consent_detail';
import { ComplianceStatistic} from '../../models/compliance/compliance_history_paginated';
import { ComplianceProcessesList } from '../../models/compliance/compliance_processes';
import { CustomerComplianceProcessDetail } from '../../models/compliance/customer_compliance_process_detail';
import { CustomerComplianceProcessList } from '../../models/compliance/customer_compliance_process_list';
import { AuthorizationService } from '../authorization/authorization.service';
import { CustomerCompliance } from '../../models/customer-compliance/customer-compliance';
import { CustomerDisclosures } from '../../models/customer-disclosures/customer-disclosures';

@Injectable({
  providedIn: 'root'
})
export class ComplianceService {

  constructor(private http: HttpClient, private authorizationService: AuthorizationService) {
  }

  getComplianceDashboardMetrics(params= {}, requestBody: string[]): Observable<ComplianceStatistic[]> {
    console.log(params);
    console.log(this.authorizationService.getActiveBranch);
    return this.http.post<ComplianceStatistic[]>(environment.retrieveComplianceDashboardMetrics, requestBody, { params })
    .pipe(
      shareReplay({ bufferSize: 1, refCount: true }),
      retry(1));
  }

  getCustomerComplianceProcessList(customer, eventCode): Observable<CustomerComplianceProcessList> {
    console.log(customer);
    return this.http.get<CustomerComplianceProcessList>(
      `${environment.getCustomerComplianceProcessesUrl}${customer.customerGlobalId}`, {
        params: {
          eventCode
        },
      }
      ).pipe(
      shareReplay({ bufferSize: 1, refCount: true }),
      retry(1));
  }

  getCustomerComplianceProcessesDetail(proccessId: number): Observable<CustomerComplianceProcessDetail> {
    return this.http.get<CustomerComplianceProcessDetail>(environment.getCustomerComplianceProcessDetailUrl+proccessId)
    .pipe(retry(1));
  }

  getCustomerConsentComplianceProccessDetail(proccessId:number): Observable<ComplianceConsentDetail> {
    return this.http.get<ComplianceConsentDetail>(environment.getCustomerComplianceConsentProcessDetailUrl+proccessId)
    .pipe(retry(1));
  }

  getComplianceProcessesList(): Observable<ComplianceProcessesList> {
    return this.http.get<ComplianceProcessesList>(environment.allComplianceProcessesUrl)
    .pipe(retry(1));
  }

  // new endpoints

  // History
  fetchComplianceRecord(globalCustomerId): Observable<CustomerCompliance> {
    return this.http.get<CustomerCompliance>(
      `${environment.fetchComplianceRecords}`, {
        params: {
          globalCustomerId
        },
      }
    ).pipe(
      shareReplay({ bufferSize: 1, refCount: true }),
      retry(1));
  }

  fetchComplianceRecords(globalCustomerId: string, flag: string): Observable<Array<CustomerCompliance>> {
    return this.http.get<Array<CustomerCompliance>>(
      `${environment.fetchComplianceRecordHistory}`, {
        params: {
          globalCustomerId,
          flag
        },
      }
    ).pipe(
      shareReplay({ bufferSize: 1, refCount: true }),
      retry(1));
  }

  fetchSignedConsent(globalCustomerId, phoneNumber): Observable<Array<CustomerDisclosures>>{
    return this.http.get<Array<CustomerDisclosures>>(
      `${environment.fetchSignedConsent}`, {
        params: {
          globalCustomerId,
          phoneNumber
        },
      }
    ).pipe(
      shareReplay({ bufferSize: 1, refCount: true }),
      retry(1));
  }

  overrideResponse(response: any) {
    return this.http.post(`${environment.overrideResponse}`, response).pipe(
      shareReplay({ bufferSize: 1, refCount: true }),
      retry(1));
  }

  overrideRequest(request: any) {
    return this.http.post(`${environment.overrideRequest}`, request).pipe(
      shareReplay({ bufferSize: 1, refCount: true }),
      retry(1));
  }

  fetchRecordToResolve(flag: any, id: any) {
    return this.http.get(`${environment.fetchRecordToResolve}`, {
      params: {
        flag,
        id
      }
    }).pipe(
      shareReplay({ bufferSize: 1, refCount: true }),
      retry(1));
  }

  dealerDriveRequest(request: any) {
    return this.http.post(`${environment.dealerDriveRequest}`, request).pipe(
      shareReplay({ bufferSize: 1, refCount: true }),
      retry(1));
  }

  digitalAuthRequest(request: any) {
    return this.http.post(`${environment.digitalAuthRequest}`, request).pipe(
      shareReplay({ bufferSize: 1, refCount: true }),
      retry(1));
  }

  fraudCheckRequest(request: any) {
    return this.http.post(`${environment.fraudCheckRequest}`, request).pipe(
      shareReplay({ bufferSize: 1, refCount: true }),
      retry(1));
  }

  fetchResolutionTypes(request: any) {
    return this.http.get(`${environment.fetchResolutionTypes}`, {
      params: {

      }
    }).pipe(
      shareReplay({ bufferSize: 1, refCount: true }),
      retry(1));
  }

  fetchRecordTypes(request: any) {
    return this.http.get(`${environment.fetchRecordTypes}`, {
      params: {

      }
    }).pipe(
      shareReplay({ bufferSize: 1, refCount: true }),
      retry(1));
  }

}
