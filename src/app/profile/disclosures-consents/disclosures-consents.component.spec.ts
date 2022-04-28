import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisclosuresConsentsComponent } from './disclosures-consents.component';

describe('DisclosuresConsentsComponent', () => {
  let component: DisclosuresConsentsComponent;
  let fixture: ComponentFixture<DisclosuresConsentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisclosuresConsentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisclosuresConsentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
