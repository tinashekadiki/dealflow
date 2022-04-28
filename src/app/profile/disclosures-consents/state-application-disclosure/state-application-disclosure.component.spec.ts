import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateApplicationDisclosureComponent } from './state-application-disclosure.component';

describe('StateApplicationDisclosureComponent', () => {
  let component: StateApplicationDisclosureComponent;
  let fixture: ComponentFixture<StateApplicationDisclosureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateApplicationDisclosureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StateApplicationDisclosureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
