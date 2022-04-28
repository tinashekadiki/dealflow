import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeskingComponent } from './desking.component';

describe('DeskingComponent', () => {
  let component: DeskingComponent;
  let fixture: ComponentFixture<DeskingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeskingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeskingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
