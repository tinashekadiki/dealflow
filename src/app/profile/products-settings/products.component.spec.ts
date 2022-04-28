import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PermissionsService } from 'src/app/shared/services/permissions/permissions.service';
import { ProductsComponent } from './products.component';
import { of, throwError } from 'rxjs';
import { ProfileService } from 'src/app/shared/services/profile/profile.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { default as SamplePermissionData } from '../../testing/json/permissions.json'
import { IPermissions } from 'src/app/shared/models/permissions/permissions';


describe('ProductsComponent', () => {
  class MatSnackBarStub{
    open(message,action,config){
      return {
        onAction: () => of({})
      }
    }
  }
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let permissionsService:PermissionsService;
  let profileService: ProfileService;
  let matSnackBar: MatSnackBar;
  let permissionsObj: IPermissions = SamplePermissionData;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsComponent ],
      providers:[
        {provide: MatSnackBar, useClass: MatSnackBarStub},
        {provide: ProfileService, useValue:{
          postRequest:(path,branchid,data)=>{},
          getRequest:(path,branchid)=>{},
          products:[
            'ID Scan',
            'ID Verification',
            'Text',
            'URL Link',
            'Payfone Auth',
            'Payfone Prefill',
            'Synthetic Fraud Check',
            'AIC Prefill',
            'Credit Pull',
            'Fed Checks',
            'CRM Push',
            'CDK Stock',
            'DT Send',
            'CDK W Back'
          ]
        }
      },
        {provide : PermissionsService, useValue: { permissions: permissionsObj }}
      ],
      imports: [
        NoopAnimationsModule
      ]
    })
    .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    permissionsService = TestBed.inject(PermissionsService);
    profileService = TestBed.inject(ProfileService);
    matSnackBar = TestBed.inject(MatSnackBar);

    component = fixture.componentInstance;

  });

  it('should create', () => {
    spyOn(component,"retrieveProductList");
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe("#ngOnInit()",()=>{
    it("should call #setAllowedDealership()",()=>{
      spyOn(component,"setAllowedDealership");

      component.ngOnInit();

      expect(component.setAllowedDealership).toHaveBeenCalled();
    })
  })

  describe("#setAllowedDealership()",()=>{
    it("should set allowed dealership to the 1st allowed and all products-settings and call #retrieveProductList()",()=>{
      spyOn(component,"retrieveProductList");
      component.allProducts = undefined;
      component.allowedDealership = undefined;

      component.setAllowedDealership()

      expect(component.allProducts).toEqual([
        'ID Scan',
        'ID Verification',
        'Text',
        'URL Link',
        'Payfone Auth',
        'Payfone Prefill',
        'Synthetic Fraud Check',
        'AIC Prefill',
        'Credit Pull',
        'Fed Checks',
        'CRM Push',
        'CDK Stock',
        'DT Send',
        'CDK W Back'
      ]);

      expect(component.allowedDealership).toEqual(permissionsObj.alloweddealerships[0])
      expect(component.getEntitlementProducts).toHaveBeenCalled()
    })
  })

  describe("#saveProduct()",()=>{
    it("should call #postRequest() to save opted products-settings and call #retrieveProductList() if successful",() => {
      spyOn(profileService,"postRequest").and.returnValue(of({message:"ok"}))
      component.allowedDealership = permissionsObj.alloweddealerships[0]
      spyOn(component,"retrieveProductList");

      component.saveProduct("Text",{checked:true})

      expect(profileService.postRequest).toHaveBeenCalledWith('addorupdatesingleproduct', '', {
        active: "true",
        branchId: "234024",
        productname: "Text"
      });

      expect(component.getEntitlementProducts).toHaveBeenCalled();
    })
  });

  describe("#retrieveProductList()",()=>{
    it("should call #getRequest(), populate product data and open a snackbar if successful",()=>{
      spyOn(profileService,"getRequest").and.returnValue(of([{active: "true","branchId": "234024","id": 1,"productname": "Test"}]))
      spyOn(matSnackBar,"open");
      component.entitlementProducts = undefined;
      component.allowedDealership = permissionsObj.alloweddealerships[0]

      component.getEntitlementProducts()

      expect(profileService.getRequest).toHaveBeenCalledWith('retrieveproductsettings/', "234024")
      expect(component.entitlementProducts).toEqual([{active: "true","branchId": "234024","id": 1,"productname": "Test"}])
      expect(matSnackBar.open).toHaveBeenCalledWith(`Retrieved product settings successfully`, 'Dismiss', {
        duration: 2000,
      })
    })
    it("should call #getRequest(), not populate product data and open a snackbar if unsuccessful",()=>{
      spyOn(profileService,"getRequest").and.returnValue(throwError({message:"error"}))
      spyOn(matSnackBar,"open");
      component.entitlementProducts = undefined;
      component.allowedDealership = permissionsObj.alloweddealerships[0]

      component.getEntitlementProducts()

      expect(profileService.getRequest).toHaveBeenCalledWith('retrieveproductsettings/', "234024")
      expect(component.entitlementProducts).toBeUndefined()
      expect(matSnackBar.open).toHaveBeenCalledWith(`Failed to load products. Reason error`, 'Dismiss', {
        duration: 2000,
      })
    })
  })

  it('should create', () => {
    expect(component.getEntitlementProducts).toBeTruthy();
  });

  it('should create', () => {
    expect(component.setAllowedDealership).toBeTruthy();
  });

  it('should create', () => {
    expect(component.saveProduct).toBeTruthy();
  });

  afterAll(()=> {
    TestBed.resetTestingModule();
  });
});
