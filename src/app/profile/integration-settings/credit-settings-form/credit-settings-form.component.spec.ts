import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditSettingsFormComponent } from './credit-settings-form.component';

describe('CreditSettingsFormComponent', () => {
  let component: CreditSettingsFormComponent;
  let fixture: ComponentFixture<CreditSettingsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditSettingsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditSettingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
