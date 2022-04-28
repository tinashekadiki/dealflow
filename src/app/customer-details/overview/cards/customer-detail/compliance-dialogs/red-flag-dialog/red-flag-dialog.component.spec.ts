import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RedFlagDialogComponent } from './red-flag-dialog.component';

describe('RedFlagDialogComponent', () => {
  let component: RedFlagDialogComponent;
  let fixture: ComponentFixture<RedFlagDialogComponent>;
  let matDialogRef: MatDialogRef<RedFlagDialogComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  let complianceListObj = {
    processes: [
      {
        id: 1,
        description: "Identity Verified",
        globalCustomerId: "test",
        timeCreated: "2020-03-03 18:00:00",
        timeZone: "UTC+6",
        parentid: "234",
        process: "RedFlag",
        service: true,
        result: true,
        branchId: "234024",
        page: "RFG07"
      },
      {
        id: 2,
        description: "Identity Verified",
        globalCustomerId: "test",
        timeCreated: "2020-03-04 18:00:00",
        timeZone: "UTC+6",
        parentid: "234",
        process: "RedFlag",
        service: true,
        result: true,
        branchId: "234024",
        page: "RFG07"
      }
    ]
  }

  let complianceHistoryDetail = {
    branchId: "test",
    firstname: "test",
    address: "test",
    profileStatus: "test",
    history: complianceListObj.processes,
    pageId: "RedFlag",
    transactionDate: "test",
    globalCustomerId: "test",
    transactionId: "test",
    parentId: "test",
    lastname: "test",
    historyDate: "test",
    licenseExpiryDate: "test",
    subTitle: "test",
    cellnumber: "test",
    titleHeader: "test",
    dob: "test",
    actionMessage: "test",
    historyTime: "test",
    email: "test",
  }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RedFlagDialogComponent],
      imports:[NoopAnimationsModule,MatButtonToggleModule],
      providers: [{ provide: MatDialogRef, useValue: mockDialogRef },
      { provide: MAT_DIALOG_DATA, useValue: { title: "Red Flag", procDetail: complianceHistoryDetail, procName: "RedFlag" } }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedFlagDialogComponent);
    matDialogRef = TestBed.inject(MatDialogRef);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe("#onNoClick()",()=>{
    it("should call #dialogRef.close()",()=>{

      component.onNoClick();

      expect(matDialogRef.close).toHaveBeenCalled();
    })
  })

  it('should initialise managers', () => {
    expect(component.managers.length).toBeGreaterThan(0);
  });

  describe("#getComplianceStatus()",()=>{
    it('should return success object when page code for process is success', () => {
      expect(component.getComplianceStatus('RedFlag', 'RFG07')).toEqual({colorClass:"success",success:true,icon:"check_circle"})
    });

    it('should return error object when page code for process is error', () => {
      expect(component.getComplianceStatus('RedFlag', 'RFG03')).toEqual({colorClass:"danger",success:false,icon:"error"})
    });
  })

  describe("#isValidDate",()=>{
    it('should return false if date is invalid Date', () => {
      expect(component.isValidDate('11123')).toBeFalse();
    });

    it('should return true if date is valid Date', () => {
      expect(component.isValidDate(new Date("2020-01-10"))).toBeTrue();
    });
  })


  describe("#parsedDate()",()=>{
    it('should parse Date with a valid format', () => {
      expect(component.parsedDate('01/01/2020')).toBeInstanceOf(Date)
    });

    it('should parse Date with an uncommon format', () => {
      spyOn(component,"isValidDate").and.returnValue(false);

      let res = component.parsedDate('Fri Mar 19 12:23:56 UTC+6 2021');

      let expD = new Date("2021-03-19 12:23:56");

      expect(res).toBeInstanceOf(Date)
      expect(res).toEqual(expD);
    });
  })

  describe("#getComplianceStatus()", () => {
    it("should return an object with empty properties if the completed compliance processes list is undefined", () => {
      component.data.procName = "Hello";

      let result = component.complianceStatus;

      expect(result).toEqual({ colorClass: "", icon: "" ,success:false});
      component.data.procName = "RedFlag"
    });

    it("should return an object with empty properties if the process details are not available", () => {
      component.data.procDetail = null;

      let result = component.complianceStatus;

      expect(result).toEqual({ colorClass: "", icon: "" ,success:false});
    })

    it("should return an object with empty properties if the process page is not in the avaliable processes list", () => {
      component.data.procDetail={
        branchId: "test",
        firstname: "test",
        address: "test",
        profileStatus: "test",
        history: complianceListObj.processes,
        pageId: "RedFlag",
        transactionDate: "test",
        globalCustomerId: "test",
        transactionId: "test",
        parentId: "test",
        lastname: "test",
        historyDate: "test",
        licenseExpiryDate: "test",
        subTitle: "test",
        cellnumber: "test",
        titleHeader: "test",
        dob: "test",
        actionMessage: "test",
        historyTime: "test",
        email: "test",
      };

      let result = component.complianceStatus;

      expect(result).toEqual({ colorClass: "", icon: "" ,success:false});
    })

    it("should return an object with error properties if the process page relates to error in the avaliable processes list", () => {
      component.data.procDetail = {
        branchId: "test",
        firstname: "test",
        address: "test",
        profileStatus: "test",
        history: complianceListObj.processes,
        pageId: "RFG03",
        transactionDate: "test",
        globalCustomerId: "test",
        transactionId: "test",
        parentId: "test",
        lastname: "test",
        historyDate: "test",
        licenseExpiryDate: "test",
        subTitle: "test",
        cellnumber: "test",
        titleHeader: "test",
        dob: "test",
        actionMessage: "test",
        historyTime: "test",
        email: "test",
      };

      let result = component.complianceStatus;

      expect(result).toEqual({ colorClass: "danger", icon: "blocked",success:false });
    })

    it("should return an object with success properties if the process page relates to success in the avaliable processes list", () => {
      component.data.procDetail = {
        branchId: "test",
        firstname: "test",
        address: "test",
        profileStatus: "test",
        history: complianceListObj.processes,
        pageId: "RFG07",
        transactionDate: "test",
        globalCustomerId: "test",
        transactionId: "test",
        parentId: "test",
        lastname: "test",
        historyDate: "test",
        licenseExpiryDate: "test",
        subTitle: "test",
        cellnumber: "test",
        titleHeader: "test",
        dob: "test",
        actionMessage: "test",
        historyTime: "test",
        email: "test",
      };

      let result = component.complianceStatus;

      expect(result).toEqual({ colorClass: "success", icon: "check_circle",success:true });
    })
  })

  describe("historyDateGrouping",()=>{
    it("should return an object of history grouped by the day it has occured",()=>{
      component.data.procDetail = {
        branchId: "test",
        firstname: "test",
        address: "test",
        profileStatus: "test",
        history: complianceListObj.processes,
        pageId: "RedFlag",
        transactionDate: "test",
        globalCustomerId: "test",
        transactionId: "test",
        parentId: "test",
        lastname: "test",
        historyDate: "test",
        licenseExpiryDate: "test",
        subTitle: "test",
        cellnumber: "test",
        titleHeader: "test",
        dob: "test",
        actionMessage: "test",
        historyTime: "test",
        email: "test",
      }

      let result = component.historyDateGrouping

      expect(result).toEqual({
        "2020-03-03":[{
          id: 1,
          description: "Identity Verified",
          globalCustomerId: "test",
          timeCreated: "2020-03-03 18:00:00",
          timeZone: "UTC+6",
          parentid: "234",
          process: "RedFlag",
          service: true,
          result: true,
          branchId: "234024",
          page: "RFG07"
        }],
        "2020-03-04":[{
          id: 2,
          description: "Identity Verified",
          globalCustomerId: "test",
          timeCreated: "2020-03-04 18:00:00",
          timeZone: "UTC+6",
          parentid: "234",
          process: "RedFlag",
          service: true,
          result: true,
          branchId: "234024",
          page: "RFG07"
        }]
      })
    })

    it("should return an empty object when the procDetail is null",()=>{
      component.data.procDetail = null;

      let result = component.historyDateGrouping

      expect(result).toEqual({});
    })
  })

  describe("#historyDateKeys",()=>{
    it("should return list of keys from the grouped history",()=>{
      component.data.procDetail = {
        branchId: "test",
        firstname: "test",
        address: "test",
        profileStatus: "test",
        history: complianceListObj.processes,
        pageId: "RedFlag",
        transactionDate: "test",
        globalCustomerId: "test",
        transactionId: "test",
        parentId: "test",
        lastname: "test",
        historyDate: "test",
        licenseExpiryDate: "test",
        subTitle: "test",
        cellnumber: "test",
        titleHeader: "test",
        dob: "test",
        actionMessage: "test",
        historyTime: "test",
        email: "test",
      }

      let result = component.historyDateKeys;

      expect(result).toEqual(["2020-03-03","2020-03-04"])
    })
  })
});
