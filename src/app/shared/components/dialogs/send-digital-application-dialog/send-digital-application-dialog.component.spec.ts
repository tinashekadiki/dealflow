/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { CreditReportService } from '../../../services/credit-report/credit-report.service'
import { AuthorizationService } from '../../../services/authorization/authorization.service';
import { SendDigitalApplicationDialogComponent } from './send-digital-application-dialog.component';

describe('SendDigitalApplicationDialogComponent', () => {
  let component: SendDigitalApplicationDialogComponent;
  let fixture: ComponentFixture<SendDigitalApplicationDialogComponent>;
  let creditReportService: CreditReportService;
  let authorizationService: AuthorizationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendDigitalApplicationDialogComponent ],
      providers: [HttpClient,HttpHandler,CreditReportService,
        {provide: MAT_DIALOG_DATA, useValue: {
          CustomerPersonalDetails:{
            globalcustomerid:{
              customerGlobalId: {

              }
            }
          }}}, {provide: MatDialogRef, useValue: {}},
        {
          provide: MatSnackBar, useValue: {
            open: (message, action, opt) => {
            }
          }
        },
        { provide: AuthorizationService, useValue: {}},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendDigitalApplicationDialogComponent);
    creditReportService = TestBed.inject(CreditReportService);
    authorizationService = TestBed.inject(AuthorizationService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize with the following defaults', ()=>{
    component.ngOnInit();
    expect(component.isLoading).toBe(false);
    expect(component.isLoadingCustomer).toBe(false);
    expect(component.selectedIndex).toEqual(0);
    expect(component.equifax).toBe(false);
    expect(component.experian).toBe(false);
    expect(component.transunion).toBe(false);
  });
  it('customerPersonalDetails should return customers personal details', ()=>{
    expect(component.customerPersonalDetails).toBeTruthy();
  });
  it('should load toggleEquifax', ()=>{
    expect(component.toggleEquifax).toBeTruthy();
  });
  it('should load toggleExperian', ()=>{
    expect(component.toggleExperian).toBeTruthy();
  });
  it('should load toggleTransunion', ()=>{
    expect(component.toggleTransunion).toBeTruthy();
  });
  it('should load submitRequest', ()=>{
    expect(component.submitRequest).toBeTruthy();
  })
});
