import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PermissionsService } from 'src/app/shared/services/permissions/permissions.service';
import { ProfileService } from 'src/app/shared/services/profile/profile.service';
import { AddRoleComponent } from './add-role.component';

describe('AddRoleComponent', () => {
  let component: AddRoleComponent;
  let fixture: ComponentFixture<AddRoleComponent>;

  beforeEach(() => {
    const formBuilderStub = () => ({
      group: object => ({
        get: object => {
          return {
            value: 'Cool'
          }
        }
    }) });
    const permissionsServiceStub = () => ({
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
    });
    const profileServiceStub = () => ({ permissions: {} });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AddRoleComponent],
      providers: [
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: PermissionsService, useFactory: permissionsServiceStub },
        { provide: ProfileService, useFactory: profileServiceStub }
      ]
    });
    fixture = TestBed.createComponent(AddRoleComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`selectedPermissions has default value`, () => {
    expect(component.selectedPermissions).toEqual([]);
  });


  it(`selectPermisiion select a specific permission`, () => {
    component.selectPermission('New Perm')
    expect(component.selectedPermissions.length).toBeGreaterThan(0);
  });


  it(`isAlreadySelected check if permission isAlreadySelected`, () => {
    component.selectPermission('New Perm')
    expect(component.isAlreadySelected('New Perm')).toBeTrue;
    expect(component.isAlreadySelected('New Perm2')).toBeFalse;
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'setAllowedDealership').and.callThrough();
      component.ngOnInit();
      expect(component.setAllowedDealership).toHaveBeenCalled();
    });
  });

  xdescribe('generatePayload', () => {
    it('makes expected calls', () => {
      spyOn(component, 'isAlreadySelected').and.callThrough();
      component.setAllowedDealership();
      component.generatePayload();
      expect(component.isAlreadySelected).toHaveBeenCalled();
    });
  });

  xdescribe('close', () => {
    it('makes expected calls', () => {
      spyOn(component, 'generatePayload').and.callThrough();
      component.ngOnInit();
      component.close();
      expect(component.generatePayload).toHaveBeenCalled();
    });
  });
});
