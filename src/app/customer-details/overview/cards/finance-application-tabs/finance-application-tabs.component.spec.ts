import { Overlay } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FinanceApplicationTabsComponent } from './finance-application-tabs.component';
import { CustomerProfile } from 'src/app/shared/models/customers/customer_profile';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthorizationService } from 'src/app/shared/services/authorization/authorization.service';
import { CustomerRecordsService } from 'src/app/shared/services/customer-records/customer-records.service';
import { HttpClient, HttpHandler } from '@angular/common/http';


describe('FinanceApplicationTabsComponent', () => {
  let component: FinanceApplicationTabsComponent;
  let fixture: ComponentFixture<FinanceApplicationTabsComponent>;
  let authorizationService: AuthorizationService;
  let customerRecordsService: CustomerRecordsService;
  let customerProfile: CustomerProfile;


  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [FinanceApplicationTabsComponent],
      providers: [
        { provide: MatSnackBar },
        { provide: Overlay },
        { provide: AuthorizationService },
        { provide: CustomerRecordsService },
        { provide: HttpHandler },
        { provide: HttpClient }
      ],
      imports: [FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(FinanceApplicationTabsComponent);
    component = fixture.componentInstance;
    authorizationService = TestBed.inject(AuthorizationService);
    customerRecordsService = TestBed.inject(CustomerRecordsService);
  }));

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });
});
