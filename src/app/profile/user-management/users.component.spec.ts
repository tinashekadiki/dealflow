import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../shared/services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileService } from 'src/app/shared/services/profile/profile.service';
import { PermissionsService } from 'src/app/shared/services/permissions/permissions.service';
import { UsersComponent } from './users.component';
import { AuthorizationService } from 'src/app/shared/services/authorization/authorization.service';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let authorizationService: AuthorizationService;

  beforeEach(() => {
    const matDialogStub = () => ({
      open: (addUserDialogComponent, object) => ({
        afterClosed: () => ({ subscribe: f => f({}) })
      })
    });
    const userServiceStub = () => ({
      getUsers: () => ({ subscribe: f => f({}) })
    });
    const matSnackBarStub = () => ({ open: (string, string1, object) => ({}) });
    const profileServiceStub = () => ({
      postRequest: (string, string1, data) => ({ subscribe: f => f({}) })
    });
    const permissionsServiceStub = () => ({
      permissions: { alloweddealerships: {} },
      allPermission: { forEach: () => ({}) }
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [UsersComponent],
      providers: [
        { provide: MatDialog, useFactory: matDialogStub },
        { provide: UserService, useFactory: userServiceStub },
        { provide: MatSnackBar, useFactory: matSnackBarStub },
        { provide: ProfileService, useFactory: profileServiceStub },
        { provide: PermissionsService, useFactory: permissionsServiceStub },
        {provide: AuthorizationService, useValue: {
          permissions: {
            alloweddealerships: [
              {
                "id": null,
                "name": "Hard Coded Dealer Name",
                "branchId": "234024",
                "parentid": null,
                "address": null,
                "suite": null,
                "city": null,
                "state": null,
                "zip": null,
                "phone": null,
                "msa": null,
                "zone1": null,
                "zone2": null,
                "zone3": null,
                "zone4": null,
                "zone5": null,
                "active": null
            }
            ]
          }
        }},
      ]
    });
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    authorizationService = TestBed.inject(AuthorizationService);

  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`displayedColumns has default value`, () => {
    expect(component.displayedColumns).toEqual([
      `id`,
      `first_name`,
      `last_name`,
      `email`,
      `action`
    ]);
  });

  it(`isLoadingData has default value`, () => {
    expect(component.isLoading).toEqual(false);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      // spyOn(component, 'setAllowedDealership').and.callThrough();
      spyOn(component, 'getUsers').and.callThrough();
      component.ngOnInit();
      // expect(component.setAllowedDealership).toHaveBeenCalled();
      expect(component.getUsers).toHaveBeenCalled();
    });
  });

  describe('openAddUserDialog', () => {
    it('makes expected calls', () => {
      const matDialogStub: MatDialog = fixture.debugElement.injector.get(
        MatDialog
      );
      // component.allowedDealership = {
      //   "id": null,
      //   "name": "Hard Coded Dealer Name",
      //   "branchid": "234024",
      //   "parentid": null,
      //   "address": null,
      //   "suite": null,
      //   "city": null,
      //   "state": null,
      //   "zip": null,
      //   "phone": null,
      //   "msa": null,
      //   "zone1": null,
      //   "zone2": null,
      //   "zone3": null,
      //   "zone4": null,
      //   "zone5": null,
      //   "active": null
      // }
      spyOn(component,'openAddUserDialog' ).and.callThrough()
      spyOn(component, 'saveUser').and.callThrough();
      spyOn(matDialogStub, 'open').and.callThrough();
      component.openAddUserDialog();
      expect(component.saveUser).toHaveBeenCalled();
      expect(matDialogStub.open).toHaveBeenCalled();
    });
  });

  describe('generatePermissionsArray', () => {
    it('makes expected calls', () => {
      expect(component.generatePermissionsArray(['setting'])).toBeTruthy
    })
  });
  describe('saveUserPermissions', () => {
    it('makes expected calls', () => {
      // const matDialogStub: MatDialog = fixture.debugElement.injector.get(
      //   MatDialog
      // );
      // spyOn(matDialogStub, 'open').and.callThrough();
      expect(component.saveUserPermissions(['setting'], { first_name: "Blessing", last_name: 'jmaes' })).toBeTruthy


    })
  });


  describe('openBulkUploadUsersDialog', () => {
    it('makes expected calls', () => {
      const matDialogStub: MatDialog = fixture.debugElement.injector.get(
        MatDialog
      );
      spyOn(matDialogStub, 'open').and.callThrough();
      component.openBulkUploadUsersDialog();
      expect(matDialogStub.open).toHaveBeenCalled();
    });
  });

  describe('getUsers', () => {
    it('makes expected calls', () => {
      const userServiceStub: UserService = fixture.debugElement.injector.get(
        UserService
      );
      const matSnackBarStub: MatSnackBar = fixture.debugElement.injector.get(
        MatSnackBar
      );
      spyOn(userServiceStub, 'getUsers').and.callThrough();
      spyOn(matSnackBarStub, 'open').and.callThrough();
      component.getUsers();
      expect(userServiceStub.getUsers).toHaveBeenCalled();
      expect(matSnackBarStub.open).toHaveBeenCalled();
    });
  });
});
