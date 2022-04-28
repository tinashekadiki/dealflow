import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnovisComponent } from './innovis.component';

describe('InnovisComponent', () => {
  let component: InnovisComponent;
  let fixture: ComponentFixture<InnovisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InnovisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InnovisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
