// /* tslint:disable:no-unused-variable */
// import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
// import { MatDialog } from '@angular/material/dialog';
// import { MatMenuModule } from '@angular/material/menu';
// import { of, throwError } from 'rxjs';
// import { ComplianceService } from 'src/app/shared/services/compliance/compliance.service';
// import { CustomerDetailComponent } from './customer-detail.component';
// import { default as ProfileNoCoBorrower } from '../../../../testing/json/profile_no_coborrower.json';
// import { CustomerProfile } from 'src/app/shared/models/customers/customer_profile';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// import { RedFlagDialogComponent } from './compliance-dialogs/red-flag-dialog/red-flag-dialog.component';
// tslint:disable-next-line:max-line-length
// import { AddPurchaseVehicleDialogComponent } from 'src/app/shared/components/dialogs/add-purchase-vehicle-dialog/add-purchase-vehicle-dialog.component';
// tslint:disable-next-line:max-line-length
// import { AddTradeVehicleDialogComponent } from 'src/app/shared/components/dialogs/add-trade-vehicle-dialog/add-trade-vehicle-dialog.component';
// tslint:disable-next-line:max-line-length
// import { SendDigitalApplicationDialogComponent } from 'src/app/shared/components/dialogs/send-digital-application-dialog/send-digital-application-dialog.component';
// tslint:disable-next-line:max-line-length
// import { GenerateFinanceApplicationDialogComponent } from 'src/app/customer-details/overview/cards/generate-finance-application-dialog/generate-finance-application-dialog.component';
// tslint:disable-next-line:max-line-length
// import { SendRecordToDmsDialogComponent } from 'src/app/shared/components/dialogs/send-record-to-dms-dialog/send-record-to-dms-dialog.component';
// tslint:disable-next-line:max-line-length
// import { SendRecordToCrmDialogComponent } from 'src/app/shared/components/dialogs/send-record-to-crm-dialog/send-record-to-crm-dialog.component';
//
// describe('CustomerDetailComponent', () => {
//   let component: CustomerDetailComponent;
//   let fixture: ComponentFixture<CustomerDetailComponent>;
//   let complianceService: ComplianceService;
//   // let matDialogMock: MatDialogMock;
//   let afterClosedResp = undefined;
//   let customerProfile: CustomerProfile = ProfileNoCoBorrower.CustomerData;
//   let matDialog: MatDialog;
//
//   let complianceListObj = {
//     processes: [
//       {
//         id: 1,
//         description: "Identity Verified",
//         globalCustomerId: "test",
//         timeCreated: "2020-03-03 18:00:00",
//         timeZone: "UTC+6",
//         parentid: "234",
//         process: "RedFlag",
//         service: true,
//         result: true,
//         branchId: "234024",
//         page: "RFG07"
//       }
//     ]
//   }
//
//   let complianceHistoryDetail = {
//     branchId: "test",
//     firstname: "test",
//     address: "test",
//     profileStatus: "test",
//     history: complianceListObj.processes,
//     pageId: "RedFlag",
//     transactionDate: "test",
//     globalCustomerId: "test",
//     transactionId: "test",
//     parentId: "test",
//     lastname: "test",
//     historyDate: "test",
//     licenseExpiryDate: "test",
//     subTitle: "test",
//     cellnumber: "test",
//     titleHeader: "test",
//     dob: "test",
//     actionMessage: "test",
//     historyTime: "test",
//     email: "test",
//   }
//
//   beforeEach(waitForAsync(() => {
//     TestBed.configureTestingModule({
//       imports: [NoopAnimationsModule, MatMenuModule],
//       declarations: [CustomerDetailComponent],
//       providers: [
//         {
//           provide: MatDialog,
//           useValue: {
//             open: (component, config?) => { return { afterClosed: () => of(afterClosedResp) } }
//           }
//         },
//         {
//           provide: ComplianceService,
//           useValue: {
//             getCustomerComplianceProcessList: (customerId) => { },
//             getCustomerComplianceProccessDetail: (processId) => { }
//           }
//         }
//       ]
//     });
//     fixture = TestBed.createComponent(CustomerDetailComponent);
//     complianceService = TestBed.inject(ComplianceService);
//     matDialog = TestBed.inject(MatDialog);
//     // matDialogMock = TestBed.inject(MatDialogMock);
//     component = fixture.componentInstance;
//   }));
//
//   it('can load instance', () => {
//     expect(component).toBeTruthy();
//   });
//
//   describe("#customerProfile", () => {
//     it("should trigger #getComplianceProccesses() upon setting it.", () => {
//       spyOn(component, "getComplianceProccesses");
//
//       component.customerProfile = customerProfile;
//
//       expect(component.customerProfile).toEqual(customerProfile)
//       expect(component.getComplianceProcesses).toHaveBeenCalled();
//
//     })
//     it("should not trigger #getComplianceProccesses() upon setting it to undefined.", () => {
//       spyOn(component, "getComplianceProccesses");
//
//       component.customerProfile = undefined;
//
//       expect(component.customerProfile).toEqual(undefined)
//       expect(component.getComplianceProcesses).not.toHaveBeenCalled();
//
//     })
//   })
//
//   describe("#isProfileLoading", () => {
//     it("should be true by default", () => {
//       expect(component.isProfileLoading).toBeTrue();
//     });
//   });
//
//   describe("#isLoadingCompliance", () => {
//     it("should be true by default", () => {
//       expect(component.isLoadingCompliance).toBeTrue();
//     });
//   });
//
//   describe("#ngOnInit()", () => {
//     it("should call #getComplianceProccesses()", () => {
//       spyOn(component, "getComplianceProccesses");
//
//       component.ngOnInit();
//
//       expect(component.getComplianceProcesses).toHaveBeenCalled();
//     });
//   });
//
//   describe("#customerPersonalDetails", () => {
//     it("should return customer personal details from profile", () => {
//       spyOn(component, "getComplianceProccesses");
//
//       component.customerProfile = customerProfile;
//
//       expect(component.customerPersonalDetails).toEqual(customerProfile.CustomerPersonalDetails);
//     })
//   });
//
//   describe("#customerContactDetails", () => {
//     it("should return customer contact details from profile", () => {
//       spyOn(component, "getComplianceProccesses");
//
//       component.customerProfile = { ...customerProfile };
//
//       expect(component.customerContactDetails).toEqual(customerProfile.CustomerContactDetails);
//     })
//   });
//
//   describe("#formattedAddress", () => {
//     it("should return formatted customer address from profile when address 2 is not present", () => {
//       spyOn(component, "getComplianceProccesses");
//
//       component.customerProfile = { ...customerProfile };
//
//       component.customerProfile.CustomerContactDetails.mailingStreetAddress1 = "65 Herring BLVD";
//       component.customerProfile.CustomerContactDetails.mailingStreetAddress2 = null;
//
//       let result = component.formattedAddress;
//
//       expect(result).toEqual("65 Herring BLVD, ")
//     })
//
//     it("should return formatted customer address from profile when address 1 is not present", () => {
//       spyOn(component, "getComplianceProccesses");
//
//       component.customerProfile = { ...customerProfile };
//
//       component.customerProfile.CustomerContactDetails.mailingStreetAddress1 = null;
//       component.customerProfile.CustomerContactDetails.mailingStreetAddress2 = "Test Apartment";
//
//       let result = component.formattedAddress;
//
//       expect(result).toEqual("Test Apartment, ")
//     })
//
//     it("should return formatted customer address from profile when addresses present", () => {
//       spyOn(component, "getComplianceProccesses");
//
//       component.customerProfile = { ...customerProfile };
//
//       component.customerProfile.CustomerContactDetails.mailingStreetAddress1 = "65 Herring BLVD";
//       component.customerProfile.CustomerContactDetails.mailingStreetAddress2 = "Test Apartment";
//
//       let result = component.formattedAddress;
//
//       expect(result).toEqual("65 Herring BLVD, Test Apartment, ")
//     })
//   });
//
//   describe("#getComplianceStatus()", () => {
//     it("should return an object with empty properties if the completed compliance processes list is undefined", () => {
//       component.customerComplianceProcessList = undefined;
//
//       let result = component.getComplianceStatus("RedFlag");
//
//       expect(result).toEqual({ colorClass: "", icon: "" });
//     });
//
//     it("should return an object with empty properties if the process is not available in the list of available processes", () => {
//       component.customerComplianceProcessList = { processes: [] };
//
//       let result = component.getComplianceStatus("RedFlagTest");
//
//       expect(result).toEqual({ colorClass: "", icon: "" });
//     })
//
// tslint:disable-next-line:max-line-length
//     it("should return pending process object if the process is in the avaliable processes list but not in the completed processes list", () => {
//       component.customerComplianceProcessList = { processes: [] };
//
//       let result = component.getComplianceStatus("RedFlag");
//
//       expect(result).toEqual({ colorClass: "neutral", icon: "hourglass_bottom" });
//     })
//
//     it("should return an object with empty properties if the process page is not in the avaliable processes list", () => {
//       component.customerComplianceProcessList = {
//         processes: [
//           {
//             id: 1,
//             description: "Identity Verified",
//             globalCustomerId: "test",
//             timeCreated: "2020-03-03 18:00:00",
//             timeZone: "UTC+6",
//             parentid: "234",
//             process: "RedFlag",
//             service: true,
//             result: true,
//             branchId: "234024",
//             page: "WRONG"
//           }
//         ]
//       };
//
//       let result = component.getComplianceStatus("RedFlag");
//
//       expect(result).toEqual({ colorClass: "", icon: "" });
//     })
//
//     it("should return an object with error properties if the process page relates to error in the avaliable processes list", () => {
//       component.customerComplianceProcessList = {
//         processes: [
//           {
//             id: 1,
//             description: "Identity Verified",
//             globalCustomerId: "test",
//             timeCreated: "2020-03-03 18:00:00",
//             timeZone: "UTC+6",
//             parentid: "234",
//             process: "RedFlag",
//             service: true,
//             result: true,
//             branchId: "234024",
//             page: "RFG03"
//           }
//         ]
//       };
//
//       let result = component.getComplianceStatus("RedFlag");
//
//       expect(result).toEqual({ colorClass: "danger", icon: "error" });
//     })
//
//     it("should return an object with success properties if the process page relates to success in the avaliable processes list", () => {
//       component.customerComplianceProcessList = {
//         processes: [
//           {
//             id: 1,
//             description: "Identity Verified",
//             globalCustomerId: "test",
//             timeCreated: "2020-03-03 18:00:00",
//             timeZone: "UTC+6",
//             parentid: "234",
//             process: "RedFlag",
//             service: true,
//             result: true,
//             branchId: "234024",
//             page: "RFG07"
//           }
//         ]
//       };
//
//       let result = component.getComplianceStatus("RedFlag");
//
//       expect(result).toEqual({ colorClass: "success", icon: "check_circle" });
//     })
//   })
//
//   describe("#getComplianceProccesses()", () => {
//     it("should not run #getCustomerComplianceProcessList() if the customer profile is empty", () => {
//       spyOn(complianceService, "getCustomerComplianceProcessList")
//       component._customerProfile = undefined;
//
//       component.getComplianceProcesses();
//
//       expect(complianceService.getCustomerComplianceProcessList).not.toHaveBeenCalled();
//     })
//
//     it("should run #getCustomerComplianceProcessList() if the customer profile is not empty", () => {
//       spyOn(complianceService, "getCustomerComplianceProcessList").and.returnValue(of(complianceListObj))
//       spyOn(complianceService, "getCustomerComplianceProccessDetail").and.returnValue(of(complianceHistoryDetail))
//       component._customerProfile = customerProfile;
//
//       component.getComplianceProcesses();
//
// tslint:disable-next-line:max-line-length
//       expect(complianceService.getCustomerComplianceProcessList).toHaveBeenCalledWith(customerProfile.CustomerPersonalDetails.customerGlobalId);
//       expect(complianceService.getCustomerComplianceProcessesDetail).toHaveBeenCalledWith(1);
//       expect(component.customerComplianceProcessList).toEqual(complianceListObj);
//       expect(component.processDetails[complianceHistoryDetail.pageId]).toEqual(complianceHistoryDetail);
//       expect(component.isLoadingCompliance).toBeFalse();
//     })
// tslint:disable-next-line:max-line-length
//     it("should run #getCustomerComplianceProcessList() if the customer profile and set isLoadingCompliance to false if an error occurs", () => {
//       spyOn(complianceService, "getCustomerComplianceProcessList").and.returnValue(throwError("Error"));
//       component._customerProfile = customerProfile;
//
//       component.getComplianceProcesses();
//
//       expect(component.isLoadingCompliance).toBeFalse();
//     })
//   })
//
//   describe("#cityStateCode", () => {
//     it("should return formatted geographical region data", () => {
//       spyOn(component, "getComplianceProccesses");
//
//       component.customerProfile = { ...customerProfile };
//
//       let result = component.cityStateCode;
//
//       expect(result).toEqual("Houston, TX, 26309")
//     });
//   })
//
//   describe("#openRedFlagDialog()", () => {
//     it("should call open dialog with null details compliance process", () => {
//       component.processDetails = {};
//       spyOn(matDialog, "open");
//
//       component.openRedFlagDialog("Red Flag", "RedFlag");
//
//       expect(matDialog.open).toHaveBeenCalledWith(RedFlagDialogComponent, {
//         width: "600px",
//         maxHeight: "80vh",
//         data: { title: "Red Flag", procDetail: null, procName: "RedFlag" }
//       });
//
//     })
//
//     it("should call open dialog with a details onject for compliance process", () => {
//       component.processDetails = { "RedFlag": { test: "test" } };
//       spyOn(matDialog, "open");
//
//       component.openRedFlagDialog("Red Flag", "RedFlag");
//
//       expect(matDialog.open).toHaveBeenCalledWith(RedFlagDialogComponent, {
//         width: "600px",
//         maxHeight: "80vh",
//         data: { title: "Red Flag", procDetail: { test: "test" }, procName: "RedFlag" }
//       });
//
//     })
//   })
//
//   describe("MenuDialogs", () => {
//
//     it('should run #openAddPurchaseVehicleDialog()', async () => {
//       spyOn(component, "getComplianceProccesses");
//
//       spyOn(matDialog, 'open');
//       component.customerProfile = customerProfile;
//
//       component.openAddPurchaseVehicleDialog();
//
//       expect(matDialog.open).toHaveBeenCalledWith(AddPurchaseVehicleDialogComponent, {
//         width: '460px',
//         data: { customerId: component.customerProfile.CustomerPersonalDetails.customerGlobalId }
//       });
//     });
//
//
//     it('should run #openAddTradeVehicleDialog()', async () => {
//       spyOn(component, "getComplianceProccesses");
//
//       spyOn(matDialog, 'open');
//       component.customerProfile = customerProfile;
//
//       component.openAddTradeVehicleDialog();
//
//       expect(matDialog.open).toHaveBeenCalledWith(AddTradeVehicleDialogComponent, {
//         width: '460px',
//         data: component.customerProfile
//       });
//     });
//
//
//     it('should run #openSendDigitalApplicationDialog()', async () => {
//       spyOn(component, "getComplianceProccesses");
//
//       spyOn(matDialog, 'open');
//       component.customerProfile = customerProfile;
//
//       component.openSendDigitalApplicationDialog();
//
//       expect(matDialog.open).toHaveBeenCalledWith(SendDigitalApplicationDialogComponent, {
//         width: '460px',
//         data: component.customerProfile
//       });
//     });
//
//     it('should run #openGenerateFinanceApplicationDialog()', async () => {
//       spyOn(component, "getComplianceProccesses");
//
//       spyOn(matDialog, 'open');
//       component.customerProfile = customerProfile;
//
//       component.openGenerateFinanceApplicationDialog();
//
//       expect(matDialog.open).toHaveBeenCalledWith(GenerateFinanceApplicationDialogComponent, {
//         width: '1040px',
//         data: component.customerProfile
//       });
//     });
//
//
//     it('should run #openSendRecordToDMSDialog()', async () => {
//       spyOn(component, "getComplianceProccesses");
//
//       spyOn(matDialog, 'open');
//       component.customerProfile = customerProfile;
//
//       component.openSendRecordToDMSDialog();
//
//       expect(matDialog.open).toHaveBeenCalledWith(SendRecordToDmsDialogComponent, {
//         width: '460px',
//         data: component.customerProfile
//       });
//     });
//
//
//     it('should run #openSendRecordToCRMDialog()', async () => {
//       spyOn(component, "getComplianceProccesses");
//
//       spyOn(matDialog, 'open');
//       component.customerProfile = customerProfile;
//
//       component.openSendRecordToCRMDialog();
//
//       expect(matDialog.open).toHaveBeenCalledWith(SendRecordToCrmDialogComponent, {
//         width: '460px',
// tslint:disable-next-line:max-line-length
//         data: {customerGlobalId: component.customerProfile.CustomerPersonalDetails.customerGlobalId, eventCode: component.customerProfile.EventCode}
//       });
//     });
//   })
//
// })
