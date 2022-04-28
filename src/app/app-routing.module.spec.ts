import { Location } from "@angular/common";
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { Router, Routes } from "@angular/router";
import { CallbackComponent } from "./login/callback/callback.component";
import { LoginComponent } from "./login/login.component";
import { ComplianceDashboardComponent } from "./dashboard/compliance-dashboard/compliance-dashboard.component";
import { InventoryComponent } from "./dashboard/inventory/inventory.component";
import { ProcessConfigComponent } from "./process-config/process-config.component";
import { ProfileComponent } from "./profile/profile.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AppComponent } from "./app.component";
import { AuthorizationService } from "./shared/services/authorization/authorization.service";
import { Injectable } from "@angular/core";
import { ComplianceService } from "./shared/services/compliance/compliance.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Overlay } from "@angular/cdk/overlay";
import { PermissionsService } from "./shared/services/permissions/permissions.service";
import { MatDialog, MAT_DIALOG_SCROLL_STRATEGY } from "@angular/material/dialog";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { FormBuilder, FormsModule } from "@angular/forms";
import { MatMenuModule } from "@angular/material/menu";
import { routes } from './app-routing.module'
import { AuthGuard } from "./shared/guards/auth.guard";

@Injectable({ providedIn: 'root' })
class AuthServiceStub { };

@Injectable({ providedIn: 'root' })
class ComplianceServiceStub { };

@Injectable({ providedIn: 'root' })
class AuthGuardStub { };

@Injectable({ providedIn: 'root' })
class PermissionsServiceStub {
    permissions: {
        allowedddealerships: ['test1', 'test2']
    }
};

describe('Router: App', () => {

    let location: Location;
    let router: Router;
    let fixture;
    let appRoutes: Routes = [
        { path: '', redirectTo: '/', pathMatch: 'full' },
        { path: '', component: DashboardComponent },
        { path: 'login', component: LoginComponent },
        { path: 'compliance-dashboard', component: ComplianceDashboardComponent },
        { path: 'inventory-list', component: InventoryComponent },
        { path: 'process-config', component: ProcessConfigComponent },
        { path: 'profile', component: ProfileComponent },
    ];
    let permissionsServiceStub = new PermissionsServiceStub();

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                LoginComponent,
                CallbackComponent,
                ComplianceDashboardComponent,
                InventoryComponent,
                ProcessConfigComponent,
                ProfileComponent,
                DashboardComponent,
                AppComponent
            ],
            imports: [
                RouterTestingModule.withRoutes(appRoutes),
                FormsModule,
                MatMenuModule
            ],
            providers: [
                { provide: AuthorizationService, useClass: AuthServiceStub },
                { provide: ComplianceService, useClass: ComplianceServiceStub },
                {
                    provide: PermissionsService, useValue: {
                        permissions: {
                            allowedddealerships: ['test1', 'test2']
                        }
                    }
                },
                { provide: MatSnackBar },
                { provide: Overlay },
                { provide: MatDialog },
                { provide: MAT_DIALOG_SCROLL_STRATEGY, useValue: {} },
                { provide: HttpClient },
                { provide: HttpHandler },
                { provide: FormBuilder },
                { provide: AuthGuard}
            ]
        });
        router = TestBed.inject(Router);
        location = TestBed.inject(Location);
        permissionsServiceStub = TestBed.inject(PermissionsServiceStub)
        fixture = TestBed.createComponent(AppComponent);
        router.initialNavigation();
    });

    it('navigate to "" redirects you to /', fakeAsync(() => {
        expect(routes).toBeTruthy();
    }));

    it('navigate to "" redirects you to /', fakeAsync(() => {
        router.navigate(['']);
        tick();
        expect(location.path()).toBe('/');
        expect(routes[0].loadChildren).toBeTruthy();
    }));

    it('navigate to "login" redirects you to /login', fakeAsync(() => {
        router.navigate(['login']);
        tick();
        expect(location.path()).toBe('/login');
    }));

    it('navigate to "compliance-dashboard" redirects you to /compliance-dashboard', fakeAsync(() => {
        router.navigate(['compliance-dashboard']);
        tick();
        expect(location.path()).toBe('/compliance-dashboard');
    }));

    it('navigate to "inventory-list" redirects you to /inventory-list', fakeAsync(() => {
        router.navigate(['inventory-list']);
        tick();
        expect(location.path()).toBe('/inventory-list');
    }));

    it('navigate to "process-config" redirects you to /process-config', fakeAsync(() => {
        router.navigate(['process-config']);
        tick();
        expect(location.path()).toBe('/process-config');
        expect(routes[4].loadChildren).toBeTruthy();
    }));

    it('navigate to "profile" redirects you to /profile', fakeAsync(() => {
        router.navigate(['profile']);
        tick();
        expect(location.path()).toBe('/profile');
        expect(routes[3].loadChildren).toBeTruthy();
    }));
});