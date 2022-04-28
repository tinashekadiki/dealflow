import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { InventoryService } from 'src/app/shared/services/inventory/inventory.service';
import { PurchaseVehicleComponent } from './purchase-vehicle.component';
import { default as SamplePurchaseInventory } from '../../../../testing/json/purchase_vehicle.json'
import { PurchaseVehicle } from 'src/app/shared/models/vehicle-inventory/purchase_vehicle';
import { throwError } from 'rxjs';
import { AddPurchaseVehicleDialogComponent } from 'src/app/shared/components/dialogs/add-purchase-vehicle-dialog/add-purchase-vehicle-dialog.component';
import { environment } from 'src/environments/environment';

describe('PurchaseVehicleComponent', () => {
  let component: PurchaseVehicleComponent;
  let fixture: ComponentFixture<PurchaseVehicleComponent>;
  let afterClosedResp = undefined;
  let snackBar:MatSnackBar;
  let inventoryService:InventoryService;
  let dialog: MatDialog;
  let purchaseVehicle:PurchaseVehicle[] = SamplePurchaseInventory;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseVehicleComponent ],
      imports: [
        RouterTestingModule, NoopAnimationsModule
      ],
      providers: [
        {provide: ActivatedRoute, useValue: {snapshot:{params:{customerId: "test"}}}},
        {provide: InventoryService, useValue: {
          getCustomerPurchaseVehicle: (customerId) => of(),
          deletePurchaseVehicle: (purchaseId) => of({}),
          triggerRefresh:()=>of(true)
        }},
        {provide: MatSnackBar, useValue:{open: (message, action, opt) => {}}},
        {provide: MatDialog,
          useValue:{
            open: (component, config?)=>{return {afterClosed:()=>of(afterClosedResp)}}
          }},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseVehicleComponent);
    snackBar = TestBed.inject(MatSnackBar);
    inventoryService = TestBed.inject(InventoryService);
    dialog = TestBed.inject(MatDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("#ngOnInit",()=>{
    it("should call #getPurchaseVehicle() and #initialiseRefreshTrigger()",()=>{
      spyOn(component,"getPurchaseVehicle")
      spyOn(component,"initialiseRefreshTrigger")

      component.ngOnInit()

      expect(component.getPurchaseVehicle).toHaveBeenCalled();
      expect(component.initialiseRefreshTrigger).toHaveBeenCalled();
    })
  })

  describe("#initialiseRefreshTrigger()",()=>{
    it("should call #getPurchaseVehicle() when #triggerRefresh returns true",()=>{
      spyOn(inventoryService,"triggerRefresh").and.returnValue(of(true));
      spyOn(component,"getPurchaseVehicle")

      component.initialiseRefreshTrigger();

      expect(component.getPurchaseVehicle).toHaveBeenCalled();
    })

    it("should call not call #getPurchaseVehicle() when #triggerRefresh returns false",()=>{
      spyOn(inventoryService,"triggerRefresh").and.returnValue(of(false));
      spyOn(component,"getPurchaseVehicle")

      component.initialiseRefreshTrigger();

      expect(component.getPurchaseVehicle).not.toHaveBeenCalled();
    })
  });

  describe("#getPurchaseVehicle()",()=>{
    it("should get customer purchase vehicle and populate #purchaseVehicle when successful",()=>{
      spyOn(inventoryService,"getCustomerPurchaseVehicle").and.returnValue(of(purchaseVehicle));
      component.purchaseVehicle = undefined;

      component.getPurchaseVehicle();

      expect(inventoryService.getCustomerPurchaseVehicle).toHaveBeenCalledWith("test")
      expect(component.purchaseVehicle).toEqual(purchaseVehicle)
      expect(component.isLoading).toBeFalse();
    })

    it("should get customer purchase vehicle and not to populate #purchaseVehicle when successful",()=>{
      spyOn(inventoryService,"getCustomerPurchaseVehicle").and.returnValue(throwError("error"));
      spyOn(snackBar,"open");
      component.purchaseVehicle = undefined;

      component.getPurchaseVehicle();

      expect(inventoryService.getCustomerPurchaseVehicle).toHaveBeenCalledWith("test")
      expect(component.purchaseVehicle).toEqual(undefined)
      expect(component.isLoading).toBeFalse();
      expect(snackBar.open).toHaveBeenCalledWith("Failed to load purchase vehicle data.", "Dismiss", {
        duration: environment.snackBarTimeout
      });
    })
  })

  describe("#deletePurchaseVehicle()",()=>{
    it("should delete customer purchase vehicle and show snackBar when successful",()=>{
      spyOn(inventoryService,"deletePurchaseVehicle").and.returnValue(of({}));
      spyOn(snackBar,"open");
      component.purchaseVehicle = undefined;

      component.deletePurchaseVehicle(1);

      expect(inventoryService.deletePurchaseVehicle).toHaveBeenCalledWith(1,"test")
      expect(snackBar.open).toHaveBeenCalledWith("Vehicle has been removed.", "Dismiss", {
        duration: environment.snackBarTimeout
      });
    })

    it("should delete customer purchase vehicle and show snackBar when unsuccessful",()=>{
      spyOn(inventoryService,"deletePurchaseVehicle").and.returnValue(throwError("error"));
      spyOn(snackBar,"open");
      component.purchaseVehicle = undefined;

      component.deletePurchaseVehicle(1);

      expect(inventoryService.deletePurchaseVehicle).toHaveBeenCalledWith(1,"test")
      expect(snackBar.open).toHaveBeenCalledWith("Unable to remove vehicle, please try again.", "Dismiss", {
        duration: environment.snackBarTimeout
      });
    })

  })

  describe("#openAddPurchaseVehicle()",()=>{
    it('should open #AddPurchaseVehicleDialogComponent()', async () => {
      spyOn(dialog, 'open');
  
      component.openAddPurchaseVehicle();
  
      expect(dialog.open).toHaveBeenCalledWith(AddPurchaseVehicleDialogComponent, {
        width: '460px',
        data:{customerId: "test"}
      });
    });
  })
  
  describe("#openDeleteConfirmationDialog()",()=>{
    it("should open the dialog and should not call #deletePurchaseVehicle() if the result from the dialog is undefined",()=>{
      afterClosedResp = undefined;

      spyOn(component,"deletePurchaseVehicle");

      component.openDeleteConfirmationDialog(1);

      expect(component.deletePurchaseVehicle).not.toHaveBeenCalled();
    })

    it("should open the dialog and should call apply filters if the result from the dialog is an true",()=>{
      afterClosedResp = true;

      spyOn(component,"deletePurchaseVehicle");

      component.openDeleteConfirmationDialog(1);

      expect(component.deletePurchaseVehicle).toHaveBeenCalledWith(1);
    })
  })
});

