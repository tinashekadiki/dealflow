import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { FilterObj } from 'src/app/shared/models/filters/filter_obj';
import { VehicleListPaginated } from 'src/app/shared/models/vehicle-inventory/vehicle_list_paginated';
import { InventoryService } from 'src/app/shared/services/inventory/inventory.service';
import { environment } from 'src/environments/environment';
import {default as SampleVehicleList } from '../../testing/json/vehicle_list.json';

import { InventoryComponent } from './inventory.component';

describe('InventoryComponent', () => {
  let component: InventoryComponent;
  let fixture: ComponentFixture<InventoryComponent>;
  let matSnackBar: MatSnackBar;
  let matDialog: MatDialog;
  let inventoryService:InventoryService;
  let vechicleListPaged:VehicleListPaginated = SampleVehicleList;
  let afterClosedResp = undefined;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      
      declarations: [ InventoryComponent ],
      imports:[NoopAnimationsModule,MatMenuModule, MatTableModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: InventoryService, useValue: {getVehicleInventoryList:(params)=>of(vechicleListPaged)}},
        {provide: MatSnackBar, useValue:{open: (message, action, opt) => {}}},
        {provide: MatDialog, useValue:{open: (component, config?)=>{return {afterClosed:()=>of(afterClosedResp)}}}},
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryComponent);
    matSnackBar = TestBed.inject(MatSnackBar);
    inventoryService = TestBed.inject(InventoryService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("#ngOnInit",()=>{
    it("should call #getVehicleList()",()=>{
      spyOn(component,"getVehicleList");

      component.ngOnInit();

      expect(component.getVehicleList).toHaveBeenCalled();
    });
  });

  describe('#handlePageChange', () => {
    it('should set page and pageSize and then call #getVehicleList()', () => {
      spyOn(component, 'getVehicleList');

      let eventResp = { pageIndex: 3, pageSize: 23 };

      component.handlePageChange(eventResp);

      expect(component.page).toEqual(3);
      expect(component.pageSize).toEqual(23);
      expect(component.getVehicleList).toHaveBeenCalled();
    });
  });


  describe("#openTextDialog",()=>{
    it("should open the dialog and should not call apply filters if the result from the dialog is undefined",()=>{
      afterClosedResp = undefined;

      spyOn(component,"applyFilter");

      component.openTextDialog("makeName","Make Name");

      expect(component.applyFilter).not.toHaveBeenCalled();
    })

    it("should open the dialog and should call apply filters if the result from the dialog is an object",()=>{
      afterClosedResp = {name:"makeName",value:"Jee"};

      spyOn(component,"applyFilter");

      component.openTextDialog("makeName","Make Name");

      expect(component.applyFilter).toHaveBeenCalledWith(afterClosedResp.name,afterClosedResp.value);
    })
  });

  describe("#openRangeDialog",()=>{
    it("should open the dialog and should not call apply filters if the result from the dialog is undefined",()=>{
      afterClosedResp = undefined;

      spyOn(component,"applyFilter");

      component.openRangeDialog("mileage","Mileage");

      expect(component.applyFilter).not.toHaveBeenCalled();
    })

    it("should open the dialog and should call apply filters if the result from the dialog is an object",()=>{
      afterClosedResp = {name:"mileage",value:{min:1000,max:10000}};

      spyOn(component,"applyFilter");

      component.openRangeDialog("mileage","Mileage");

      expect(component.applyFilter).toHaveBeenCalledWith(afterClosedResp.name,afterClosedResp.value);
    })
  });

  describe("#openSearchDialog()",()=>{
    it("should open the dialog and should not call getVehicleList if the result from the dialog is undefined",()=>{
      afterClosedResp = undefined;
      component.search = ""

      spyOn(component,"getVehicleList");

      component.openSearchDialog();

      expect(component.getVehicleList).not.toHaveBeenCalled();
      expect(component.search).toEqual("");
    })

    it("should open the dialog, set search, clear filters and should call getVehicleList if the result from the dialog is an object",()=>{
      component.search = ""

      component.filters = [{
        property:"makeName", 
        value:"toyo", 
        displayValue:null
      },
      {
        property:"vin", 
        value:"5345", 
        displayValue:null
      }];

      afterClosedResp = {name:"searchValue",value:"Test 1"};

      spyOn(component,"getVehicleList");

      component.openSearchDialog();

      expect(component.filters.length).toEqual(0)
      expect(component.search).toEqual("Test 1")
      expect(component.getVehicleList).toHaveBeenCalled();
    })
  })

  describe("#openSelectDialog",()=>{
    it("should open the dialog and should not call apply filters if the result from the dialog is undefined",()=>{
      afterClosedResp = undefined;

      spyOn(component,"applyFilter");

      component.openSelectDialog("test","Test Filter",[{title:"test1",value:"Test 1"},{title:"test2",value:"Test 2"}]);

      expect(component.applyFilter).not.toHaveBeenCalled();
    })

    it("should open the dialog and should call apply filters if the result from the dialog is an object",()=>{
      let stages = [{title:"Test 1",value:"Test 1"},{title:"Test 2",value:"Test 2"}];
      afterClosedResp = {name:"stage",value:"Test 1", options: stages};

      spyOn(component,"applyFilter");

      component.openSelectDialog("stage","Stage Filter",stages);

      expect(component.applyFilter).toHaveBeenCalledWith(afterClosedResp.name,afterClosedResp.value,"Test 1");
    })
  });

  describe("#openRangeSelectDialog()",()=>{
    it("should open the dialog and should not call apply filters if the result from the dialog is undefined",()=>{
      afterClosedResp = undefined;

      spyOn(component,"applyFilter");

      component.openRangeSelectDialog("test","Test Filter",[{title:"test1",value:"Test 1"},{title:"test2",value:"Test 2"}]);

      expect(component.applyFilter).not.toHaveBeenCalled();
    })

    it("should open the dialog and should call apply filters if the result from the dialog is an object",()=>{
      let stages = [{title:"2002",value:"2002"},{title:"2020",value:"2020"}];
      afterClosedResp = {name:"stage",value:{min:2002,max:2020}};

      spyOn(component,"applyFilter");

      component.openRangeSelectDialog("stage","Stage Filter",stages);

      expect(component.applyFilter).toHaveBeenCalledWith(afterClosedResp.name,afterClosedResp.value);
    })
  });

  describe("#applyFilter",()=>{
    it("should add a filterObj to the filter array, clear search and call #getVehicleList()",()=>{
      spyOn(component,"getVehicleList");
      component.search = "Test";
      let filter: FilterObj = {
        property:"makeName", 
        value:"chrys", 
        displayValue:null
      };
      
      component.applyFilter("makeName","chrys");

      expect(component.filters).toContain(filter,"filter is not in array");
      expect(component.search).toEqual("");
      expect(component.getVehicleList).toHaveBeenCalled();

    });

    it("should update a filterObj to the filter array and call #getVehicleList()",()=>{
      spyOn(component,"getVehicleList");
      let filter: FilterObj = {
        property:"makeName", 
        value:"Merc", 
        displayValue:null
      };
      
      component.applyFilter("makeName","Merc");

      expect(component.filters).toContain(filter,"old filter is not in array");
      expect(component.getVehicleList).toHaveBeenCalled();

      let filter1: FilterObj = {
        property:"makeName", 
        value:"chrys", 
        displayValue:null
      };

      component.applyFilter("makeName","chrys");

      expect(component.filters).toContain(filter1,"new filter is not in array");

      expect(component.filters).not.toContain(filter,"old filter is in array");
      expect(component.getVehicleList).toHaveBeenCalled();

    });

    it("should not apply filter with empty value and must not call #getVehicleList()",()=>{
      spyOn(component,"getVehicleList");
      let filter1: FilterObj = {
        property:"makeName", 
        value:"", 
        displayValue:null
      };

      component.applyFilter("makeName","");

      expect(component.filters).not.toContain(filter1,"new filter is not in array");
      expect(component.getVehicleList).not.toHaveBeenCalled();
    });
  });

  describe("#removeFilter",()=>{
    it("should remove a filter by its index",()=>{
      component.filters = [{
        property:"makeName", 
        value:"toyo", 
        displayValue:null
      },
      {
        property:"vin", 
        value:"5345", 
        displayValue:null
      }];

      expect(component.filters).toContain({
        property:"makeName", 
        value:"toyo", 
        displayValue:null
      });

      component.removeFilter(0);

      expect(component.filters).not.toContain({
        property:"makeName", 
        value:"toyo", 
        displayValue:null
      });

      expect(component.filters.length).toEqual(1);
    });
  });

  describe("#clearFilters()",()=>{
    it("should remove all filters",()=>{
      component.filters = [{
        property:"makeName", 
        value:"toyo", 
        displayValue:null
      },
      {
        property:"vin", 
        value:"5345", 
        displayValue:null
      }];

      component.clearFilters()

      expect(component.filters.length).toEqual(0);
    });
  });

  describe("#clearSearch()",()=>{
    it("should clear search data",()=>{
      component.search = "Test Vehicle";

      component.clearSearch()

      expect(component.search).toEqual('');
    });
  });

  describe("#getPropetyIndex",()=>{
    it("should return index position in filter array when given property name",()=>{
      component.filters = [{
        property:"makeName", 
        value:"toyo", 
        displayValue:null
      },{
        property:"vin", 
        value:"5345", 
        displayValue:null
      }];

      const index  = component.getPropetyIndex("vin");

      expect(index).toEqual(1);
    });
    
    it("should return -1 when property name is not found",()=>{
      component.filters = [{
        property:"makeName", 
        value:"toyo", 
        displayValue:null
      },{
        property:"vin", 
        value:"5345", 
        displayValue:null
      }];

      const index  = component.getPropetyIndex("stockNumber");

      expect(index).toEqual(-1);
    });
  });

  describe("#getMyVehicleList",()=>{
    it('should load vehicle inventory list', () => {
      spyOn(inventoryService, 'getVehicleInventoryList')
      .and.returnValue(of(vechicleListPaged));
  
      component.getVehicleList();
  
      expect(inventoryService.getVehicleInventoryList).toHaveBeenCalled();
      expect(component.vehicleList).toEqual(vechicleListPaged);
      expect(component.page).toEqual(vechicleListPaged.currentPage);
      expect(component.totalElements).toEqual(vechicleListPaged.totalItems);
      expect(component.isLoading).toEqual(false);
    });

    
    it('should include any provided filters and page data when requesting customer list', () => {
      component.page = 3;
      component.pageSize = 10;
      component.filters = [{
        property:"makeName", 
        value:"toyo", 
        displayValue:null
      },
      {
        property:"vin", 
        value:"5343", 
        displayValue:null
      }];

      spyOn(inventoryService, 'getVehicleInventoryList')
      .and.returnValue(of(vechicleListPaged));
  
      component.getVehicleList();
  
      expect(inventoryService.getVehicleInventoryList).toHaveBeenCalledWith({ page: 3, size: 10, makeName:"toyo", vin: "5343"});
      expect(component.vehicleList).toEqual(vechicleListPaged);
      expect(component.page).toEqual(vechicleListPaged.currentPage);
      expect(component.totalElements).toEqual(vechicleListPaged.totalItems);
      expect(component.isLoading).toEqual(false);
    });
    it('should include lower and upper value when value is object in the filter object when requesting customer list', () => {
      component.page = 3;
      component.pageSize = 10;
      component.filters = [{
        property:"year", 
        value: { min:2002, max:2021 }, 
        displayValue:null
      },];

      spyOn(inventoryService, 'getVehicleInventoryList')
      .and.returnValue(of(vechicleListPaged));
  
      component.getVehicleList();
  
      expect(inventoryService.getVehicleInventoryList).toHaveBeenCalledWith({ page: 3, size: 10, year1:2002,year2:2021});
      expect(component.vehicleList).toEqual(vechicleListPaged);
      expect(component.page).toEqual(vechicleListPaged.currentPage);
      expect(component.totalElements).toEqual(vechicleListPaged.totalItems);
      expect(component.isLoading).toEqual(false);
    });

    it('should include search and page data provided when requesting customer list', () => {
      component.page = 3;
      component.pageSize = 10;
      component.search = "Test";

      spyOn(inventoryService, 'getVehicleInventoryList')
      .and.returnValue(of(vechicleListPaged));
  
      component.getVehicleList();
  
      expect(inventoryService.getVehicleInventoryList).toHaveBeenCalledWith({ page: 3, size: 10, searchValue:"Test"});
      expect(component.vehicleList).toEqual(vechicleListPaged);
      expect(component.page).toEqual(vechicleListPaged.currentPage);
      expect(component.totalElements).toEqual(vechicleListPaged.totalItems);
      expect(component.isLoading).toEqual(false);
    });

    it('should show notifcation when customer list fails to load', () => {
      spyOn(inventoryService, 'getVehicleInventoryList')
      .and.returnValue(throwError({
        message: `Error Code: 500. Message: Internal Server Error`,
      }));

      spyOn(matSnackBar,"open");
  
      component.getVehicleList();
  
      expect(inventoryService.getVehicleInventoryList).toHaveBeenCalled();
      expect(matSnackBar.open).toHaveBeenCalledWith(`Failed to load vehicle list.`, 'Dismiss', {
        duration: environment.snackBarTimeout,
      });
      // expect(component.isLoadingCustomer).toEqual(false);

    });
  });

  describe("#displayValue()",()=>{
    it("should display a value as is, if it is not an object",()=>{
      let result = component.displayValue("Toyota")

      expect(result).toEqual("Toyota");
    });

    it("should display a value as range, if it is an object",()=>{
      let result = component.displayValue({min:0,max:100})

      expect(result).toEqual("0 - 100");
    });
  })

  describe("#range()",()=>{
    it("should generate an object array of numbers between 2 numbers",()=>{
      let result = component.range(2020,2017,-1);

      let expectedList = [
        {title:2020,value:2020},
        {title:2019,value:2019},
        {title:2018,value:2018},
      ]

      expect(result).toEqual(expectedList);
    })

  })
});
