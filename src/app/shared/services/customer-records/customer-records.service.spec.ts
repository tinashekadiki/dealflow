import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AuthorizationService } from '../authorization/authorization.service';
import { CustomerRecordsService } from './customer-records.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { default as SampleCustomerList } from '../../../testing/json/customer_list.json';
import { default as SampleCustomerProfile } from '../../../testing/json/profile_coborrower.json';
import { default as SampleProcessConfig } from '../../../testing/json/process_config.json';
import { CustomerListPaginated } from '../../models/customers/customer_list_paginated';
import { environment } from 'src/environments/environment';
import { FullCustomerData } from '../../models/customers/full_customer_data';

describe('CustomerRecordsService', () => {
  let service: CustomerRecordsService;
  let authorizationService: AuthorizationService;
  const customerListPaginated: CustomerListPaginated = SampleCustomerList;
  const customerProfile: FullCustomerData = SampleCustomerProfile;


  beforeEach(() => {
    // httpClientSpy = jasmine.createSpyObj('HttpClient', ['post','get']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CustomerRecordsService,
        {
          provide: AuthorizationService, useValue: {
            permissions: { branchid: '234024' }
          }
        }
      ]
    });
    service = TestBed.inject(CustomerRecordsService);
    authorizationService = TestBed.inject(AuthorizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getCustomers', () => {
    it('makes expected HTTP GET calls to the customer records service to return customer list', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);

      service.getCustomers().subscribe(res => {
        expect(res).toEqual(customerListPaginated);
      });

      const req = httpTestingController.expectOne(environment.customerListBaseUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(SampleCustomerList);
      httpTestingController.verify();
    });

    it('makes expected HTTP GET calls with params to the customer records service to return customer list', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);

      const params = { page: 1, pageSize: 10 };

      service.getCustomers(params).subscribe(res => {
        expect(res).toEqual(customerListPaginated);
      });


      const req = httpTestingController.expectOne(environment.customerListBaseUrl + '?page=1&pageSize=10');
      expect(req.request.method).toEqual('GET');
      req.flush(SampleCustomerList);
      httpTestingController.verify();
    });
  });

  describe('#getCustomer', () => {
    it('makes expected HTTP POST calls to the customer records service to return customer profile', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);

      const customerId = 'test';

      service.getCustomer(customerId).subscribe(res => {
        expect(res).toEqual(customerProfile);
      });


      const req = httpTestingController.expectOne(environment.customerProfileBaseUrl);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual({
        request: {
          globalcustomerid: customerId
        }
      });
      req.flush(SampleCustomerProfile);
      httpTestingController.verify();
    });

    it('makes expected HTTP POST calls to the customer records service to return customer profile with hidden SSN', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);

      const customerId = 'test';

      service.getCustomer(customerId).subscribe(res => {
        expect(res).toEqual(customerProfile);
        expect(res.CustomerData.CustomerPersonalDetails.socialSecurityNumber).toEqual('XXX-XX-4563');
      });


      const req = httpTestingController.expectOne(environment.customerProfileBaseUrl);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual({
        request: {
          globalcustomerid: customerId
        }
      });
      SampleCustomerProfile.CustomerData.CustomerPersonalDetails.socialSecurityNumber = '232-34-4563';
      req.flush(SampleCustomerProfile);
      SampleCustomerProfile.CustomerData.CustomerPersonalDetails.socialSecurityNumber = null;
      httpTestingController.verify();
    });
  });

  describe('#getDealerProcessList', () => {
    it('makes expected HTTP POST calls to the BLC service to return dealer process', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);

      service.getDealerProcessList().subscribe(res => {
        expect(res).toEqual(SampleProcessConfig);
      });


      const req = httpTestingController.expectOne(environment.saleProcessConfigurationUrl + authorizationService.permissions.branchid);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual({});
      req.flush(SampleProcessConfig);
      httpTestingController.verify();
    });
  });



  it('should load addCustomer', () => {
    expect(service.addCustomer).toBeTruthy();
  });

});
