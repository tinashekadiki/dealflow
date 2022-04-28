import {Component, OnInit, TemplateRef, ContentChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddRoleComponent} from './add-role/add-role.component';
import {PermissionsService} from 'src/app/shared/services/permissions/permissions.service';
import {ProfileService} from 'src/app/shared/services/profile/profile.service';
import {Permission, Role, iPermission} from '../../shared/models/profile/permissions.model';
import {SnackBarNotificationService} from '../../shared/services/snack-bar-notification/snack-bar-notification.service';
import {DeleteRoleComponent} from './delete-role/delete-role.component';
import {uniq, where} from 'underscore';
import {EditRoleComponent} from './edit-role/edit-role.component';

@Component({
  selector: 'app-permissions-matrix',
  templateUrl: './permissions-matrix.component.html',
  styleUrls: ['./permissions-matrix.component.scss']
})

export class PermissionsMatrixComponent implements OnInit {
  permissions: Permission[];
  uPermissions: iPermission[];
  uniqueRoles: string[];
  roles: Role[];
  loading = false;

  constructor(private dialog: MatDialog,
              private profileService: ProfileService,
              private permissionsService: PermissionsService,
              private snackBar: SnackBarNotificationService) {
  }

  ngOnInit(): void {
    this.setDisplayColumns();
    this.getRoles();
  }

  openAddRoleDialog(): void {
    const addRoleDialogRef = this.dialog.open(AddRoleComponent, {
      width: '450px',
      data: {
        permissions: this.uPermissions
      }
    });
    addRoleDialogRef.afterClosed().subscribe(result => {
      this.saveRole(result);
    });
  }

  openEditRoleDialog(role: string): void {
    const currentRolePermissions =  this.rolePermissions(role);
    const editRoleDialogRef = this.dialog.open(EditRoleComponent, {
      width: '450px',
      data: {
        permissions: this.uPermissions,
        role,
        currentRolePermissions
      }
    });
    editRoleDialogRef.afterClosed().subscribe(result => {
      if (result !== false){
        this.saveRole(result);
      }
    });
  }

  openDeleteRoleDialog(): void {
    const deleteRoleDialogRef = this.dialog.open(DeleteRoleComponent, {
      width: '450px',
      data: {
        roles: this.uniqueRoles
      }
    });
    deleteRoleDialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  getRoles(): void {
    this.loading = true;
    this.permissionsService.getRolesByBranch().then(res => {
      this.setUniqueRoles(res);
      this.roles = res;
      this.snackBar.displayMessage('Roles retrieved');
    }).catch(error => {
      this.snackBar.displayMessage(error);
    }).finally(() => this.loading = false);
  }

  checkPermission(permissionId, roleId): boolean{
    let currentRolePermissions = where(this.roles, {roleId});
    currentRolePermissions = currentRolePermissions.map(role => role.userPermission.permissionId);
    return Boolean(currentRolePermissions.includes(permissionId));
  }

  rolePermissions(roleId): any[]{
    let currentRolePermissions = where(this.roles, {roleId});
    currentRolePermissions = currentRolePermissions.map(role => role.userPermission.permissionId);
    return  currentRolePermissions;
  }

  setUniqueRoles(roles: Role[]): void{
    const uniqueRoles = roles.map(role => {
      return role.roleId;
    });
    this.uniqueRoles = uniq(uniqueRoles);
  }

  saveRole(payload: any): void {
    this.loading = true;
    this.permissionsService.saveNewRole(payload).then(res => {
      this.snackBar.displayMessage(res);
      this.ngOnInit();
    }).catch(error => {
      this.snackBar.displayError(error);
    }).finally(() => this.loading = false);
  }

  setDisplayColumns(): void{
    if (!this.permissionsService.permissions.length){
      this.loading = true;
      this.permissionsService.getPermissions().then(res => {
        this.permissions = res;
        console.log(this.permissions);
        this.reformatPermissions(this.permissions);
        console.log('All reformatted permissions at load: ', this.uPermissions);
      }).catch(err => {
        this.snackBar.displayError(err.error);
      }).finally(() => this.loading = false);
    }
    else{
      this.permissions = this.permissionsService.permissions;
    }
  }

  reformatPermissions(permissions: Permission[]): void{
    this.uPermissions = permissions;
    this.uPermissions.forEach((item) => {

      switch (item.permissionName) {
        // rename on view
        case 'Digital Application':
          item.permissionName = 'Send Digital Application';
          break;
        case 'Archived Record':
          item.permissionName = 'View / Search Archived Record';
          break;
        case 'Push Application to Bank':
          item.permissionName = 'Send Application to Bank';
          break;
        case 'CRM Update':
          item.permissionName = 'Update CRM';
          break;
        case 'DMS Update':
          item.permissionName = 'Update DMS';
          break;
        case 'Process Configuration':
          item.permissionName = 'Configure Dealer Process';
          break;
        case 'Update Products':
          item.permissionName = 'Add / Update Products';
          break;
        case 'Blocked Profile Over-rides':
          item.permissionName = 'Approve Override Requests';
          break;
        case 'Price sheet view':
          item.permissionName = 'View Price Sheet';
          break;

        // hide from view
        case 'Login':
          item.hidden = true;
          break;
        case 'Payfone ID Verification':
          item.hidden = true;
          break;
        case 'Sentilink ID Verification':
          item.hidden = true;
          break;
        case 'Record Generation':
          item.hidden = true;
          break;
        case 'Add Trade':
          item.hidden = true;
          break;
        case 'View States':
          item.hidden = true;
          break;
        case 'View Time Zone':
          item.hidden = true;
          break;
        case 'Add Purchase Vehicle':
          item.hidden = true;
          break;

        // fold under parent View / Modify Settings
        case 'Branches view':
          item.parent = 'View / Modify Settings';
          break;
        case 'Branches modify':
          item.parent = 'View / Modify Settings';
          break;
        case 'Custom settings view':
          item.parent = 'View / Modify Settings';
          break;
        case 'Custom settings modify':
          item.parent = 'View / Modify Settings';
          break;
        case 'Desking settings view':
          item.parent = 'View / Modify Settings';
          break;
        case 'Desking settings modify':
          item.parent = 'View / Modify Settings';
          break;
        case 'General settings view':
          item.parent = 'View / Modify Settings';
          break;
        case 'General settings modify':
          item.parent = 'View / Modify Settings';
          break;
        case 'Integration settings view':
          item.parent = 'View / Modify Settings';
          break;
        case 'Integration settings modify':
          item.parent = 'View / Modify Settings';
          break;
        case 'Tag view':
          item.parent = 'View / Modify Settings';
          break;
        case 'Tag modify':
          item.parent = 'View / Modify Settings';
          break;

        // fold under parent Manage User Access
        case 'User management view':
          item.parent = 'Manage User Access';
          break;
        case 'User management modify':
          item.parent = 'Manage User Access';
          break;
        case 'User roles view':
          item.parent = 'Manage User Access';
          break;
        case 'User roles modify':
          item.parent = 'Manage User Access';
          break;
        case 'Permissions view':
          item.parent = 'Manage User Access';
          break;
        case 'Entitlements view':
          item.parent = 'Manage User Access';
          break;
        
        default:
          item.hidden = false;
      }

      console.log('Reformatted', item);
    });
  }

  appendToSettings(c: any): void{
    console.log("See c:", c);
    let s = document.getElementById('settings');
    s.insertAdjacentHTML('beforeend', c);
  }

  formattedRoleName(roleName: string): string{
    return roleName.split('_').join(' ').toLowerCase();
  }
}
