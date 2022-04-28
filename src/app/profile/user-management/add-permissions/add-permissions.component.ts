import { Component, Inject, OnInit } from '@angular/core';
import {AddUserDialogComponent} from '../add-user-dialog/add-user-dialog.component';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PermissionsService } from 'src/app/shared/services/permissions/permissions.service';

@Component({
  selector: 'app-add-permissions',
  templateUrl: './add-permissions.component.html',
  styleUrls: ['./add-permissions.component.scss']
})
export class AddPermissionsComponent implements OnInit {
  allPermissions: any[];
  selectedPermissions = [
  ];

  permissionsData: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private permissionsService: PermissionsService) { }

  ngOnInit(): void {
    this.allPermissions = this.permissionsService.permissions;
    this.permissionsData = {
      user: this.data.user,
      permissions: this.selectedPermissions
    };
  }

  checkPermission(permissionCode: string): boolean {
    return this.selectedPermissions.includes(permissionCode);
  }

  togglePermission(permissionCode, field): void{
    if (!this.selectedPermissions.includes(permissionCode)){
      this.selectedPermissions.push(permissionCode);
    }
    else {
      this.selectedPermissions.splice(this.selectedPermissions.indexOf(permissionCode), 1);
    }
    console.log(this.selectedPermissions);
    this.permissionsData.permissions = this.selectedPermissions
    this.ngOnInit();
  }

}
