import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CreditReportService } from 'src/app/shared/services/credit-report/credit-report.service';
import { CreditInquiryComponent } from './credit-inquiry.component';
import { default as SampleCreditReport } from '../../../../testing/json/credit_report_response.json' 
import { CreditReport } from 'src/app/shared/models/credit-report/credit_report';
import { RequestCreditDialogComponent } from 'src/app/shared/components/dialogs/request-credit-dialog/request-credit-dialog.component';

describe('CreditInquiryComponent', () => {
  let component: CreditInquiryComponent;
  let fixture: ComponentFixture<CreditInquiryComponent>;
  let creditReportObj:CreditReport = SampleCreditReport;
  let matDialog: MatDialog;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditInquiryComponent ],
      providers:[
        {provide: ActivatedRoute, useValue: {snapshot:{params:{customerId: "test"}}}},
        {provide: CreditReportService, useValue: {getExistingReport:(customerid)=>of(creditReportObj)}},
        {provide: MatDialog, useValue: {open:(component, config?)=>of({})}}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditInquiryComponent);
    matDialog = TestBed.inject(MatDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("#ngOnInit", ()=>{
    it("should call #getExistingReport",()=>{
      //Set up
      spyOn(component,"getExistingReport")

      //act
      component.ngOnInit();

      //assertion
      expect(component.getExistingReport).toHaveBeenCalledWith("test");
    })
  });

  describe("#creditBureauExists()",()=>{
    it("should return false if credit report is undefined",()=>{
      component.creditReport = undefined;

      let result = component.creditBureauExists("Experian");

      expect(result).toBeFalse();
    });

    it("should return false if credit bureau is not in the credit report",()=>{
      component.creditReport = creditReportObj;

      let result = component.creditBureauExists("ExperianTest");

      expect(result).toBeFalse();
    });

    it("should return true if credit bureau is in the credit report",()=>{
      component.creditReport = creditReportObj;

      let result = component.creditBureauExists("Equifax");

      expect(result).toBeTrue();
    });
  })

  describe("#getCreditBureau",()=>{
    it("should return undefined if credit report is undefined",()=>{
      component.creditReport = undefined;

      let result = component.getCreditBureau("Experian");

      expect(result).toBeUndefined();
    });

    it("should return undefined if credit bureau is not in the credit report",()=>{
      component.creditReport = creditReportObj;

      let result = component.getCreditBureau("ExperianTest");

      expect(result).toBeUndefined();
    });

    it("should return object if credit bureau is not in the credit report",()=>{
      component.creditReport = creditReportObj;

      let result = component.getCreditBureau("Equifax");

      expect(result).toBeDefined();
      expect(result).toEqual(creditReportObj.creditresponse[0])
    });

  })

  describe("#updateSrc()",()=>{
    it("should not set pdf link, load or open if #getCreditBureau() is undefined",()=>{
      spyOn(component,"getCreditBureau").and.returnValue(undefined);
      component.pdfSrc = "";
      component.pdfLoading = false;
      component.isOpen = false;

      component.updateSrc("Exp");

      expect(component.pdfLoading).toBeFalse();
      expect(component.isOpen).toBeFalse();
      expect(component.pdfSrc).toEqual('');
    })

    it("should not set pdf link if #getCreditBureau() if the pdf link is the same as the already set one but set isOpen to true",()=>{
      spyOn(component,"getCreditBureau").and.returnValue(creditReportObj.creditresponse[0]);
      component.pdfSrc = creditReportObj.creditresponse[0].creditReportLink;
      component.pdfLoading = false;
      component.isOpen = false;
      component.updateSrc("Exp");

      expect(component.pdfLoading).toBeFalse();
      expect(component.isOpen).toBeTrue();
      expect(component.pdfSrc).toEqual(creditReportObj.creditresponse[0].creditReportLink);
    })

    it("should set pdf link if #getCreditBureau()",()=>{
      spyOn(component,"getCreditBureau").and.returnValue(creditReportObj.creditresponse[0]);
      component.pdfSrc = "";
      component.pdfLoading = false;
      component.isOpen = false;
      component.updateSrc("Equifax");

      expect(component.pdfLoading).toBeTrue();
      expect(component.isOpen).toBeTrue();
      expect(component.pdfSrc).toEqual(creditReportObj.creditresponse[0].creditReportLink);
    })
  });

  describe("#isDataAvailable",()=>{
    it("should return false is credit report is undefined",()=>{
      component.creditReport = undefined;

      expect(component.isDataAvailable).toBeFalse();
    })

    it("should return false is credit report has 0 credit responses",()=>{
      component.creditReport = {creditresponse:[]};

      expect(component.isDataAvailable).toBeFalse();
    })

    it("should return true is credit report has more than 0 credit responses",()=>{
      component.creditReport = creditReportObj;

      expect(component.isDataAvailable).toBeTrue();
    })
  })

  describe("#openCreditInquiryDialog()",()=>{
    it("open the dialog",()=>{
        spyOn(matDialog, 'open');
        component.customerProfile = undefined;

        component.openCreditInquiryDialog();
    
        expect(matDialog.open).toHaveBeenCalledWith(RequestCreditDialogComponent, {
          width: '460px',
          data:{customerProfile: undefined}
        });   
    })
  })


});
