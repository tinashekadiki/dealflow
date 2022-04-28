import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { CustomerRecordsService } from '../../../../shared/services/customer-records/customer-records.service';
import { DealProgressComponent } from './deal-progress.component';
import { default as SampleProcessConfigResp } from '../../../../testing/json/process_config.json';
import { ActivatedRoute } from '@angular/router';
import { DealProgressService } from 'src/app/shared/services/deal-progress/deal-progress.service';

describe('DealProgressComponent', () => {
  let component: DealProgressComponent;
  let fixture: ComponentFixture<DealProgressComponent>;
  let processConfigList = SampleProcessConfigResp;
  let customerRecordsService: CustomerRecordsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealProgressComponent ],
      providers: [
        {provide: CustomerRecordsService, useValue:{getDealerProcessList:()=>of(processConfigList)}},
        {provide: ActivatedRoute, useValue: {snapshot:{params:{customerId: "test"}}}},
        DealProgressService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealProgressComponent);
    customerRecordsService = TestBed.inject(CustomerRecordsService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("#ngOnInit()",()=>{
    it("should make a call to #getCustomerBuyingProcessList()",()=>{
      spyOn(component,"getCustomerBuyingProcessList")

      component.ngOnInit()

      expect(component.getCustomerBuyingProcessList).toHaveBeenCalled();
    })
  })

  describe("#getCustomerBuyingProcessList()",()=>{
    it("should call #getDealerProcessList()",()=>{
      spyOn(customerRecordsService,"getDealerProcessList").and.returnValue(of(processConfigList))

      component.getCustomerBuyingProcessList();

      expect(customerRecordsService.getDealerProcessList).toHaveBeenCalled()
      expect(component.customerBuyingProcessList).toEqual(processConfigList);
      expect(component.isLoadingList).toBeFalse();

    })
    it("should set isLoadingList to false if an error occurs",()=>{
      spyOn(customerRecordsService,"getDealerProcessList").and.returnValue(throwError("Error"))
      component.customerBuyingProcessList = undefined;

      component.getCustomerBuyingProcessList();

      expect(customerRecordsService.getDealerProcessList).toHaveBeenCalled()
      expect(component.customerBuyingProcessList).toBeUndefined();
      expect(component.isLoadingList).toBeFalse();

    })
  })

  describe("#isProcessCompleted()",()=>{
    it("return false when #completedProcesses is undefined",()=>{
      component.completedProcessList = undefined

      let result = component.isProcessCompleted(20);

      expect(result).toBeFalse();
    });

    it("return false when process isn't in the #completedProcesses list",()=>{
      component.completedProcessList = [{processId:19}]

      let result = component.isProcessCompleted(20);

      expect(result).toBeFalse();
    });

    it("return true when process is in the #completedProcesses list",()=>{
      spyOnProperty(component,"completedProcesses","get").and.returnValue([{processId:19}])

      let result = component.isProcessCompleted(19);

      expect(result).toBeTrue();
    });
  })

describe("#isLoading",()=>{
  it("should return true if only #isProfileLoading is true",()=>{
    component.isProfileLoading = true;
    component.isLoadingList = false;

    expect(component.isLoading).toBeTrue();
  });
  it("should return true if only #isLoadingList is true",()=>{
    component.isProfileLoading = false;
    component.isLoadingList = true;

    expect(component.isLoading).toBeTrue();
  });

  it("should return false if both #isProfileLoading & #isLoadingList are false",()=>{
    component.isProfileLoading = false;
    component.isLoadingList = false;

    expect(component.isLoading).toBeFalse();
  });
})

});
