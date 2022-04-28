import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDocumentDocumentviewerComponent } from './customer-document-documentviewer.component';

describe('CustomerDocumentDocumentviewerComponent', () => {
  let component: CustomerDocumentDocumentviewerComponent;
  let fixture: ComponentFixture<CustomerDocumentDocumentviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDocumentDocumentviewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDocumentDocumentviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
