import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaliforniaPrivacyActDisclosureComponent } from './california-privacy-act-disclosure.component';

describe('CaliforniaPrivacyActDisclosureComponent', () => {
  let component: CaliforniaPrivacyActDisclosureComponent;
  let fixture: ComponentFixture<CaliforniaPrivacyActDisclosureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaliforniaPrivacyActDisclosureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaliforniaPrivacyActDisclosureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
