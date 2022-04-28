/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventoryService } from '../../../services/inventory/inventory.service';
import { AddPurchaseVehicleDialogComponent } from './add-purchase-vehicle-dialog.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Vehicle } from 'src/app/shared/models/vehicle-inventory/vehicle';
import {default as SampleVehicleList} from '../../../../testing/json/vehicle_list.json'
import { VehicleListPaginated } from 'src/app/shared/models/vehicle-inventory/vehicle_list_paginated';
import { of, throwError } from 'rxjs';


describe('AddPurchaseVehicleDialogComponent', () => {
  let component: AddPurchaseVehicleDialogComponent;
  let fixture: ComponentFixture<AddPurchaseVehicleDialogComponent>;
  let inventoryService: InventoryService;
  let matDialogRef: MatDialogRef<AddPurchaseVehicleDialogComponent>;
  let snackBar:MatSnackBar;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };
  let vehicleList: VehicleListPaginated = SampleVehicleList;
  let vehicle:Vehicle = {
    vin: "123VIN",
    mileage: 2300,
    model: "CAMR",
    year: 2020,
    exteriorColor: "string",
    makeName: "Toyota",
    vehicleStock: "123STO",
    stockType: "string",
    modelType: "CAMR",
    price: 20500,
    parentId: "string",
    dealerId: "string",
    bodyStyle: "SD",
    financeCompany: "string",
    pricingType: "string",
}


  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ AddPurchaseVehicleDialogComponent ],
      imports:[MatDialogModule,MatAutocompleteModule],
      schemas:[CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: MatSnackBar, useValue:{open: (message, action, opt) => {}}},
        {provide: MatDialogRef, useValue: mockDialogRef},
        {provide: MAT_DIALOG_DATA, useValue: {customerId:"test"}},
        {provide: InventoryService, useValue: {
          getVehicleInventoryList:()=>of(vehicleList),
          addPurchaseVehicle:(customerId,vin)=>of({})
        }}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPurchaseVehicleDialogComponent);
    inventoryService = TestBed.inject(InventoryService);
    matDialogRef = TestBed.inject(MatDialogRef);
    snackBar = TestBed.inject(MatSnackBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("#ngOnInit",()=>{
    it("should make expected calls",()=>{
      spyOn(component,"initiateStockSearch");
      spyOn(component,"initiateVinSearch");

      component.ngOnInit();

      expect(component.initiateVinSearch).toHaveBeenCalled();
      expect(component.initiateStockSearch).toHaveBeenCalled();
    })
  })

  describe("#onNoClick()",()=>{
    it("should close dialog box",()=>{

      component.onNoClick();

      expect(matDialogRef.close).toHaveBeenCalled();
    })
  });

  describe("#displayStockNoFn()",()=>{
    it("should display StockNo",()=>{
      let result = component.displayStockNoFn(vehicle);

      expect(result).toEqual("123STO")
    })
  })

  describe("#displayVinFn()",()=>{
    it("should display VIN",()=>{
      let result = component.displayVinFn(vehicle);

      expect(result).toEqual("123VIN")
    })
  })

  describe("#displayVehicleName()",()=>{
    it("should display car as Year Make Model Trim",()=>{
      let result = component.displayVehicleName(vehicle);

      expect(result).toEqual("2020 Toyota CAMR SD");
    });
  });

  describe("#getPurchaseVehicleByStockNo()",()=>{
    it("should call #getVehicleInventoryList() with vehicleStock",()=>{
      spyOn(component,"getVehicleInventoryList");

      component.getPurchaseVehicleByStockNo("6u6");

      expect(component.getVehicleInventoryList).toHaveBeenCalledWith({vehicleStock:"6U6"});
    });
  })

  describe("#getPurchaseVehicleByVin()",()=>{
    it("should call #getVehicleInventoryList() with VIN",()=>{
      spyOn(component,"getVehicleInventoryList");

      component.getPurchaseVehicleByVin("45TY");

      expect(component.getVehicleInventoryList).toHaveBeenCalledWith({vin:"45TY"});
    });
  })

  // fdescribe("#initiateVinSearch",()=>{
  //   it("should carry out search when the text input changes", ()=>{
  //     spyOn(component,"getPurchaseVehicleByVin").and.returnValue(of(vehicleList));
  //     component.initiateVinSearch();

  //     component.searchVinCtrl.setValue("45667DREAWQ");

  //     // await fixture.whenStable();

  //     expect(component.isLoading).toBeFalse();
  //     expect(component.getPurchaseVehicleByVin).toHaveBeenCalledWith("45667DREAWQ");
  //     // expect(component.filterVehicleList).toEqual(vehicleList.vehicles);

  //   })
  // })

  describe("#getVehicleInventoryList()",()=>{
    it("should call #getVehicleInventoryList() with param",()=>{
      spyOn(inventoryService,"getVehicleInventoryList");

      component.getVehicleInventoryList({test:"test"})

      expect(inventoryService.getVehicleInventoryList).toHaveBeenCalledWith({test:"test"});
    })
  })

  describe("#submitRequest",()=>{
    it("should call #addPurchaseVehicle and on success should open snackBar, stop loading, close dialog",()=>{
      component.selectedVehicle = vehicle;
      component.data ={customerId:"test"};

      spyOn(inventoryService,"addPurchaseVehicle").and.returnValue(of({}));
      spyOn(snackBar,"open");

      component.submitRequest();

      expect(component.isLoading).toBeFalse();
      expect(inventoryService.addPurchaseVehicle).toHaveBeenCalledWith("test","123VIN")
      expect(snackBar.open).toHaveBeenCalledWith("Vehicle has been added","Dismiss",{
        duration: 5000
      });
      expect(matDialogRef.close).toHaveBeenCalled();
    })
    it("should call #addPurchaseVehicle and on error should open snackBar, stop loading",()=>{
      component.selectedVehicle = vehicle;
      component.data ={customerId:"test"};

      spyOn(inventoryService,"addPurchaseVehicle").and.returnValue(throwError("error"));
      spyOn(snackBar,"open");

      component.submitRequest();

      expect(component.isLoading).toBeFalse();
      expect(inventoryService.addPurchaseVehicle).toHaveBeenCalledWith("test","123VIN")
      expect(snackBar.open).toHaveBeenCalledWith("Unable to add vehicle, please try again","Dismiss",{
        duration: 5000
      });
    })
  })

  describe("#clearSelection()",()=>{
    it("should create search fields and selected vehicles",()=>{
      spyOn(component,"initiateStockSearch");
      spyOn(component,"initiateVinSearch");

      component.searchStockNumberCtrl.setValue("test");
      component.searchVinCtrl.setValue("test");
      component.selectedVehicle = vehicle;

      component.clearSelection();

      expect(component.searchStockNumberCtrl.value).toEqual("");
      expect(component.searchVinCtrl.value).toEqual("");
      expect(component.selectedVehicle).toBeUndefined();
    });
  })

  describe("#readyToSubmit",()=>{
    it("should return false if #selectedVehicle is undefined",()=>{
      component.selectedVehicle = undefined;

      let result1 = component.readyToSubmit;

      expect(result1).toBeFalse();
    })

    it("should return false if #data.customerId is undefined",()=>{
      component.selectedVehicle = vehicle;
      component.data = {};
      let result = component.readyToSubmit;

      expect(result).toBeFalse();
    })

    it("should return true if #data.customerId and #selectedVehicle are present",()=>{
      component.selectedVehicle = vehicle;
      component.data ={customerId:"test"};

      let result = component.readyToSubmit;

      expect(result).toBeTrue();
    })
  })

});
