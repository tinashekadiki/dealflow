import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MAT_DIALOG_SCROLL_STRATEGY } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { TradeVehicleComponent } from './trade-vehicle.component';
import { Overlay } from '@angular/cdk/overlay';
import { InventoryService } from 'src/app/shared/services/inventory/inventory.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

export class MatDialogMock {
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  open() {
    return {
      afterClosed: () => of({action: true})
    };
  }
}


describe('TradeVehicleComponent', () => {
  let component: TradeVehicleComponent;
  let fixture: ComponentFixture<TradeVehicleComponent>;
  let inventoryService: InventoryService;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TradeVehicleComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: ActivatedRoute, useValue: {snapshot:{params:{customerId: "test"}}}},
        { provide: HttpClient },
        { provide: HttpHandler },
        { provide: MatSnackBar },
        { provide: Overlay },
        // { provide: MatDialog, useValue: {} },
        { provide: MAT_DIALOG_SCROLL_STRATEGY, useValue: {} },
        { provide: MatDialog, useClass: MatDialogMock }
      ],
      imports: [NoopAnimationsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeVehicleComponent);
    inventoryService = TestBed.inject(InventoryService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    component = fixture.componentInstance;

    component.customerProfile = {
      ComplianceFlag:"Active",
      relationType: null,
      processes: [],
      CustomerPersonalDetails: {
        id: 0,
        customerGlobalId: "string",
        createdAt: new Date(),
        dateOfBirth: new Date(),
        educLevel: "string",
        familyName: "string",
        firstName: "string",
        givenName: "string",
        lastName: "string",
        licenseExpirationDate: new Date(),
        licenseIdNumber: "string",
        licenseState: "string",
        middleInitial: "string",
        middleName: "string",
        namePrefix: "string",
        nameSuffix: "string",
        nonResidentIndicator: "string",
        privacyIndicator: "string",
        privacyType: "string",
        socialSecurityNumber: 'any',
        socialSecurityNumberFraud1: 'any',
        socialSecurityNumberFraud2: 'any',
        socialSecurityNumberFraud3: 'any',
        status: 'any',
        statusDescription: 'any',
        eyeColor: "string",
        hairColor: "string",
        heightInCm: "string",
        heightInFtIn: "string",
        sex: "string",
        weightInKg: 'any',
        weightInLbs: "string",
      },
      CustomerBiometricDetail: null,
      CustomerContactDetails: null,
      CustomerPreviousContactDetails: null,
      CoBorrower: null,
      EventCode: ''
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialise loading to false', () => {
    expect(component.isLoading).toBeFalsy();
  });


  it('should initialise check to zero', () => {
    expect(component.check).toBe(0);
  });


  it('ngOnInit makes expected calls', () => {
    spyOn(component, 'ngOnInit').and.callThrough();
    spyOn(component, 'getTradeInVehicle').and.callThrough();

    component.ngOnInit();

    expect(component.getTradeInVehicle).toHaveBeenCalled();
  });

  it('should getTradInVehicle', () => {
    component.getTradeInVehicle()
    expect(component.isLoading).toBeTrue
  });

  it('should openTradeInVehicle', () => {
    // let dialog = new MatDialog()

    spyOn(component.dialog, 'open').and.callThrough();
    component.openTradeInVehicle();

    expect(component.dialog.open).toHaveBeenCalled();
  });


  it('should openDeleteConfirmationDialog', () => {
    // let dialog = new MatDialog()

    spyOn(component.dialog, 'open').and.callThrough();
    component.openDeleteConfirmationDialog(3);

    expect(component.dialog.open).toHaveBeenCalled();
  });

});
