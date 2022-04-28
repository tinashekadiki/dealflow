import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthorizationService } from '../../shared/services/authorization/authorization.service';
import { PermissionsService } from '../../shared/services/permissions/permissions.service';
import { Router } from '@angular/router';
import { IPermissions } from '../../shared/models/permissions/permissions';
import { AuthenticatedUser, User } from '../../shared/models/authorization/authenticated_user';
import { catchError } from 'rxjs/operators';
import { CallbackComponent } from './callback.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { Observable } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CallbackComponent', () => {
  let component: CallbackComponent;
  let fixture: ComponentFixture<CallbackComponent>;
  let authorizationService: AuthorizationService;
  let permissionsService: PermissionsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallbackComponent ],
      providers: [
        {provide: AuthorizationService},
        {provide: HttpClient},
        {provide: HttpHandler},
        {provide: MatSnackBar},
        {provide: Overlay}
      ],
      imports: [
        RouterTestingModule,
        NoopAnimationsModule]
    })
    .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component.isLoading).toBe(false);
  });

  afterAll(()=> {
    TestBed.resetTestingModule();
  });
});
