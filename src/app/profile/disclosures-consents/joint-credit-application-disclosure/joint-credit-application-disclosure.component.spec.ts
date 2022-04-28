import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JointCreditApplicationDisclosureComponent } from './joint-credit-application-disclosure.component';

describe('JointCreditApplicationDisclosureComponent', () => {
  let component: JointCreditApplicationDisclosureComponent;
  let fixture: ComponentFixture<JointCreditApplicationDisclosureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JointCreditApplicationDisclosureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JointCreditApplicationDisclosureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
