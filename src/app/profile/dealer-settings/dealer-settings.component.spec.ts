import { ComponentFixture, TestBed, fakeAsync, inject } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs/internal/observable/of';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserService } from '../../shared/services/user/user.service';
import { HttpClientModule } from '@angular/common/http';
import { DealerSettingsComponent } from './dealer-settings.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { FormBuilder } from '@angular/forms';
import { Alloweddealership } from 'src/app/shared/models/permissions/permissions';
import { AuthorizationService } from 'src/app/shared/services/authorization/authorization.service';
import { PermissionsService } from 'src/app/shared/services/permissions/permissions.service';


export class MatDialogMock {
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  open() {
    return {
      afterClosed: () => of({ action: true })
    };
  }
}

describe('DealerSettingsComponent', () => {
  let component: DealerSettingsComponent;
  let fixture: ComponentFixture<DealerSettingsComponent>;
  let matDialog: MatDialog;
  let permissionsService: PermissionsService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DealerSettingsComponent],
      imports: [FlexLayoutModule, HttpClientModule],
      providers: [
        { provide: MatDialog, useClass: MatDialogMock },
        { provide: UserService },
        { provide: MatSnackBar },
        { provide: Overlay },
        { provide: FormBuilder },
        {
          provide: PermissionsService, useValue: {
            permissions: {
              alloweddealerships: [{
                id: 1,
                name: "test",
                branchId: "test",
                parentid: "test",
                address: "test",
                suite: "test",
                city: "test",
                state: "test",
                zip: "test",
                phone: "test",
                msa: "test",
                zone1: "test",
                zone2: "test",
                zone3: "test",
                zone4: "test",
                zone5: "test",
                active: "test",
              }]
            }
          }
        },
      ]
    })
      .compileComponents();

    matDialog = TestBed.inject(MatDialog);
    permissionsService = TestBed.inject(PermissionsService)
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerSettingsComponent);
    component = fixture.componentInstance;
    // component.allowedDealerships = [
    //   { branchid: '23', name: 'Test 1' },
    //   { branchid: '24', name: 'Test 2' },
    //   { branchid: '25', name: 'Test 3' },
    // ];
    component.allowedDealership =
    {
      id: 1,
      name: "test",
      branchId: "test",
      parentid: "test",
      address: "test",
      suite: "test",
      city: "test",
      state: "test",
      zip: "test",
      phone: "test",
      msa: "test",
      zone1: "test",
      zone2: "test",
      zone3: "test",
      zone4: "test",
      zone5: "test",
      active: "test",
    }

    component.setAllowedDealership
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('should display 4 columns', () => {
    fixture.detectChanges();
    expect(component.generalSettingsForm).toBeTruthy();
  });
  it('should have a initialised data source', () => {
    fixture.detectChanges();
    expect(component.allowedDealership).toBeTruthy();
  })
});
