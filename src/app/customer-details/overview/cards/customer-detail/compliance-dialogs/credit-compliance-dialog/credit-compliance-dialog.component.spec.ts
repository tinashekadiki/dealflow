import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditComplianceDialogComponent } from './credit-compliance-dialog.component';

describe('CreditComplianceDialogComponent', () => {
  let component: CreditComplianceDialogComponent;
  let fixture: ComponentFixture<CreditComplianceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditComplianceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditComplianceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
