import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeProcessDetailsComponent } from './change-process-details.component';

describe('ChangeProcessDetailsComponent', () => {
  let component: ChangeProcessDetailsComponent;
  let fixture: ComponentFixture<ChangeProcessDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeProcessDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeProcessDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
