import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectIdVerifierDialogComponent } from './select-id-verifier-dialog.component';

describe('SelectIdVerifierDialogComponent', () => {
  let component: SelectIdVerifierDialogComponent;
  let fixture: ComponentFixture<SelectIdVerifierDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectIdVerifierDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectIdVerifierDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
