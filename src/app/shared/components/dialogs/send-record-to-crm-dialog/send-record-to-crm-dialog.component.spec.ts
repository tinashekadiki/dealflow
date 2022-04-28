// /* tslint:disable:no-unused-variable */
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { SendRecordToCrmDialogComponent } from './send-record-to-crm-dialog.component';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { of, throwError } from 'rxjs';
// import { CdkServiceService } from 'src/app/shared/services/cdk/cdk-service.service';
//
// describe('SendRecordToCrmComponent', () => {
//   let component: SendRecordToCrmDialogComponent;
//   let fixture: ComponentFixture<SendRecordToCrmDialogComponent>;
//   let matSnackBar: MatSnackBar;
//   let aggregatorService: CdkServiceService;
//   let matDialogRef: MatDialogRef<SendRecordToCrmDialogComponent>
//
//   beforeEach(async () => {
//     TestBed.configureTestingModule({
//       declarations: [ SendRecordToCrmDialogComponent ],
//       providers: [
//         {provide: MatDialogRef, useFactory: () => jasmine.createSpyObj('MatDialogRef', ['close', 'afterClosed'])},
//         {provide: MatSnackBar,useValue:{open:(message,action,config)=>{}}},
//         {provide: CdkServiceService, useValue:{sendToAggregator:(data)=>of({message:"ok"})}},
//         {provide: MAT_DIALOG_DATA, useValue:{customerGlobalId:"test", eventCode:"2020123"}}
//       ]
//     })
//     .compileComponents();
//   });
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(SendRecordToCrmDialogComponent);
//     matSnackBar = TestBed.inject(MatSnackBar);
//     matDialogRef = TestBed.inject(MatDialogRef);
//     aggregatorService = TestBed.inject(CdkServiceService);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
//
//   describe("#ngOnInit",()=>{
//     it("should set properties",()=>{
//       component.eventcode = undefined;
//       component.customer = undefined;
//
//       component.ngOnInit();
//
//       expect(component.eventcode).toEqual("2020123")
//       expect(component.customer).toEqual("test")
//     });
//   });
//
//   describe("#onNoClick()",()=>{
//     it("should call #dialogRef.close()",()=>{
//
//       component.onNoClick();
//
//       expect(matDialogRef.close).toHaveBeenCalled();
//     })
//   })
//
//   describe("#submitRequest()",()=>{
//     it("should call #sendToAggregator() and if successful should open snackBar and then close dialog",()=>{
//       spyOn(aggregatorService,"sendToAggregator").and.returnValue(of({message:"ok"}))
//       spyOn(matSnackBar,"open");
//
//       component.submitRequest()
//
//       expect(aggregatorService.sendToAggregator).toHaveBeenCalledWith({eventcode:"2020123",
//       globalcustomerid:"test",serviceId:"12"});
//       expect(matSnackBar.open).toHaveBeenCalledWith('Request to submit customer data to CRM has been sent successfully', 'Dismiss', {
//         duration: 5000
//       })
//       expect(matDialogRef.close).toHaveBeenCalledWith({ success: true })
//       expect(component.isLoading).toBeFalse();
//     })
//
//     it("should call #sendToAggregator() and if unsuccessful should open snackBar and then close dialog",()=>{
//       spyOn(aggregatorService,"sendToAggregator").and.returnValue(throwError("error"))
//       spyOn(matSnackBar,"open");
//
//       component.submitRequest()
//
//       expect(aggregatorService.sendToAggregator).toHaveBeenCalledWith({eventcode:"2020123",
//       globalcustomerid:"test",serviceId:"12"});
//       expect(component.isLoading).toBeFalse();
//       expect(matSnackBar.open).toHaveBeenCalledWith('Unable to reach the server. Please try again.', 'Dismiss', {
//         duration: 5000
//       })
//       expect(matDialogRef.close).not.toHaveBeenCalledWith({ success: true })
//     })
//   })
//
//
// });
