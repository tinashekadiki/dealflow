import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFinanceTabsComponent } from './new-finance-tabs.component';

describe('NewFinanceTabsComponent', () => {
  let component: NewFinanceTabsComponent;
  let fixture: ComponentFixture<NewFinanceTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFinanceTabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFinanceTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
