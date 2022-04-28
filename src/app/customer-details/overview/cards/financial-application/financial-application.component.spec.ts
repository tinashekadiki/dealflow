import { Overlay } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FinancialApplicationComponent } from './financial-application.component';
import { MatDialog } from '@angular/material/dialog';

describe('FinancialApplicationComponent', () => {
  let component: FinancialApplicationComponent;
  let fixture: ComponentFixture<FinancialApplicationComponent>;
  let matSnackBar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialApplicationComponent ],
      providers: [
        {provide: MatSnackBar},
        {provide: Overlay}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialApplicationComponent);
    matSnackBar = TestBed.inject(MatSnackBar);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get customer personal details', async()=>{
    expect(component.customerPersonalDetails).toBeFalsy();
  });

  it('should load customer contact details', async () => {
    expect(component.customerContactDetails).toBeFalsy();
  });

  it('should load coborrower', async()=>{
    expect(component.customerCoBorrower).toBeFalsy();
  });

  it('should load submit request', async()=>{
    spyOn(component, 'submitRequest').and
    .callThrough();
    expect(component.submitRequest).toBeTruthy();
  })
});
