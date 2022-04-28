import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreditReportService } from '../../../services/credit-report/credit-report.service';
import { FormsModule } from '@angular/forms';
import { RequestCreditDialogComponent } from './request-credit-dialog.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { default as ProfileNoCoBorrower } from '../../../../testing/json/profile_coborrower.json';
import { CustomerProfile } from '../../../models/customers/customer_profile';

describe('RequestCreditDialogComponent', () => {
  let component: RequestCreditDialogComponent;
  let fixture: ComponentFixture<RequestCreditDialogComponent>;
  let matDialogRef: MatDialogRef<RequestCreditDialogComponent>;
  let snackBar: MatSnackBar;
  let creditReportService: CreditReportService;
  let customerProfile: CustomerProfile = ProfileNoCoBorrower.CustomerData;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestCreditDialogComponent],
      imports: [NoopAnimationsModule, FormsModule, MatDialogModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: CreditReportService, useValue: { requestCreditInformation: (borrower_payload) => of(null) } },
        { provide: MatSnackBar, useValue: { open: (message, action, opt) => { } } },
        { provide: MatDialogRef, useValue: mockDialogRef },
        {
          provide: MAT_DIALOG_DATA, useValue: {
            customerProfile,
          }
        }]
    });
    fixture = TestBed.createComponent(RequestCreditDialogComponent);
    matDialogRef = TestBed.inject(MatDialogRef);
    snackBar = TestBed.inject(MatSnackBar);
    creditReportService = TestBed.inject(CreditReportService);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`reportType has default value`, () => {
    expect(component.reportType).toEqual(`hard_inquiry`);
  });


  it(`isLoading has default value of false`, () => {
    expect(component.isLoading).toEqual(false);
  });

  it(`creditBureau has default value`, () => {
    expect(component.creditBureau).toEqual([
      { name: 'Experian', value: 'experian', isChecked: false },
      { name: 'Equifax', value: 'equifax', isChecked: false },
      { name: 'TransUnion', value: 'transunion', isChecked: false }
    ]);
  });

  describe('#onNoClick()', () => {
    it('should call #dialogRef.close()', () => {

      component.onNoClick();

      expect(matDialogRef.close).toHaveBeenCalled();
    })
  })

  describe('#customerPersonalDetails', () => {
    it('should return undefined if customer profile is undefined', () => {
      component.data.customerProfile = undefined;

      expect(component.customerPersonalDetails).toBeUndefined();
    });

    it('should return object if customer profile is defined', () => {
      component.data.customerProfile = customerProfile;

      expect(component.customerPersonalDetails).toEqual(customerProfile.CustomerPersonalDetails);
    })
  })

  describe('#coBorrowerDetails', () => {
    it('should return undefined if customer profile is undefined', () => {
      component.data.customerProfile = undefined;

      expect(component.customerPersonalDetails).toBeUndefined();
    });

    it('should return object if customer profile is defined', () => {
      component.data.customerProfile = customerProfile;

      expect(component.coBorrowerDetails).toEqual(customerProfile.CoBorrower);
    })
  })

  describe('#hasCoBorrower', () => {
    it('should return true if coBorrower is not null or undefined', () => {
      spyOnProperty(component, 'coBorrowerDetails', 'get').and.returnValue({ test: 'test' })

      expect(component.hasCoBorrower).toBeTrue();
    });

    it('should return false if coBorrower is null', () => {
      spyOnProperty(component, 'coBorrowerDetails', 'get').and.returnValue(null)

      expect(component.hasCoBorrower).toBeFalse();
    });

    it('should return false if coBorrower is undefined', () => {
      spyOnProperty(component, 'coBorrowerDetails', 'get').and.returnValue(undefined)

      expect(component.hasCoBorrower).toBeFalse();
    });
  })

  describe('#hasMultipleBureaus', () => {
    it('should return false if 1 or less credit bureau isChecked', () => {
      component.creditBureau[0].isChecked = true;
      component.creditBureau[1].isChecked = false;
      component.creditBureau[2].isChecked = false;

      expect(component.hasMultipleBureaus).toBeFalse();
    });

    it('should return true if 2 or more credit bureau isChecked', () => {
      component.creditBureau[0].isChecked = true;
      component.creditBureau[1].isChecked = true;
      component.creditBureau[2].isChecked = false;

      expect(component.hasMultipleBureaus).toBeTrue();
    });
  })

  describe('#booleanToYN()', () => {
    it('should Y if value is true', () => {
      expect(component.booleanToYN(true)).toEqual('Y');
    })
    it('should N if value is false', () => {
      expect(component.booleanToYN(false)).toEqual('N');
    })
  })

  describe('#processedRequestBody()', () => {
    it('should return request body customer id, customer cell including country code, credit bureau statues when not coBorrower exist and has single checked bureau', () => {
      component.data.customerProfile = customerProfile;

      component.creditBureau[0].isChecked = true;
      component.creditBureau[1].isChecked = false;
      component.creditBureau[2].isChecked = false;

      component.customercell = '1234567891';
      spyOnProperty(component, 'hasCoBorrower', 'get').and.returnValue(false);
      spyOnProperty(component, 'hasMultipleBureaus', 'get').and.returnValue(false);

      let result = component.processedRequestBody();

      expect(result).toEqual({
        'globalcustomerid': customerProfile.CustomerPersonalDetails.customerGlobalId,
        'customercell': '11234567891',
        'inquirytype': 'Individual',
        'inquiryrequest': 'Other',
        'coborrowerglobalcustomerid': '',
        'coborrowercustomercell': '',
        'experian': 'Y',
        'equifax': 'N',
        'transunion': 'N'
      })
    });

    it('should return request body customer id, customer cell including country code, credit bureau statues when coBorrower exists and has multiple checked bureau', () => {

      component.data.customerProfile = customerProfile;
      component.creditBureau[0].isChecked = true;
      component.creditBureau[1].isChecked = true;
      component.creditBureau[2].isChecked = false;

      component.customercell = '1234567891';
      component.coborrowercustomercell = '1324567891';
      spyOnProperty(component, 'hasCoBorrower', 'get').and.returnValue(true);
      spyOnProperty(component, 'hasMultipleBureaus', 'get').and.returnValue(true);

      let result = component.processedRequestBody();

      expect(result).toEqual({
        'globalcustomerid': customerProfile.CustomerPersonalDetails.customerGlobalId,
        'customercell': '11234567891',
        'inquirytype': 'Joint',
        'inquiryrequest': 'Merge',
        'coborrowerglobalcustomerid': customerProfile.CoBorrower.customerGlobalId,
        'coborrowercustomercell': '11324567891',
        'experian': 'Y',
        'equifax': 'Y',
        'transunion': 'N'
      })
    })
  })

  describe('#isReadyToSend', () => {
    it('should return false if is loading is true', () => {
      component.isLoading = true;

      expect(component.isReadyToSend).toBeFalse();
    })
    it('should return false if is no credit bureau isChecked', () => {
      component.isLoading = false;
      component.creditBureau[0].isChecked = false;
      component.creditBureau[1].isChecked = false;
      component.creditBureau[2].isChecked = false;

      expect(component.isReadyToSend).toBeFalse();
    })

    it('should return false if is cell is undefined', () => {
      component.isLoading = false;
      component.creditBureau[0].isChecked = true;
      component.creditBureau[1].isChecked = false;
      component.creditBureau[2].isChecked = false;
      component.customercell = undefined;


      expect(component.isReadyToSend).toBeFalse();
    })
    it('should return false if is cell is not 10 digits', () => {
      component.isLoading = false;
      component.creditBureau[0].isChecked = true;
      component.creditBureau[1].isChecked = false;
      component.creditBureau[2].isChecked = false;
      component.customercell = '00000';



      expect(component.isReadyToSend).toBeFalse();
    })

    it('should return false if it hasCoBorrower but cell is not 10 digits', () => {
      component.isLoading = false;
      component.creditBureau[0].isChecked = true;
      component.creditBureau[1].isChecked = false;
      component.creditBureau[2].isChecked = false;
      component.customercell = '1234567891';
      spyOnProperty(component, 'hasCoBorrower', 'get').and.returnValue(true);
      component.coborrowercustomercell = '00000';


      expect(component.isReadyToSend).toBeFalse();
    })

    it('should return false if it hasCoBorrower but cell is not defined', () => {
      component.isLoading = false;
      component.creditBureau[0].isChecked = true;
      component.creditBureau[1].isChecked = false;
      component.creditBureau[2].isChecked = false;
      component.customercell = '1234567891';
      spyOnProperty(component, 'hasCoBorrower', 'get').and.returnValue(true);
      component.coborrowercustomercell = undefined;


      expect(component.isReadyToSend).toBeFalse();
    })

    it('should return true if not loading, has at least 1 checked bureau,has 10 digit customer cell and 10 digit coborrower customer cell', () => {
      component.isLoading = false;
      component.creditBureau[0].isChecked = true;
      component.creditBureau[1].isChecked = false;
      component.creditBureau[2].isChecked = false;
      component.customercell = '1234567891';
      spyOnProperty(component, 'hasCoBorrower', 'get').and.returnValue(true);
      component.coborrowercustomercell = '0000012345';


      expect(component.isReadyToSend).toBeTrue();
    })
  })

  describe('#submitRequest()', () => {
    it('should call #requestCreditInformation() and if successful should call dialog close and snackbar', () => {
      spyOn(component, 'processedRequestBody').and.returnValue({});
      spyOn(creditReportService, 'requestCreditInformation').and.returnValue(of(null));
      spyOn(snackBar, 'open');

      component.submitRequest()

      expect(component.processedRequestBody).toHaveBeenCalled();
      expect(creditReportService.requestCreditInformation).toHaveBeenCalledWith({});
      expect(component.isLoading).toBeFalse();
      expect(matDialogRef.close).toHaveBeenCalled()
      expect(snackBar.open).toHaveBeenCalledWith('Order Credit request submitted successfully!', 'Dismiss', {
        duration: 5000
      })

    });
    it('should call #requestCreditInformation() and if error should call snackbar', () => {
      spyOn(component, 'processedRequestBody').and.returnValue({});
      spyOn(creditReportService, 'requestCreditInformation').and.returnValue(throwError('Error'));
      spyOn(snackBar, 'open');

      component.submitRequest()

      expect(component.processedRequestBody).toHaveBeenCalled();
      expect(creditReportService.requestCreditInformation).toHaveBeenCalledWith({});
      expect(component.isLoading).toBeFalse();
      expect(snackBar.open).toHaveBeenCalledWith('Failed to submit an \'order credit\' request.', 'Dismiss', {
        duration: 5000
      })

    });
  });
});
