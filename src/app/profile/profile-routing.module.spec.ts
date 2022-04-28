/* tslint:disable:no-unused-variable */
import {Location} from '@angular/common';
import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import {routes} from './profile-routing.module';
import {PermissionsMatrixComponent} from './permissions-matrix/permissions-matrix.component';
import {ZonesComponent} from './zones/zones.component';
import {IntegrationsComponent} from './integration-settings/integrations.component';
import {NotificationsComponent} from './notification-settings/notifications.component';
import {ProductsComponent} from './products-settings/products.component';
import {UsersComponent} from './user-management/users.component';
import {DealerSettingsComponent} from './dealer-settings/dealer-settings.component';
import {SettingsComponent} from './account-settings/settings.component';
import {ProfileComponent} from './profile.component';
import {FormBuilder} from '@angular/forms';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Overlay} from '@angular/cdk/overlay';
import {MAT_DIALOG_SCROLL_STRATEGY, MatDialog} from '@angular/material/dialog';

describe('Router: App', () => {
  let location: Location;
  let fixture;
  let router: Router;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [PermissionsMatrixComponent,
        ZonesComponent, IntegrationsComponent,
        NotificationsComponent, ProductsComponent,
        UsersComponent, DealerSettingsComponent,
        SettingsComponent, ProfileComponent],
      providers: [FormBuilder, HttpClient, HttpHandler, MatSnackBar, Overlay,
        {provide: MatDialog},
        {provide: MAT_DIALOG_SCROLL_STRATEGY, useValue: {}}
      ]
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    fixture = TestBed.createComponent(ProfileComponent);
    router.initialNavigation();
  });

  it('navigate to "" redirects you to /account-settings', fakeAsync(() => {
    router.navigate(['']);
    tick();
    expect(location.path()).toBe('/account-settings');
  }));

  it('navigate to "account-settings" redirects you to /account-settings', fakeAsync(() => {
    router.navigate(['']);
    tick();
    expect(location.path()).toBe('/account-settings');
  }));

  it('navigate to "permissions-matrix" redirects you to /permissions-matrix', fakeAsync(() => {
    router.navigate(['permissions-matrix']);
    tick();
    expect(location.path()).toBe('/permissions-matrix');
  }));

  it('navigate to "dealer" redirects you to /dealer-account-settings', fakeAsync(() => {
    router.navigate(['dealer']);
    tick();
    expect(location.path()).toBe('/dealer');
  }));

  it('navigate to "user-management" redirects you to /user-management-component', fakeAsync(() => {
    router.navigate(['users']);
    tick();
    expect(location.path()).toBe('/user-management');
  }));

  it('navigate to "zones" redirects you to /user-management-component', fakeAsync(() => {
    router.navigate(['zones']);
    tick();
    expect(location.path()).toBe('/zones');
  }));

  it('navigate to "integration-settings" redirects you to /user-management-component', fakeAsync(() => {
    router.navigate(['integration-settings']);
    tick();
    expect(location.path()).toBe('/integration-settings');
  }));

});
