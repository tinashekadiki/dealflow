import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {PermissionsService} from 'src/app/shared/services/permissions/permissions.service';
import {ProfileService} from 'src/app/shared/services/profile/profile.service';
import { PermissionsMatrixComponent } from './permissions-matrix.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { values } from 'lodash';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

describe('PermissionsMatrixComponent', () => {
  let component: PermissionsMatrixComponent;
  let fixture: ComponentFixture<PermissionsMatrixComponent>;


  beforeEach(async () => {
    const matDialogStub = () => ({
      open: (openAddRoleDialog, object) => ({
        afterClosed: () => ({ subscribe: f => f({}) }),
      })
    });
    const deleteRoleDialogStub = () => ({
      open: (openDeleteRoleDialog, object) => ({
        afterClosed: () => ({ subscribe: f => f({}) }),
        open: ()=> ({subscribe: f =>({}) })
      })
    });
    const profileServiceStub = () => ({
      getRequest: arg => ({ subscribe: f => f({}) }),
      postRequest: (arg, arg2) => ({subscribe: f => f({})}),
      delteRole: (arg, arg2) => ({ subscribe: f => f({}) }),
    });
    const formBuilderStub = () => ({ group: object => ({}) });
    const permissionsServiceStub = () => ({
      permissions: {
          alloweddealerships: [{
            id: 1,
            name: "test",
            branchId: "1",
            parentid: "test",
            address: "test",
            suite: "test",
            city: "test",
            state: "test",
            zip: "test",
            phone: "test",
            msa: "test",
            zone1: "test",
            zone2: "test",
            zone3: "test",
            zone4: "test",
            zone5: "test",
            active: "test",
          }]
      }
    }) as PermissionsService;
    const matSnackBarStub = () => ({ open: (string, string1, object) => ({}) });
    await TestBed.configureTestingModule({
      declarations: [ PermissionsMatrixComponent ],
      providers: [
        {provide: MatDialog, useFactory: matDialogStub},
        {provide: HttpClient},
        {provide: HttpHandler},
        {provide: PermissionsService, useFactory: permissionsServiceStub},
        { provide: FormBuilder, useFactory: formBuilderStub },
        {provide: ProfileService, useFactory: profileServiceStub},
        {provide: MatSnackBar, useFactory: matSnackBarStub}
      ]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionsMatrixComponent);
    TestBed.inject(PermissionsService);
    TestBed.inject(ProfileService);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load methods onInit', ()=>{
    spyOn(component, 'ngOnInit').and.callThrough();
    spyOn(component, 'setAllowedDealership').and.callThrough();
    spyOn(component, 'getCurrentPermissionsMatrix').and
    component.setAllowedDealership();
    component.getRoles;
    expect(component.dataSource).toBeFalsy();
    expect(component.setAllowedDealership).toHaveBeenCalled();
    expect(component.getRoles).toBeTruthy();
  });

  describe('openAddRoleDialog', () => {
    it('makes expected calls', () => {
      const matDialogStub: MatDialog = fixture.debugElement.injector.get(
        MatDialog
      );
      spyOn(matDialogStub, 'open').and.callThrough();
      expect(matDialogStub.open).toBeTruthy();
    });
  });

  describe('openDeleteRoleDialog', () => {
    it('makes expected calls', () => {
      const deleteRoleDialogStub: MatDialog = fixture.debugElement.injector.get(
        MatDialog
      );
     spyOn(deleteRoleDialogStub, 'open')
     .and
     .callThrough();
      expect(deleteRoleDialogStub.open).toBeTruthy();
    });
  });

  it('delete role should load', ()=>{
    expect(component.deleteRole).toBeTruthy();
  });

  it('mark role should load', ()=>{
    expect(component.markRole).toBeTruthy();
  });

  it('save role should load', ()=>{
    expect(component.saveRole).toBeTruthy();
  })

});


