import { Injectable, InjectionToken } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatDialogMock } from 'src/app/profile/dealer-settings/dealer-settings.component.spec';
import {ProcessConfigService} from '../../shared/services/process-config/process-config.service';
import { AddProcessComponent } from './add-process.component';



describe('AddProcessComponent', () => {
  let component: AddProcessComponent;
  let fixture: ComponentFixture<AddProcessComponent>;
  let processConfigService: ProcessConfigService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProcessComponent ],
      providers: [{provide: MatDialogRef, useValue:{}}, {provide: MAT_DIALOG_DATA, useValue:{}},
        {provide: ProcessConfigService, useValue: {data: {
          processes:{

          }
        }}}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProcessComponent);
    processConfigService = TestBed.inject(ProcessConfigService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
