import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationDisclosureDialogComponent } from './application-disclosure-dialog.component';

describe('ApplicationDisclosureDialogComponent', () => {
  let component: ApplicationDisclosureDialogComponent;
  let fixture: ComponentFixture<ApplicationDisclosureDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationDisclosureDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationDisclosureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
