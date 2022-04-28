/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { GenerateFinanceApplicationDialogComponent } from './generate-finance-application-dialog.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerProfile } from '../../../../shared/models/customers/customer_profile';


describe('GenerateFinanceApplicationDialogComponent', () => {
  let component: GenerateFinanceApplicationDialogComponent;
  let fixture: ComponentFixture<GenerateFinanceApplicationDialogComponent>;
  let matSnackBar: MatSnackBar;
  let customerProfile: CustomerProfile;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateFinanceApplicationDialogComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatSnackBar},
        {provide: Overlay}
      ],
      imports: [
        MatDialogModule, FormsModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateFinanceApplicationDialogComponent);
    matSnackBar = TestBed.inject(MatSnackBar);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

});
