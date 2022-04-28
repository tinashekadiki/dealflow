/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddTradeVehicleDialogComponent } from './add-trade-vehicle-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('AddTradeVehicleDialogComponent', () => {
  let component: AddTradeVehicleDialogComponent;
  let fixture: ComponentFixture<AddTradeVehicleDialogComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTradeVehicleDialogComponent ],
      providers:[
        {provide:MatDialogRef,  useValue: mockDialogRef},
        {provide:MAT_DIALOG_DATA, useValue:{}},
        {provide:MatSnackBar},
        {provide:Overlay},
        {provide:HttpClient},
        {provide:HttpHandler},

      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTradeVehicleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
