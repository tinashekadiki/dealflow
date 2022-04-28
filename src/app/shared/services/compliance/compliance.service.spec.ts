import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { AuthorizationService } from '../authorization/authorization.service';
import { ComplianceService } from './compliance.service';
import { of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as SampleDashboardResponse from '../../../testing/json/compliance_dashboard_response.json';
import { ComplianceHistoryPaginated } from '../../models/compliance/compliance_history_paginated';

describe('ComplianceService', () => {
  let httpClientSpy: { post: jasmine.Spy, get:jasmine.Spy};
  let service: ComplianceService;
  let authorizationService: AuthorizationService;
  let sampleComplianceResponse: ComplianceHistoryPaginated = SampleDashboardResponse;
  let complianceListObj = {processes:[
    {
      "id": 1,
      "description": "Identity Verified",
      "globalCustomerId": "test",
      "timeCreated": "2020-03-03 18:00:00",
      "timeZone": "UTC+6",
      "parentid": "234",
      "process": "RedFlag",
      "service": true,
      "result": true,
      "branchId": "234024",
      "page": "RFG07"
  }
  ]}

  let complianceHistoryDetail = {
    "branchId": "test",
    "firstname": "test",
    "address": "test",
    "profileStatus": "test",
    "history": complianceListObj.processes,
    "pageId": "RedFlag",
    "transactionDate": "test",
    "globalCustomerId": "test",
    "transactionId": "test",
    "parentId": "test",
    "lastname": "test",
    "historyDate": "test",
    "licenseExpiryDate": "test",
    "subTitle": "test",
    "cellnumber": "test",
    "titleHeader": "test",
    "dob": "test",
    "actionMessage": "test",
    "historyTime": "test",
    "email": "test",
}


  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post',"get"]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ComplianceService,
        {provide: HttpClient, useValue: httpClientSpy},
        {
          provide: AuthorizationService, useValue: {
            permissions: { branchId: "234024", dealerid:"234" }
          }
        }
      ]
    });
    service = TestBed.inject(ComplianceService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe("#getComplianceDashboardMetrics",()=>{
    it("should return expected ComplianceHistory (with HttpClient called once)",()=>{

      httpClientSpy.post.and.returnValue(of(SampleDashboardResponse));

    service.getComplianceDashboardMetrics().subscribe(
      (compliance) => expect(compliance).toEqual(sampleComplianceResponse, 'expected compliance records'),
      fail
    );

    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
    })

    it('should return an error when the server returns a 500', () => {
      const errorResponse = new HttpErrorResponse({
        error: 'test 500 error',
        status: 500, statusText: 'Internal Server Error'
      });

      httpClientSpy.post.and.returnValue(throwError(errorResponse));

      service.getComplianceDashboardMetrics().subscribe(
        compliance => fail('expected an error, not compliance records'),
        error  => {expect(error.error).toContain(`test 500 error`)}
      );

      expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
    });
  });

  describe("#getCustomerComplianceProcessList",()=>{
    it("should return expected Compliance Process List (with HttpClient called once)",()=>{

      httpClientSpy.get.and.returnValue(of(complianceListObj));

    service.getCustomerComplianceProcessList("test").subscribe(
      (compliance) => expect(compliance).toEqual(complianceListObj, 'expected compliance records'),
      fail
    );

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    })

    it('should return an error when the server returns a 500', () => {
      const errorResponse = new HttpErrorResponse({
        error: 'test 500 error',
        status: 500, statusText: 'Internal Server Error'
      });

      httpClientSpy.get.and.returnValue(throwError(errorResponse));

      service.getCustomerComplianceProcessList("test").subscribe(
        compliance => fail('expected an error, not compliance processes'),
        error  => {expect(error.error).toContain(`test 500 error`)}
      );

      expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });
  });

  describe("#getCustomerComplianceProccessDetail",()=>{
    it("should return expected Compliance Process Details (with HttpClient called once)",()=>{

      httpClientSpy.get.and.returnValue(of({kafkaData:"{\"branchId\": \"test\",\"firstname\": \"test\",\"address\": \"test\",\"profileStatus\": \"test\",\"history\": [{  \"id\": 1,  \"description\": \"Identity Verified\",  \"globalCustomerId\": \"test\",  \"timeCreated\": \"2020-03-03 18:00:00\",  \"timeZone\": \"UTC+6\",  \"parentid\": \"234\",  \"process\": \"RedFlag\",  \"service\": true,  \"result\": true,  \"branchid\": \"234024\",  \"page\": \"RFG07\"  }],\"pageId\": \"RedFlag\",\"transactionDate\": \"test\",\"globalCustomerId\": \"test\",\"transactionId\": \"test\",\"parentId\": \"test\",\"lastname\": \"test\",\"historyDate\": \"test\",\"licenseExpiryDate\": \"test\",\"subTitle\": \"test\",\"cellnumber\": \"test\",\"titleHeader\": \"test\",\"dob\": \"test\",\"actionMessage\": \"test\",\"historyTime\": \"test\",\"email\": \"test\"}"}));

    service.getCustomerComplianceProcessesDetail(1).subscribe(
      (compliance) => expect(compliance).toEqual(complianceHistoryDetail, 'expected compliance records'),
      fail
    );

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    })

    it('should return an error when the server returns a 500', () => {
      const errorResponse = new HttpErrorResponse({
        error: 'test 500 error',
        status: 500, statusText: 'Internal Server Error'
      });

      httpClientSpy.get.and.returnValue(throwError(errorResponse));

      service.getCustomerComplianceProcessesDetail(1).subscribe(
        compliance => fail('expected an error, not compliance processes'),
        error  => {expect(error.error).toContain(`test 500 error`)}
      );

      expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });
  });

});
