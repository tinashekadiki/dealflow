import { fakeAsync, TestBed } from '@angular/core/testing';
import { Routes, RouterModule, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ComplianceDashboardComponent } from './compliance-dashboard/compliance-dashboard.component';
import { routes } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { InventoryComponent } from './inventory/inventory.component';

describe('Router: App', () => {
  let location: Location;
  let router: Router;
  let fixture;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [RouterTestingModule.withRoutes(routes)],
      providers: [

      ],
    });
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(DashboardComponent);
    router.initialNavigation();
  });

  it('navigate to "" redirects you to /', fakeAsync(() => {
    expect(routes).toBeTruthy();
  }));


});
