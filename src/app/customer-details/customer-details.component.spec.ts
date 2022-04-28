import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { FullCustomerData } from '../shared/models/customers/full_customer_data';
import { CustomerRecordsService } from '../shared/services/customer-records/customer-records.service';
import { CustomerDetailsComponent } from './customer-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BreadcrumbService } from 'xng-breadcrumb';
import { default as SampleProfileJSON} from '../testing/json/profile_coborrower.json'
import { of, throwError } from 'rxjs';
import { MatDialog, MAT_DIALOG_SCROLL_STRATEGY } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';

describe('CustomerDetailsComponent', () => {
  let component: CustomerDetailsComponent;
  let fixture: ComponentFixture<CustomerDetailsComponent>;
  let customerRecordsService: CustomerRecordsService;
  let breadcrumb: BreadcrumbService;
  let customerProfile: FullCustomerData = SampleProfileJSON;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDetailsComponent ],
      providers: [
        {provide: ActivatedRoute, useValue: {snapshot:{params:{customerId: 'test'}}}},
        {provide: CustomerRecordsService, useValue:{getCustomer:(customerId)=> of(customerProfile)}},
        {provide: BreadcrumbService, useValue:{set:(key)=>{}}},
        {provide: MatDialog},
        {provide: Overlay},
        {provide: MAT_DIALOG_SCROLL_STRATEGY, useValue: {}}
      ],
      imports: [RouterTestingModule, NoopAnimationsModule]
    })
    .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDetailsComponent);
    customerRecordsService = TestBed.inject(CustomerRecordsService);
    breadcrumb = TestBed.inject(BreadcrumbService);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  describe('#ngOnInit()',() =>{
    it('should initialise component with customer data ', () => {
      spyOn(component, 'getCustomer').and.returnValue();
      spyOn(breadcrumb,'set')

      component.ngOnInit();
      expect(component.isLoadingCustomer).toBeFalse();
      expect(breadcrumb.set).toHaveBeenCalledWith("@customerName","Loading...");
      expect(component.getCustomer).toHaveBeenCalledWith("test");
    });
  })

  describe('#getCustomer()',() => {
    it('should call #customerRecords.getCustomer() and when successful should populate #customer',()=>{
      spyOn(customerRecordsService, 'getCustomer').and.returnValue(of(customerProfile));
      spyOn(breadcrumb, 'set').and.callThrough();

      component.getCustomer('test')

      expect(breadcrumb.set).toHaveBeenCalledWith('@customerName','COMFORT BRIGGS');
      expect(customerRecordsService.getCustomer).toHaveBeenCalledWith('test');
      expect(component.customer).toEqual(customerProfile);
      expect(component.isLoadingCustomer).toBeFalse();
    })
    it('should call #customerRecords.getCustomer() and when error should set isLoadingCustomer to false',()=>{
      spyOn(customerRecordsService, 'getCustomer').and.returnValue(throwError('error'));

      component.getCustomer('test')

      expect(customerRecordsService.getCustomer).toHaveBeenCalledWith('test');
      expect(component.isLoadingCustomer).toBeFalse();
    })
  })

  describe('#customerCoBorrower',()=>{
    it("should return customer co borrower when present",()=>{
      component.customer = customerProfile;

      expect(component.customerCoBorrower).toEqual(customerProfile.CustomerData.CoBorrower)
    })

    it("should return undefined co borrower when customer is undefined",()=>{
      component.customer = undefined;

      expect(component.customerCoBorrower).toBeUndefined()
    })
  })

  describe("#customerProfile",()=>{
    it("should return customer profile when present",()=>{
      component.customer = customerProfile;

      expect(component.customerProfile).toEqual(customerProfile.CustomerData)
    })

    it("should return undefined profile when customer is undefined",()=>{
      component.customer = undefined;

      expect(component.customerProfile).toBeUndefined()
    })
  })

  describe("#acceptCoborrowerId()",()=>{
    it("should set #customer2id",()=>{
      component.acceptCoborrowerId(23);

      expect(component.customer2id).toEqual(23);
    })
  })

});
