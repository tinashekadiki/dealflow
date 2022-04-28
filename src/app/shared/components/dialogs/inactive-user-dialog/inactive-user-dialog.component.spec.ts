import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveUserDialogComponent } from './inactive-user-dialog.component';

describe('InactiveUserDialogComponent', () => {
  let component: InactiveUserDialogComponent;
  let fixture: ComponentFixture<InactiveUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InactiveUserDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InactiveUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
