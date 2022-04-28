/* tslint:disable:no-unused-variable */
import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { CdkServiceService } from 'src/app/shared/services/cdk/cdk-service.service';
import { SendRecordToDmsDialogComponent } from './send-record-to-dms-dialog.component';
import { default as SampleProfile} from '../../../../testing/json/profile_coborrower.json'

describe('SendRecordToDmsDialogComponent', () => {
  let component: SendRecordToDmsDialogComponent;
  let fixture: ComponentFixture<SendRecordToDmsDialogComponent>;
  let matSnackBar: MatSnackBar;
  let aggregatorService: CdkServiceService;
  let matDialogRef: MatDialogRef<SendRecordToDmsDialogComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ SendRecordToDmsDialogComponent ],
      providers: [
        {provide: MatDialogRef, useFactory: () => jasmine.createSpyObj('MatDialogRef', ['close', 'afterClosed'])},
        {provide: MatSnackBar,useValue:{open:(message,action,config)=>{}}},
        {provide: CdkServiceService, useValue:{sendToAggregator:(data)=>of({message:"ok"})}},
        {provide: MAT_DIALOG_DATA, useValue:SampleProfile.CustomerData}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendRecordToDmsDialogComponent);
    matSnackBar = TestBed.inject(MatSnackBar);
    matDialogRef = TestBed.inject(MatDialogRef);
    aggregatorService = TestBed.inject(CdkServiceService);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("#ngOnInit",()=>{
    it("should set properties",()=>{
      component.customer = undefined;

      component.ngOnInit();

      expect(component.customer).toEqual(SampleProfile.CustomerData)
    });
  });

  describe("#onNoClick()",()=>{
    it("should call #dialogRef.close()",()=>{

      component.onNoClick();

      expect(matDialogRef.close).toHaveBeenCalled();
    })
  })

  describe("#submitRequest()",()=>{
    it("should call #sendToAggregator() and if successful should open snackBar and then close dialog",()=>{
      spyOn(aggregatorService,"sendToAggregator").and.returnValue(of({message:"ok"}))
      spyOn(matSnackBar,"open");

      component.submitRequest()

      expect(aggregatorService.sendToAggregator).toHaveBeenCalledWith({eventcode:SampleProfile.CustomerData.EventCode,
      globalcustomerid:SampleProfile.CustomerData.CustomerPersonalDetails.customerGlobalId,serviceId:"2"});
      expect(matSnackBar.open).toHaveBeenCalledWith('Request to submit customer data to DMS has been sent successfully', 'Dismiss', {
        duration: 5000
      })
      expect(matDialogRef.close).toHaveBeenCalledWith({ success: true })
      expect(component.submitting).toBeFalse();
    })

    it("should call #sendToAggregator() and if unsuccessful should open snackBar and then close dialog",()=>{
      spyOn(aggregatorService,"sendToAggregator").and.returnValue(throwError("error"))
      spyOn(matSnackBar,"open");

      component.submitRequest()

      expect(aggregatorService.sendToAggregator).toHaveBeenCalledWith({eventcode:SampleProfile.CustomerData.EventCode,
        globalcustomerid:SampleProfile.CustomerData.CustomerPersonalDetails.customerGlobalId,serviceId:"2"});
      expect(component.submitting).toBeFalse();
      expect(matSnackBar.open).toHaveBeenCalledWith('Unable to reach the server. Please try again.', 'Dismiss', {
        duration: 5000
      })
      expect(matDialogRef.close).not.toHaveBeenCalledWith({ success: true })
    })
  })

});
