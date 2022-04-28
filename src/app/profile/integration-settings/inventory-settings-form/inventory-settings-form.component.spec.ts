import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventorySettingsFormComponent } from './inventory-settings-form.component';

describe('InventorySettingsFormComponent', () => {
  let component: InventorySettingsFormComponent;
  let fixture: ComponentFixture<InventorySettingsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventorySettingsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventorySettingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
