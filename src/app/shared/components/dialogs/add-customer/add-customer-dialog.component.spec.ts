/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AuthorizationService } from '../../../services/authorization/authorization.service';
import { AddCustomerDialogComponent } from './add-customer-dialog.component';
import { Overlay } from '@angular/cdk/overlay';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AddCustomerDialogComponent', () => {
  let component: AddCustomerDialogComponent;
  let fixture: ComponentFixture<AddCustomerDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCustomerDialogComponent ],
      imports: [MatDialogModule, FormsModule],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: HttpClient},
        {provide: HttpHandler},
        {provide: AuthorizationService},
        {provide: MatSnackBar},
        {provide: Overlay}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCustomerDialogComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
