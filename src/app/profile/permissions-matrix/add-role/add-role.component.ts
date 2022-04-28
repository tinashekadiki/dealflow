import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PermissionsService } from 'src/app/shared/services/permissions/permissions.service';
import {
  Permission,
  iPermission,
} from '../../../shared/models/profile/permissions.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss'],
})
export class AddRoleComponent implements OnInit {
  selectedPermissions = [];
  defaultPermissions = [];
  permissions: iPermission[];
  uPermissions = [];
  roleForm: FormGroup;
  viewSettingsPermissions = [];
  manageUserAccessPermissions = [];
  viewSettings = false;
  manageUserAccess = false;

  constructor(
    private permissionsService: PermissionsService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any, @Inject(DOCUMENT) private document
  ) {
    this.roleForm = this.formBuilder.group({
      role: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.permissions = this.data.permissions;
    this.defaultPermissions = this.permissions.filter((item) => !item.hidden && item.parent !== 'View / Modify Settings' && item.parent !== 'Manage User Access');
    let filteredPermissions = this.permissions.filter((item) => item.hidden);
    this.selectedPermissions = filteredPermissions.map((item) => {
      if (item.parent !== ('View / Modify Settings' || 'Manage User Access')) {
        if (item.hidden) return item.permissionId;
      }
    });
    this.viewSettingsPermissions = this.permissions.filter(
      (item) => (item.parent === 'View / Modify Settings')
    );
    this.manageUserAccessPermissions = this.permissions.filter(
      (item) => (item.parent === 'Manage User Access')
    );
    console.log('View Settings permissions at load: ', this.viewSettingsPermissions);
    console.log('Manage User Access permissions at load', this.manageUserAccessPermissions);
    console.log('Selected permissions at load', this.selectedPermissions);
  }

  changeViewSettings(event: any): void {
    if (!event.checked) {
      this.viewSettingsPermissions.forEach((setting) => {
        // remove them all from the selectedPermissions Array
        const index = this.selectedPermissions.indexOf(setting.permissionId);
        if (index > -1) {
          this.selectedPermissions.splice(index, 1);
        } else {
          this.selectedPermissions.push(setting.permissionId);
        }
      });
    } else {
      // add them all to the selectedPermissions Array
      let viewSettingsArray = this.viewSettingsPermissions.map((el) => {
        return el.permissionId;
      });
      console.log(viewSettingsArray);
      this.selectedPermissions = [...this.selectedPermissions, ...viewSettingsArray];
    }
    console.log("Changed View Settings: ", this.selectedPermissions);
  }

  changeManageUserAccess(event: any): void {
    if (!event.checked) {
      this.manageUserAccessPermissions.forEach((setting) => {
        // remove them all from the selectedPermissions Array
        const index = this.selectedPermissions.indexOf(setting.permissionId);
        if (index > -1) {
          this.selectedPermissions.splice(index, 1);
        } else {
          this.selectedPermissions.push(setting.permissionId);
        }
      });
    } else {
      // add them all to the selectedPermissions Array
      let userAccessArray = this.manageUserAccessPermissions.map((el) => {
        return el.permissionId;
      });
      console.log(userAccessArray);
      this.selectedPermissions = [...this.selectedPermissions, ...userAccessArray];
    }
    console.log("Changed Manage Access: ", this.selectedPermissions);
  }

  close(): any {
    if (this.roleForm.get('role').value.length) {
      return this.saveNewRole(this.roleForm.get('role').value);
    }
  }

  saveNewRole(roleName: string): any {
    const roleId = roleName.split(' ').join('_').toUpperCase().substr(0, 16);
    const permissionMapList = this.selectedPermissions.map((permissionId) => {
      return {
        roleId,
        permissionId,
      };
    });
    return {
      roleName,
      permissionMapList,
    };
  }

  updateList(permissionId: string): void {
    const index = this.selectedPermissions.indexOf(permissionId);
    if (index > -1) {
      this.selectedPermissions.splice(index, 1);
    } else {
      this.selectedPermissions.push(permissionId);
    }
    console.log('Selected permissions after changes', this.selectedPermissions);
  }

  hidePanel(id:string): void {
    let p = 'permission_' + id;

    let panel = this.document.getElementById(p);

    panel.className += 'hidden';
  }
}
