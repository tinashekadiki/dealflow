import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ELeadSettingsFormComponent } from './e-lead-settings-form.component';

describe('EleadSettingsFormComponent', () => {
  let component: ELeadSettingsFormComponent;
  let fixture: ComponentFixture<ELeadSettingsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ELeadSettingsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ELeadSettingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
