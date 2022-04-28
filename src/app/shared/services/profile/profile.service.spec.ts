import { TestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import { ProfileService } from './profile.service';

@Injectable({providedIn: 'root'})
class ProfileServiceStub{

}

describe('ProfileService', () => {
  let service: ProfileService;
  let profileServiceStub = new ProfileServiceStub();
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, Injectable,
      {provide: ProfileService, useClass: ProfileServiceStub}
      ],
    });
    service = TestBed.inject(ProfileService);
    profileServiceStub = TestBed.inject(ProfileServiceStub);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load with default values for notification-settings', ()=>{
    let notifications: [
      'Hard Inquiry Request Completed',
      'Prequalification Request Complete',
      'Identity Verification Fail',
      'Synthetic Fraud Fail',
      'MLA - Active Duty Match',
      'OFAC - Match',
      'Adverse Action Required',
      'Adverse Action Sent',
      'Drivers\' Licence Expired',
      'Credit Score Disclosure Sent',
      'Request to unblock profile',
      'Profile Unblocked',
      'Unlock profile request',
      'Resolution Attempt Failed',
      'Override Request Approved',
      'Override Request Declined',
      'Prequal Widget'
    ];
    expect(service.notifications).toEqual(notifications);
  });

  it('should load products-settings with default values', ()=>{
    let products: [
      'ID Scan',
      'ID Verification',
      'Text',
      'URL Link',
      'Payfone Auth',
      'Payfone Prefill',
      'Synthetic Fraud Check',
      'AIC Prefill',
      'Credit Pull',
      'Fed Checks',
      'CRM Push',
      'CDK Stock',
      'DT Send',
      'CDK W Back'
    ];
    expect(service.products).toEqual(products);
  });

  it('should load permissions with default values', ()=>{
    let permissions:[
      'Digital Application',
      'DMS Update',
      'CRM Update',
      'ID Ver',
      'View Compliance',
      'Add Purchase',
      'Push Application',
      'Record Generation',
      'Deal Desking',
      'Add Trade',
      'Appraise Trade',
      'View Credit Report'
    ];
    expect(service.permissions).toEqual(permissions);
  });

  it('should load permissionsString with default values', ()=>{
    let permissionsString: [
      'DigitalApplication',
      'DMSUpdate',
      'CRMUpdate',
      'IDVer',
      'ViewCompliance',
      'AddPurchase',
      'PushApplication',
      'RecordGeneration',
      'DealDesking',
      'AddTrade',
      'AppraiseTrade',
      'ViewCreditReport'
    ];
    expect(service.permissionString).toEqual(permissionsString);
  });

  it('should load postCDKSettings', ()=>{
    expect(service.postCDKSettings).toBeFalsy();
  })

});
