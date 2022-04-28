import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdkSettingsFormComponent } from './cdk-settings-form.component';

describe('CdkSettingsFormComponent', () => {
  let component: CdkSettingsFormComponent;
  let fixture: ComponentFixture<CdkSettingsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CdkSettingsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdkSettingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
