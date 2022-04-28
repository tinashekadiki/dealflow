import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComplianceService } from 'src/app/shared/services/compliance/compliance.service';
import { CustomerDetailComponent } from './customer-detail.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

xdescribe('CustomerDetailComponent', () => {
  let component: CustomerDetailComponent;
  let fixture: ComponentFixture<CustomerDetailComponent>;

  beforeEach(() => {
    const matDialogStub = () => ({
      open: (redFlagDialogComponent, object) => ({})
    });
    const complianceServiceStub = () => ({
      getCustomerComplianceProcessList: arg => ({ subscribe: f => f({}) }),
      getCustomerComplianceProccessDetail: id => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CustomerDetailComponent],
      providers: [
        { provide: MatDialog, useFactory: matDialogStub },
        { provide: ComplianceService, useFactory: complianceServiceStub },
        { provide: HttpHandler },
        { provide: HttpClient }
      ]
    });
    fixture = TestBed.createComponent(CustomerDetailComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`isProfileLoading has default value`, () => {
    expect(component.isProfileLoading).toEqual(true);
  });

  it(`isLoadingCompliance has default value`, () => {
    expect(component.isLoadingCompliance).toEqual(true);
  });

  it(`mainProcesses has default value`, () => {
    expect(component.mainProcesses).toEqual([, , , , , , ]);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getComplianceProccesses').and.callThrough();
      component.ngOnInit();
      expect(component.getComplianceProcesses).toHaveBeenCalled();
    });
  });

  describe('getComplianceProccesses', () => {
    it('makes expected calls', () => {
      const complianceServiceStub: ComplianceService = fixture.debugElement.injector.get(
        ComplianceService
      );
      spyOn(
        complianceServiceStub,
        'getCustomerComplianceProcessList'
      ).and.callThrough();
      spyOn(
        complianceServiceStub,
        'getCustomerComplianceProccessDetail'
      ).and.callThrough();
      component.getComplianceProcesses();
      expect(
        complianceServiceStub.getCustomerComplianceProcessList
      ).toHaveBeenCalled();
      expect(
        complianceServiceStub.getCustomerComplianceProcessesDetail
      ).toHaveBeenCalled();
    });
  });

  describe('openAddPurchaseVehicleDialog', () => {
    it('makes expected calls', () => {
      const matDialogStub: MatDialog = fixture.debugElement.injector.get(
        MatDialog
      );
      spyOn(matDialogStub, 'open').and.callThrough();
      component.openAddPurchaseVehicleDialog();
      expect(matDialogStub.open).toHaveBeenCalled();
    });
  });

  describe('openAddTradeVehicleDialog', () => {
    it('makes expected calls', () => {
      const matDialogStub: MatDialog = fixture.debugElement.injector.get(
        MatDialog
      );
      spyOn(matDialogStub, 'open').and.callThrough();
      component.openAddTradeVehicleDialog();
      expect(matDialogStub.open).toHaveBeenCalled();
    });
  });

  describe('openSendDigitalApplicationDialog', () => {
    it('makes expected calls', () => {
      const matDialogStub: MatDialog = fixture.debugElement.injector.get(
        MatDialog
      );
      spyOn(matDialogStub, 'open').and.callThrough();
      component.openSendDigitalApplicationDialog();
      expect(matDialogStub.open).toHaveBeenCalled();
    });
  });

  describe('openGenerateFinanceApplicationDialog', () => {
    it('makes expected calls', () => {
      const matDialogStub: MatDialog = fixture.debugElement.injector.get(
        MatDialog
      );
      spyOn(matDialogStub, 'open').and.callThrough();
      component.openGenerateFinanceApplicationDialog();
      expect(matDialogStub.open).toHaveBeenCalled();
    });
  });

  describe('openSendRecordToDMSDialog', () => {
    it('makes expected calls', () => {
      const matDialogStub: MatDialog = fixture.debugElement.injector.get(
        MatDialog
      );
      spyOn(matDialogStub, 'open').and.callThrough();
      component.openSendRecordToDMSDialog();
      expect(matDialogStub.open).toHaveBeenCalled();
    });
  });

  describe('openSendRecordToCRMDialog', () => {
    it('makes expected calls', () => {
      const matDialogStub: MatDialog = fixture.debugElement.injector.get(
        MatDialog
      );
      spyOn(matDialogStub, 'open').and.callThrough();
      component.openSendRecordToCRMDialog();
      expect(matDialogStub.open).toHaveBeenCalled();
    });
  });

  describe('openSyntheticFraudDialog', () => {
    it('makes expected calls', () => {
      const matDialogStub: MatDialog = fixture.debugElement.injector.get(
        MatDialog
      );
      spyOn(matDialogStub, 'open').and.callThrough();
      // component.openSyntheticFraudDialog();
      expect(matDialogStub.open).toHaveBeenCalled();
    });
  });
});
