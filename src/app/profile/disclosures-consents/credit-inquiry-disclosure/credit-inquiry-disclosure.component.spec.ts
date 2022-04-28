import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditInquiryDisclosureComponent } from './credit-inquiry-disclosure.component';

describe('CreditInquiryDisclosureComponent', () => {
  let component: CreditInquiryDisclosureComponent;
  let fixture: ComponentFixture<CreditInquiryDisclosureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditInquiryDisclosureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditInquiryDisclosureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
