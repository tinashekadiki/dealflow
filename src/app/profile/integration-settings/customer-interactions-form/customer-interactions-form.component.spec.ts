import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerInteractionsFormComponent } from './customer-interactions-form.component';

describe('CustomerInteractionsFormComponent', () => {
  let component: CustomerInteractionsFormComponent;
  let fixture: ComponentFixture<CustomerInteractionsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerInteractionsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerInteractionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
