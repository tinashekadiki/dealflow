import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VinSettingsFormComponent } from './vin-settings-form.component';

describe('VinSettingsFormComponent', () => {
  let component: VinSettingsFormComponent;
  let fixture: ComponentFixture<VinSettingsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VinSettingsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VinSettingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
