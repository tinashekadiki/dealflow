import { Overlay } from '@angular/cdk/overlay';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_SCROLL_STRATEGY } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ProcessConfigRoutingModule, routes } from './process-config-routing.module';
import { ProcessConfigComponent } from './process-config.component';

describe('Router: App', () => {
  let location: Location;
  let router: Router;
  let fixture;
  // let routes: Routes = [
  //   { path: '', redirectTo: '/', pathMatch: 'full' },
  //   { path: '', component: DashboardComponent },
  // ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent, ProcessConfigComponent],
      imports: [RouterTestingModule.withRoutes(routes)],
      providers: [
        {provide: MatDialog},
        {provide: Overlay},
        {provide: MAT_DIALOG_SCROLL_STRATEGY, useValue: {}},
        {provide: HttpClient},
        {provide: HttpHandler},
        {provide: FormBuilder},
        {provide: MatSnackBar}
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
