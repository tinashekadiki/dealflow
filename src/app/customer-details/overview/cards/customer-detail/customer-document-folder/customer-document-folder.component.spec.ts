import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDocumentFolderComponent } from './customer-document-folder.component';

describe('CustomerDocumentFolderComponent', () => {
  let component: CustomerDocumentFolderComponent;
  let fixture: ComponentFixture<CustomerDocumentFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDocumentFolderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDocumentFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
