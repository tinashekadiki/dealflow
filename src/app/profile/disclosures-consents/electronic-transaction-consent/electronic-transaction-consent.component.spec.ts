import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronicTransactionConsentComponent } from './electronic-transaction-consent.component';

describe('ElectronicTransactionConsentComponent', () => {
  let component: ElectronicTransactionConsentComponent;
  let fixture: ComponentFixture<ElectronicTransactionConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectronicTransactionConsentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectronicTransactionConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
