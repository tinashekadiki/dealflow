import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VAutoComponent } from './v-auto.component';

describe('VAutoComponent', () => {
  let component: VAutoComponent;
  let fixture: ComponentFixture<VAutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VAutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
