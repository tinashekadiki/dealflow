import {Component, Inject, OnInit} from '@angular/core';
import {Permission, iPermission} from '../../../shared/models/profile/permissions.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PermissionsService} from '../../../shared/services/permissions/permissions.service';
import {SnackBarNotificationService} from '../../../shared/services/snack-bar-notification/snack-bar-notification.service';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss']
})
export class EditRoleComponent implements OnInit {
  selectedPermissions = [];
  defaultPermissions = [];
  permissions: iPermission[];
  roleName: string;
  loading: boolean;
  permissionDeleted: string;
  viewSettingsPermissions = [];
  manageUserAccessPermissions = [];
  viewSettings = false;
  manageUserAccess = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private permissionsService: PermissionsService,
              private snackBar: SnackBarNotificationService,
              private dialogRef: MatDialogRef<EditRoleComponent>) {
    this.permissions = this.data.permissions;
    this.defaultPermissions = this.permissions.filter((item) => !item.hidden && item.parent !== 'View / Modify Settings' && item.parent !== 'Manage User Access');
    this.roleName = this.data.role;
    this.selectedPermissions = this.data.currentRolePermissions;
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

  ngOnInit(): void {
    this.loading = false;
  }

  get formattedRoleName(): string{
    return this.roleName.split('_').join(' ').toLowerCase();
  }

  saveNewRole(): any{
    
    const roleId = this.roleName.split(' ').join('_').toUpperCase().substr(0, 16);
    const permissionMapList = this.selectedPermissions.map((permissionId) => {
      return {
        roleId,
        permissionId
      };
    });
    return {
      roleName: this.roleName,
      permissionMapList
    };
  }

  updateList(permissionId: string): void{
    const index = this.selectedPermissions.indexOf(permissionId);
    if (index > -1){
      console.log("Removing permission: ", permissionId);
      this.selectedPermissions.splice(index, 1);
      this.deleteRolePermissions(permissionId);
    }
    else {
      console.log("Adding permission: ", permissionId);
      this.selectedPermissions.push(permissionId);
    }
  }

  deleteRolePermissions(permissionId: string): void{
    this.loading = true;
    this.permissionsService.deleteRolePermission(this.roleName, permissionId).then(res => {
      // this.snackBar.displayMessage(res);
    }).catch(error => {
      this.snackBar.displayError(error);
    }).finally(() => {
      this.loading = true;
    });
  }

  close(): void{
    this.dialogRef.close(false);
  }

  changeViewSettings(event: any): void {
    if (!event.checked) {
      console.log('TO delete ALL');
      this.viewSettingsPermissions.forEach((setting) => {
        // remove them all using updateList
        const index = this.selectedPermissions.indexOf(setting.permissionId);
        if (index > -1) {
          this.selectedPermissions.splice(index, 1);
        } 
        this.deleteRolePermissions(setting.permissionId);
      });
    } else {
      // add them all using updateList
      console.log('TO add ALL');
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
        } 
        this.deleteRolePermissions(setting.permissionId);
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
}
