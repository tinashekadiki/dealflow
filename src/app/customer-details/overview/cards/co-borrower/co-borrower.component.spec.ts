import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoBorrowerComponent } from './co-borrower.component';

describe('CoBorrowerComponent', () => {
  let component: CoBorrowerComponent;
  let fixture: ComponentFixture<CoBorrowerComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ CoBorrowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoBorrowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with Coborrower details from shell', () => {
    expect(component._coBorrower).toBe(undefined);
  });

  it('should sync with Coborrower details from shell', () => {
    expect(component.customerCoBorrower).toBe(undefined);
  });

  it('should sync formatted Address with Coborrower details from shell', () => {
    expect(component.formattedAddress).toBe(undefined);
  });

  it('should sync phone number with Coborrower details from shell', () => {
    expect(component.phoneNumber).toBe(undefined);
  });

  it('should sync license number with Coborrower details from shell', () => {
    expect(component.licenseNumber).toBe(undefined);
  });

  it('should sync license expiry date with Coborrower details from shell', () => {
    expect(component.expiryDate).toBe(undefined);
  });
});
