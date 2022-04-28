import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TcpaDisclosureComponent } from './tcpa-disclosure.component';

describe('TcpaDisclosureComponent', () => {
  let component: TcpaDisclosureComponent;
  let fixture: ComponentFixture<TcpaDisclosureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TcpaDisclosureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TcpaDisclosureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
