import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteTermsConditionsDisclosureComponent } from './website-terms-conditions-disclosure.component';

describe('WebsiteTermsConditionsDisclosureComponent', () => {
  let component: WebsiteTermsConditionsDisclosureComponent;
  let fixture: ComponentFixture<WebsiteTermsConditionsDisclosureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebsiteTermsConditionsDisclosureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteTermsConditionsDisclosureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
