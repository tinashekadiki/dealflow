import { TestBed } from '@angular/core/testing';
import { CreditReportService } from './credit-report.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { default as SampleCreditReportJSON } from '../../../testing/json/credit_report_response.json' 
import { CreditReport } from '../../models/credit-report/credit_report';

describe('CreditReportService', () => {
  let service: CreditReportService;
  let httpTestingController:HttpTestingController;
  let sampleCreditReportObj:CreditReport = SampleCreditReportJSON;
  let borrower = {
    inquirytype: "test",
    inquiryrequest: "test",
    equifax: "test",
    experian: "test",
    transunion: "test",
    globalcustomerid: "test",
    customercell: "test",
    coborrowerglobalcustomerid: "test",
    coborrowercustomercell: "test",
}

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ CreditReportService ],
      imports:[ HttpClientTestingModule ],
    });
    service = TestBed.inject(CreditReportService);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe("#getExistingReport",()=>{
    it('makes expected HTTP POST calls to the credit report service to return credit report', () => {

      service.getExistingReport("test").subscribe(res => {
        expect(res).toEqual(sampleCreditReportObj);
      });


      const req = httpTestingController.expectOne(environment.retrieveExistingCreditReport);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual({
        "globalCustomerId": "test",
        "creditReportType": "",
        "creditRequestType": "",
        "equifaxIndicator": "",
        "experianIndicator": "",
        "transUnionIndicator": ""
      });
      req.flush(SampleCreditReportJSON);
      httpTestingController.verify();
    });
  });

  describe("#requestCreditInformation",()=>{
    it('makes expected HTTP POST calls to the credit report service to request credit', () => {

      service.requestCreditInformation(borrower).subscribe(res => {
        expect(res).toEqual({message:"ok"});
      });


      const req = httpTestingController.expectOne(environment.sendDigitalApplicationRequestUrl);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual({
        "request": {
          "borrowers":borrower
        }
      });
      
      req.flush({message:"ok"});
      httpTestingController.verify();
    });
  })

  describe("#sendDigitalApp",()=>{
    it('makes expected HTTP POST calls to the credit report service to request credit', () => {

      service.sendDigitalApp(borrower).subscribe(res => {
        expect(res).toEqual("{'message':'ok'}");
      });


      const req = httpTestingController.expectOne(environment.sendDigitalApplicationRequestUrl);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual({
        "request": {
          "borrowers":borrower
        }
      });

      req.flush("{'message':'ok'}");
      httpTestingController.verify();
    });
  })

});
