import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerTrackComponent } from './dealer-track.component';

describe('DealerTrackComponent', () => {
  let component: DealerTrackComponent;
  let fixture: ComponentFixture<DealerTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerTrackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
