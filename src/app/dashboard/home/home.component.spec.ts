import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerListPaginated } from 'src/app/shared/models/customers/customer_list_paginated';
import { CustomerRecordsService } from 'src/app/shared/services/customer-records/customer-records.service';
import { HomeComponent } from './home.component';
import {default as SampleCustomerList} from '../../testing/json/customer_list.json';
import { of, throwError } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing';
import { FilterObj } from 'src/app/shared/models/filters/filter_obj';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AddPurchaseVehicleDialogComponent } from 'src/app/shared/components/dialogs/add-purchase-vehicle-dialog/add-purchase-vehicle-dialog.component';
import { AddTradeVehicleDialogComponent } from 'src/app/shared/components/dialogs/add-trade-vehicle-dialog/add-trade-vehicle-dialog.component';
import { GenerateFinanceApplicationDialogComponent } from 'src/app/customer-details/overview/cards/generate-finance-application-dialog/generate-finance-application-dialog.component';
import { SendDigitalApplicationDialogComponent } from 'src/app/shared/components/dialogs/send-digital-application-dialog/send-digital-application-dialog.component';
import { SendRecordToCrmDialogComponent } from 'src/app/shared/components/dialogs/send-record-to-crm-dialog/send-record-to-crm-dialog.component';
import { SendRecordToDmsDialogComponent } from 'src/app/shared/components/dialogs/send-record-to-dms-dialog/send-record-to-dms-dialog.component';
import { default as ProfileNoCoBorrower } from '../../testing/json/profile_no_coborrower.json';
import { CustomerProfile } from 'src/app/shared/models/customers/customer_profile';
import { environment } from 'src/environments/environment';
import { ProcessConfigService } from 'src/app/shared/services/process-config/process-config.service';
import { NgxMaskModule } from 'ngx-mask';



describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let customerRecordsService: CustomerRecordsService;
  let matSnackBar: MatSnackBar;
  let matDialog: MatDialog;
  let customerListPaginated:CustomerListPaginated = SampleCustomerList;
  let afterClosedResp = undefined
  let customerProfile:CustomerProfile = ProfileNoCoBorrower.CustomerData;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports:[NoopAnimationsModule,MatMenuModule, MatTableModule, RouterTestingModule, NgxMaskModule.forRoot()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: CustomerRecordsService, useValue: {
          getCustomers:(params)=>of(customerListPaginated),
          getArchivedCustomers:(params)=>of(customerListPaginated)
        }},
        {provide: ProcessConfigService, useValue:{loadProcesses:()=>of([]).toPromise()}},
        {provide: MatSnackBar, useValue:{open: (message, action, opt) => {}}},
        {provide: MatDialog, useValue:{open: (component, config?)=>{return {afterClosed:()=>of(afterClosedResp)}}}},
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    customerRecordsService = TestBed.inject(CustomerRecordsService);
    matSnackBar = TestBed.inject(MatSnackBar);
    matDialog = TestBed.inject(MatDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("#ngOnInit()",()=>{
    it("should call #getCustomerList()",()=>{
      spyOn(component,"getCustomerList");

      component.ngOnInit();

      expect(component.getCustomerList).toHaveBeenCalled();
    })
  })

  describe('#handlePageChange', () => {
    it('should set page and pageSize and then call #getCustomerList', () => {
      spyOn(component, 'getCustomerList');

      let eventResp = { pageIndex: 3, pageSize: 23 };

      component.handlePageChange(eventResp);

      expect(component.page).toEqual(3);
      expect(component.pageSize).toEqual(23);
      expect(component.getCustomerList).toHaveBeenCalled();
    });
  });

  describe("#openTextDialog",()=>{
    it("should open the dialog and should not call apply filters if the result from the dialog is undefined",()=>{
      afterClosedResp = undefined;

      spyOn(component,"applyFilter");

      component.openTextDialog("firstName","First Name");

      expect(component.applyFilter).not.toHaveBeenCalled();
    })

    it("should open the dialog and should call apply filters if the result from the dialog is an object",()=>{
      afterClosedResp = {name:"firstName",value:"Jo"};

      spyOn(component,"applyFilter");

      component.openTextDialog("firstName","First Name");

      expect(component.applyFilter).toHaveBeenCalledWith(afterClosedResp.name,afterClosedResp.value);
    })
  });

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

  describe("#applyFilter",()=>{
    it("should add a filterObj to the filter array and call #getCustomerList()",()=>{
      spyOn(component,"getCustomerList");
      let filter: FilterObj = {
        property:"name",
        value:"chris",
        displayValue:null
      };

      component.applyFilter("name","chris");

      expect(component.filters).toContain(filter,"filter is not in array");
      expect(component.getCustomerList).toHaveBeenCalled();

    });

    it("should update a filterObj to the filter array and call #getCustomerList()",()=>{
      spyOn(component,"getCustomerList");
      let filter: FilterObj = {
        property:"name",
        value:"joh",
        displayValue:null
      };

      component.applyFilter("name","joh");

      expect(component.filters).toContain(filter,"old filter is not in array");
      expect(component.getCustomerList).toHaveBeenCalled();

      let filter1: FilterObj = {
        property:"name",
        value:"chris",
        displayValue:null
      };

      component.applyFilter("name","chris");

      expect(component.filters).toContain(filter1,"new filter is not in array");

      expect(component.filters).not.toContain(filter,"old filter is in array");
      expect(component.getCustomerList).toHaveBeenCalled();

    });

    it("should not apply filter with empty value and must not call #getCustomerList()",()=>{
      spyOn(component,"getCustomerList");
      let filter1: FilterObj = {
        property:"name",
        value:"",
        displayValue:null
      };

      component.applyFilter("name","");

      expect(component.filters).not.toContain(filter1,"new filter is not in array");
      expect(component.getCustomerList).not.toHaveBeenCalled();
    });
  });

  describe("#removeFilter",()=>{
    it("should remove a filter by its index",()=>{
      component.filters = [{
        property:"firstName",
        value:"ta",
        displayValue:null
      },
      {
        property:"lastName",
        value:"pi",
        displayValue:null
      }];

      expect(component.filters).toContain({
        property:"firstName",
        value:"ta",
        displayValue:null
      });

      component.removeFilter(0);

      expect(component.filters).not.toContain({
        property:"firstName",
        value:"ta",
        displayValue:null
      });

      expect(component.filters.length).toEqual(1);
    });
  });

  describe("#clearFilters",()=>{
    it("should remove all filters",()=>{
      component.filters = [{
        property:"firstName",
        value:"ta",
        displayValue:null
      },
      {
        property:"lastName",
        value:"pi",
        displayValue:null
      }];

      component.clearFilters()

      expect(component.filters.length).toEqual(0);
    });
  });

  describe("#clearSearch",()=>{
    it("should clear search and reload the customer list",()=>{
      spyOn(component,"getCustomerList");
      component.search = "Test";

      component.clearSearch();

      expect(component.search).toEqual('');
      expect(component.getCustomerList).toHaveBeenCalled();
    });
  });

  describe("#clearArchiveSearch",()=>{
    it("should clear archived search and reload the archived customer list",()=>{
      spyOn(component,"getCustomerList");
      component.archivedDateRange = {startDate:'01/01/2021',endDate:'05/05/2021'};

      component.clearArchiveSearch();

      expect(component.archivedDateRange).toEqual({});
      expect(component.getCustomerList).toHaveBeenCalled();
    });
  });

  describe("#optionListCustomerBuyingStage",()=>{
    it("should map #customerBuyingProcessList to title, value array",()=>{
      component.customerBuyingProcessList = [
        {"processId":1,"name":"Prequalification","description":"Used for Prequalification"},
        {"processId":2,"name":"Prescreen","description":"Used for Prescreening clients"}
      ];

      expect(component.optionListCustomerBuyingStage).toEqual([{value: 1,title:'Prequalification'},{value: 2,title:'Prescreen'}]);
    });
  });

  describe("#getPropetyIndex",()=>{
    it("should return index position in filter array when given property name",()=>{
      component.filters = [{
        property:"firstName",
        value:"ta",
        displayValue:null
      },{
        property:"lastName",
        value:"pi",
        displayValue:null
      }];

      const index  = component.getPropetyIndex("lastName");

      expect(index).toEqual(1);
    });

    it("should return -1 when property name is not found",()=>{
      component.filters = [{
        property:"firstName",
        value:"ta",
        displayValue:null
      },{
        property:"lastName",
        value:"pi",
        displayValue:null
      }];

      const index  = component.getPropetyIndex("address");

      expect(index).toEqual(-1);
    });
  });

  describe("#getMyCustomerList",()=>{
    it('should load customer list', () => {
      spyOn(customerRecordsService, 'getCustomers')
      .and.returnValue(of(customerListPaginated));

      component.getCustomerList();

      expect(customerRecordsService.getCustomers).toHaveBeenCalled();
      expect(component.customerList).toEqual(customerListPaginated);
      expect(component.page).toEqual(customerListPaginated.currentPage);
      expect(component.totalElements).toEqual(customerListPaginated.totalItems);
      expect(component.isLoading).toEqual(false);
    });


    it('should include any provided filters and page data when requesting customer list', () => {
      component.page = 3;
      component.pageSize = 10;
      component.filters = [{
        property:"firstName",
        value:"ta",
        displayValue:null
      },
      {
        property:"lastName",
        value:"pi",
        displayValue:null
      }];

      spyOn(customerRecordsService, 'getCustomers')
      .and.returnValue(of(customerListPaginated));

      component.getCustomerList();

      expect(customerRecordsService.getCustomers).toHaveBeenCalledWith({ page: 3, size: 10, firstName:"ta", lastName: "pi"});
      expect(component.customerList).toEqual(customerListPaginated);
      expect(component.page).toEqual(customerListPaginated.currentPage);
      expect(component.totalElements).toEqual(customerListPaginated.totalItems);
      expect(component.isLoading).toEqual(false);
    });

    it('should show notifcation when customer list fails to load', () => {
      spyOn(customerRecordsService, 'getCustomers')
      .and.returnValue(throwError({
        message: `Error Code: 500. Message: Internal Server Error`,
      }));

      spyOn(matSnackBar,"open");

      component.getCustomerList();

      expect(customerRecordsService.getCustomers).toHaveBeenCalled();
      expect(matSnackBar.open).toHaveBeenCalledWith(`Failed to load customer list.`, 'Dismiss', {
        duration: environment.snackBarTimeout,
      });
      // expect(component.isLoadingCustomer).toEqual(false);

    });
  });

  describe("#getArchivedCustomerList",()=>{
    it('should load archived customer list', () => {
      spyOn(customerRecordsService, 'getArchivedCustomers')
      .and.returnValue(of(customerListPaginated));

      component.page = 0;
      component.pageSize = 10;
      component.archivedDateRange= {'startDate':'01/01/2021','endDate':'05/05/2021'}

      component.getArchivedCustomerList();

      expect(customerRecordsService.getArchivedCustomers).toHaveBeenCalledWith({page:0,size: 10, startDate:'01/01/2021', endDate:'05/05/2021'});
      expect(component.customerList).toEqual(customerListPaginated);
      expect(component.page).toEqual(customerListPaginated.currentPage);
      expect(component.totalElements).toEqual(customerListPaginated.totalItems);
      expect(component.isLoading).toEqual(false);
    });

    it('should show notifcation when customer list fails to load', () => {
      spyOn(customerRecordsService, 'getArchivedCustomers')
      .and.returnValue(throwError({
        message: `Error Code: 500. Message: Internal Server Error`,
      }));

      spyOn(matSnackBar,"open");

      component.page = 0;
      component.pageSize = 10;
      component.archivedDateRange= {'startDate':'01/01/2021','endDate':'05/05/2021'}

      component.getArchivedCustomerList();

      expect(customerRecordsService.getArchivedCustomers).toHaveBeenCalledWith({page:0,size: 10, startDate:'01/01/2021', endDate:'05/05/2021'});
      expect(matSnackBar.open).toHaveBeenCalledWith(`Failed to load archived customer results.`, 'Dismiss', {
        duration: environment.snackBarTimeout,
      });
      // expect(component.isLoadingCustomer).toEqual(false);

    });
  });

  describe("#isArchiveSearch",()=>{
    it("should return true when #archivedDateRange is not empty",()=>{
      component.archivedDateRange = {'startDate':'01/01/2021','endDate':'05/05/2021'};

      expect(component.isArchiveSearch).toBeTrue();
    });

    it("should return false when #archivedDateRange is empty",()=>{
      component.archivedDateRange = {};

      expect(component.isArchiveSearch).toBeFalse();
    });
  });

  describe("#openSearchDialog()",()=>{
    it("should open the dialog and should not call getCustomerList if the result from the dialog is undefined",()=>{
      afterClosedResp = undefined;
      component.search = ""

      spyOn(component,"getCustomerList");

      component.openSearchDialog();

      expect(component.getCustomerList).not.toHaveBeenCalled();
      expect(component.search).toEqual("");
    })

    it("should open the dialog, set search, clear filters and should call getCustomerList if the result from the dialog is an object",()=>{
      component.search = ""

      component.filters = [{
        property:"firstName",
        value:"John",
        displayValue:null
      },
      {
        property:"lastName",
        value:"Doe",
        displayValue:null
      }];

      afterClosedResp = {name:"searchValue",value:"Test 1"};

      spyOn(component,"getCustomerList");

      component.openSearchDialog();

      expect(component.filters.length).toEqual(0)
      expect(component.search).toEqual("Test 1")
      expect(component.getCustomerList).toHaveBeenCalled();
    })
  })

  describe("MenuDialogs",()=>{

    it('should run #openAddPurchaseVehicleDialog()', async () => {
      spyOn(matDialog, 'open');

      component.openAddPurchaseVehicleDialog("Test");

      expect(matDialog.open).toHaveBeenCalledWith(AddPurchaseVehicleDialogComponent, {
        width: '460px',
        data:{customerId: "Test"}
      });
    });


    it('should run #openAddTradeVehicleDialog()', async () => {

      spyOn(matDialog, 'open');
      component.customer = customerProfile;

      component.openAddTradeVehicleDialog();

      expect(matDialog.open).toHaveBeenCalledWith(AddTradeVehicleDialogComponent, {
        width: '460px',
        data: customerProfile
      });
    });


    it('should run #openSendDigitalApplicationDialog()', async () => {


      spyOn(matDialog, 'open');
      component.customer = customerProfile;

      component.openSendDigitalApplicationDialog();

      expect(matDialog.open).toHaveBeenCalledWith(SendDigitalApplicationDialogComponent, {
        width: '460px',
        data:component.customer
      });
    });

    it('should run #openGenerateFinanceApplicationDialog()', async () => {


      spyOn(matDialog, 'open');
      component.customer = customerProfile;

      component.openGenerateFinanceApplicationDialog();

      expect(matDialog.open).toHaveBeenCalledWith(GenerateFinanceApplicationDialogComponent, {
        width: '1040px',
        data:component.customer
      });
    });


    it('should run #openSendRecordToDMSDialog()', async () => {


      spyOn(matDialog, 'open');
      component.customer = customerProfile;

      component.openSendRecordToDMSDialog();

      expect(matDialog.open).toHaveBeenCalledWith(SendRecordToDmsDialogComponent, {
        width: '460px',
        data:component.customer
      });
    });


    it('should run #openSendRecordToCRMDialog()', async () => {
      spyOn(matDialog, 'open');
      component.customer = customerProfile;

      component.openSendRecordToCRMDialog("Test");

      expect(matDialog.open).toHaveBeenCalledWith(SendRecordToCrmDialogComponent, {
        width: '460px',
        data: {customerGlobalId: "Test", eventCode: component.customer.EventCode}
      });
    });
  })

});
