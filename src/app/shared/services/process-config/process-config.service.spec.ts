import { inject, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { ProcessConfigService } from './process-config.service';
import { environment } from 'src/environments/environment';

describe('ProcessConfigService', () => {
  let service: ProcessConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcessConfigService]
    });
    service = TestBed.inject(ProcessConfigService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it(`baseUrl has default value`, () => {
    expect(service.baseUrl).toEqual(environment.configurationsUrl);
  });

  it(`updateUrl has default value`, () => {
    expect(service.updateUrl).toEqual(environment.updateProcessUrl);
  });

  it('should update next and previous processes', () => {
    expect(service.updatePrevAndNextProcesses([])).toEqual([])
  });


  it('should should switch process', () => {
    let idScan = {
      automatic: true,
      failvalue: '',
      responseTopic: 'cust-profile-response-avro',
      passvalue: 'pass',
      requestTopic: 'AvroCreate',
      previousStep: null,
      processname: 'ID Scan',
      action: 'Back - 2D Bar Code',
      trigger: 'User Initiated',
      evaluateResponse: 'false',
      nextStep: 'ID Ver',
      actionIfFailed: '',
      processId: 21
    };
    let idVer = {
      automatic: true,
      failvalue: '',
      responseTopic: 'cust-profile-response-avro',
      requestTopic: 'AvroCreate',
      passvalue: 'pass',
      previousStep: null,
      processname: 'ID Ver',
      action: 'Identity Red Flag Check',
      trigger: 'Automated',
      evaluateResponse: true,
      nextStep: 'Leave Blank',
      actionIfFailed: 'Resolution Workflow',
      processId: 3
    };
    let SynthFraud ={
      automatic: true,
      failvalue: '',
      responseTopic: 'cust-profile-response-avro',
      requestTopic: 'AvroCreate',
      passvalue: 'pass',
      previousStep: null,
      processname: 'Synth. Fraud',
      actions: 'Conduct a Synthetic Fraud Check',
      trigger: 'Automated',
      evaluateResponse: true,
      nextSteps: 'Test Drive',
      actionIfFailed: 'Resolution Workflow',
      processId: 19
    };;
    let TradeVehicle ={
      automatic: true,
      failvalue: '',
      responseTopic: 'cust-profile-response-avro',
      passvalue: 'pass',
      requestTopic: 'AvroCreate',
      previousStep: null,
      processname: 'Trade Vehicle',
      action: 'Capture Trade Vehicle Details',
      trigger: 'Automated',
      evaluateResponse: 'false',
      nextStep: 'Purchase Vehicle',
      actionIfFailed: '',
      processId: 5
    };
    let AppraisalRequest = {
      automatic: true,
      failvalue: '',
      responseTopic: 'cust-profile-response-avro',
      passvalue: 'pass',
      requestTopic: 'AvroCreate',
      previousStep: null,
      processname: 'Appraisal Request',
      action: 'Send Trade Details to Appraiser',
      trigger: 'Automated',
      evaluateResponse: 'true',
      nextStep: 'Purchase Vehicle',
      actionIfFailed: '',
      processId: 22
    }
    ;
    let PurchaseVehicle ={
      automatic: true,
      failvalue: '',
      responseTopic: 'cust-profile-response-avro',
      passvalue: 'pass',
      requestTopic: 'AvroCreate',
      previousStep: null,
      processname: 'Purchase Vehicle',
      action: 'Determine Vehicle of Interest',
      trigger: 'Automated',
      evaluateResponse: 'false',
      nextStep: 'Test Drive',
      actionIfFailed: '',
      processId: 4
    };
    let TestDrive = {
      automatic: false,
      failvalue: '',
      responseTopic: 'cust-profile-response-avro',
      passvalue: 'pass',
      requestTopic: 'AvroCreate',
      previousStep: null,
      processname: 'Test Drive',
      action: 'Record Test Drive Activity',
      trigger: 'User Initiated',
      evaluateResponse: 'true',
      nextStep: 'Test Drive',
      actionIfFailed: '',
      processId: 6
    };
    let Prequalification = {
      automatic: false,
      failvalue: '',
      responseTopic: 'cust-profile-response-avro',
      passvalue: 'pass',
      requestTopic: 'AvroCreate',
      previousStep: null,
      processname: 'Prequalification',
      action: 'Determine Customers Credit Score',
      trigger: 'User Initiated',
      evaluateResponse: 'false',
      nextStep: 'Financial Profile Analysis',
      actionIfFailed: '',
      processId: 1
    };
    let DealDesking = {
      automatic: false,
      failvalue: '',
      responseTopic: 'cust-profile-response-avro',
      passvalue: 'pass',
      requestTopic: 'AvroCreate',
      previousStep: null,
      processname: 'Deal Desking',
      action: 'Determine Payment Options',
      trigger: 'User Initiated',
      evaluateResponse: 'false',
      nextStep: '',
      actionIfFailed: '',
      processId: 9
    };
    let DigitalApplication = {
      automatic: false,
      failvalue: '',
      responseTopic: 'cust-profile-response-avro',
      passvalue: 'pass',
      requestTopic: 'AvroCreate',
      previousStep: null,
      processname: 'Digital Application',
      action: 'Customer Completes online Application ',
      trigger: 'User Initiated',
      evaluateResponse: 'true',
      nextStep: 'Finance Update - RouteOne',
      actionIfFailed: '',
      processId: 7
    };
    let ComplianceOFAC =  {
      automatic: true,
      failvalue: '',
      responseTopic: 'cust-profile-response-avro',
      passvalue: 'pass',
      requestTopic: 'AvroCreate',
      previousStep: null,
      processname: 'Compliance OFAC',
      action: 'Complete an OFAC Compliance Check',
      trigger: 'Automated',
      evaluateResponse: 'false',
      nextStep: '',
      actionIfFailed: '',
      processId: 23
    };
    let ComplianceCSD = {
      automatic: true,
      failvalue: '',
      responseTopic: 'cust-profile-response-avro',
      passvalue: 'pass',
      requestTopic: 'AvroCreate',
      previousStep: null,
      processname: 'Compliance CSD',
      action: 'Send the Customer a Credit Score Disclosure',
      trigger: 'Automated',
      evaluateResponse: 'false',
      nextStep: '',
      actionIfFailed: '',
      processId: 24
    };
    let ComplianceMLA = {
      automatic: true,
      failvalue: '',
      responseTopic: 'cust-profile-response-avro',
      passvalue: 'pass',
      requestTopic: 'AvroCreate',
      previousStep: null,
      processname: 'Compliance MLA',
      action: 'Compliance MLA',
      trigger: 'Automated',
      evaluateResponse: 'false',
      nextStep: '',
      actionIfFailed: '',
      processId: 25
    };
    let HardInquiry ={
      automatic: true,
      failvalue: '',
      responseTopic: 'cust-profile-response-avro',
      passvalue: 'pass',
      requestTopic: 'AvroCreate',
      previousStep: null,
      processname: 'Hard Inquiry',
      action: 'Request Copy of Customers Credit Report',
      trigger: 'Automated',
      evaluateResponse: 'false',
      nextStep: 'Financial Profile Analysis',
      actionIfFailed: 'Adverse Action',
      processId: 10
    };
    let FinancialProfileAnalysis = {
      automatic: true,
      failvalue: '',
      responseTopic: 'cust-profile-response-avro',
      passvalue: 'pass',
      requestTopic: 'AvroCreate',
      previousStep: null,
      processname: 'Financial Profile Analysis',
      action: 'Conduct a Liability Analysis on Customer Profile',
      trigger: 'Automated',
      evaluateResponse: 'false',
      nextStep: 'Transmit App to F&I Partner',
      actionIfFailed: '',
      processId: 26
    };
    let FinanceUpdate =  {
      automatic: true,
      failvalue: '',
      responseTopic: 'cust-profile-response-avro',
      passvalue: 'pass',
      requestTopic: 'AvroCreate',
      previousStep: null,
      processname: 'Finance Update',
      action: 'Aggregate and Send Customer Detail',
      trigger: 'Automated',
      evaluateResponse: 'false',
      nextStep: 'Transmit App to F&I Partner',
      actionIfFailed: '',
      processId: 27
    };

    let DMSUpdateCustomer = {
      automatic: true,
      failvalue: '',
      responseTopic: 'cust-profile-response-avro',
      passvalue: 'pass',
      requestTopic: 'AvroCreate',
      previousStep: null,
      processname: 'DMS Update- Customer',
      action: 'Aggregate and Send Customer Data to the DMS',
      trigger: 'Automated',
      evaluateResponse: 'false',
      nextStep: '',
      actionIfFailed: '',
      processId: 18
    };
    let DMSUpdateDeal = {
      automatic: true,
      failvalue: '',
      responseTopic: 'cust-profile-response-avro',
      passvalue: 'pass',
      requestTopic: 'AvroCreate',
      previousStep: null,
      processname: 'DMS Update- Deal',
      action: 'Aggregate and Send Customer Data to the DMS',
      trigger: 'Automated',
      evaluateResponse: 'false',
      nextStep: '',
      actionIfFailed: '',
      processId: 29
    };

    let CRMUpdate = {
      automatic: true,
      failvalue: '',
      responseTopic: 'cust-profile-response-avro',
      passvalue: 'pass',
      requestTopic: 'AvroCreate',
      previousStep: null,
      processname: 'CRM Update',
      action: 'Aggregate and Send Customer Data to the CRM',
      trigger: 'Automated',
      evaluateResponse: 'true',
      nextStep: '',
      actionIfFailed: '',
      processId: 17
    };


    expect(service.switchProcesses('ID Scan')).toEqual(idScan);
    expect(service.switchProcesses('ID Ver')).toEqual(idVer);
    expect(service.switchProcesses('Synth. Fraud')).toEqual(SynthFraud);
    expect(service.switchProcesses('Trade Vehicle')).toEqual(TradeVehicle);
    expect(service.switchProcesses('Appraisal Request')).toEqual(AppraisalRequest);
    expect(service.switchProcesses('Purchase Vehicle')).toEqual(PurchaseVehicle);
    expect(service.switchProcesses('Test Drive')).toEqual(TestDrive);
    expect(service.switchProcesses('Prequalification')).toEqual(Prequalification);
    expect(service.switchProcesses('Deal Desking')).toEqual(DealDesking);
    expect(service.switchProcesses('Digital Application')).toEqual(DigitalApplication);
    expect(service.switchProcesses('Compliance OFAC')).toEqual(ComplianceOFAC);
    expect(service.switchProcesses('Compliance CSD')).toEqual(ComplianceCSD);
    expect(service.switchProcesses('Compliance MLA')).toEqual(ComplianceMLA);
    expect(service.switchProcesses('Hard Inquiry')).toEqual(HardInquiry);
    expect(service.switchProcesses('Financial Profile Analysis')).toEqual(FinancialProfileAnalysis);
    expect(service.switchProcesses('Finance Update')).toEqual(FinanceUpdate);
    expect(service.switchProcesses('DMS Update- Customer')).toEqual(DMSUpdateCustomer);
    expect(service.switchProcesses('DMS Update- Deal')).toEqual(DMSUpdateDeal);
    expect(service.switchProcesses('CRM Update')).toEqual(CRMUpdate);
  });

  it('should make a get request', inject( [ProcessConfigService], ( processService ) => {
    processService.getRequest().subscribe(result => expect(result.length).toBeGreaterThan(0));
  }));


  it('should make a post request', inject( [ProcessConfigService], ( processService ) => {
    processService.postRequest('234924', { process: 1, processId: 3 }).subscribe(result => expect(result.length).toBeGreaterThan(0));
  }));

  it('should update process', inject( [ProcessConfigService], ( processService ) => {
    processService.updateProcess({ process: 1, processId: 3 }).subscribe(result =>
      expect(result.length).toBeGreaterThan(0)
    );
  }));
});
