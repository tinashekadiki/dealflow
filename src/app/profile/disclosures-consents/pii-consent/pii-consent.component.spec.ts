import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiiConsentComponent } from './pii-consent.component';

describe('PiiConsentComponent', () => {
  let component: PiiConsentComponent;
  let fixture: ComponentFixture<PiiConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiiConsentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PiiConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
