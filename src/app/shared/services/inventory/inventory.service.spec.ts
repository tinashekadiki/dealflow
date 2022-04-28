import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { VehicleListPaginated } from '../../models/vehicle-inventory/vehicle_list_paginated';
import { InventoryService } from './inventory.service';
import { default as SampleVehicleList } from '../../../testing/json/vehicle_list.json'
import { default as SamplePurchaseVehicle } from '../../../testing/json/purchase_vehicle.json'
import { PurchaseVehicle } from '../../models/vehicle-inventory/purchase_vehicle';
import { environment } from 'src/environments/environment';
import { DealProgressService } from '../deal-progress/deal-progress.service';
import { Process } from '../../models/customers/customer_profile';

describe('InventoryService', () => {
  let service: InventoryService;
  let dealProgressService:DealProgressService;
  let httpTestingController:HttpTestingController;

  let vehicleListPaginated:VehicleListPaginated = SampleVehicleList;
  let purchaseVehicle:PurchaseVehicle[] = SamplePurchaseVehicle;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [
        InventoryService,
        {provide: DealProgressService, useValue:{
          addNewCompletion:(customerId:string,proc:Process)=>{},
          removeProcess:(customerId:string,proc:Process)=>{}
        }}
      ]
    });
    service = TestBed.inject(InventoryService);
    dealProgressService = TestBed.inject(DealProgressService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe("#getVehicleInventoryList()",()=>{
    it('makes expected HTTP GET calls to the inventory service to return vehicle inventory list', () => {

      service.getVehicleInventoryList().subscribe(res => {
        expect(res).toEqual(vehicleListPaginated);
      });

      const req = httpTestingController.expectOne(environment.getVehicleInventoryList);
      expect(req.request.method).toEqual('GET');
      req.flush(SampleVehicleList);
      httpTestingController.verify();
    });

    it('makes expected HTTP GET calls with params to the inventory service to return vehicle inventory list', () => {

      let params = { page: 1, pageSize: 10 }

      service.getVehicleInventoryList(params).subscribe(res => {
        expect(res).toEqual(vehicleListPaginated);
      });


      const req = httpTestingController.expectOne(environment.getVehicleInventoryList + "?page=1&pageSize=10");
      expect(req.request.method).toEqual('GET');
      req.flush(SampleVehicleList);
      httpTestingController.verify();
    });
  })

  describe("#getCustomerPurchaseVehicle()",()=>{
    it('makes expected HTTP GET calls to the inventory service to return customer purchase vehicles list', () => {

      service.getCustomerPurchaseVehicle("test").subscribe(res => {
        expect(res).toEqual(purchaseVehicle);
      });


      const req = httpTestingController.expectOne(environment.getPurchaseVehicleUrl + "test");
      expect(req.request.method).toEqual('GET');
      req.flush(SamplePurchaseVehicle);
      httpTestingController.verify();
    });
  })

  describe("#addPurchaseVehicle()",()=>{
    it('makes expected HTTP POST calls to the inventory service to request addition of a purchase vehicle', fakeAsync (() => {
      spyOn(service,"shouldTriggerRefresh")

      service.addPurchaseVehicle("test-cust","test-vin").toPromise()
      .then(res => {
        expect(res).toEqual({});
        expect(service.shouldTriggerRefresh).toHaveBeenCalledWith(true);
      });

      const req = httpTestingController.expectOne(environment.addPurchaseVehicleUrl);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual({globalCustomerId: "test-cust", vin: "test-vin" });
      req.flush({});
      httpTestingController.verify();
    }));
  })

  describe("#deletePurchaseVehicle()",()=>{
    it('makes expected HTTP POST calls to the inventory service to request deletion of a purchase vehicle', fakeAsync (() => {
      spyOn(service,"shouldTriggerRefresh")
      spyOn(dealProgressService,"removeProcess")

      service.deletePurchaseVehicle(1,"test").toPromise()
      .then(res => {
        expect(res).toEqual({});
        expect(service.shouldTriggerRefresh).toHaveBeenCalledWith(true);
        expect(dealProgressService.removeProcess).toHaveBeenCalledWith("test",{processId: 4});
      });

      const req = httpTestingController.expectOne(environment.deletePurchaseVehicleUrl);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual({id: 1 });
      req.flush({});
      httpTestingController.verify();
    }));
  })

  
  it('should load triggerRefresh', ()=>{
    expect(service.triggerRefresh).toBeTruthy();
  });
  
  it('#shouldTriggerRefresh should should update trigger', ()=>{
    service.shouldTriggerRefresh(true);

    service.triggerRefresh().subscribe((result)=>{
      expect(result).toBeTrue()
    })

  });
  
  
});
