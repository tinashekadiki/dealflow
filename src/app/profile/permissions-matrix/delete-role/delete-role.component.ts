import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {PermissionsService} from '../../../shared/services/permissions/permissions.service';
import {SnackBarNotificationService} from '../../../shared/services/snack-bar-notification/snack-bar-notification.service';

@Component({
  selector: 'app-delete-role',
  templateUrl: './delete-role.component.html',
  styleUrls: ['./delete-role.component.scss']
})
export class DeleteRoleComponent implements OnInit {
  loading: boolean;
  deleted: boolean;
  deleting: boolean;
  rolesList: string[];
  currentRole: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private permissionsService: PermissionsService,
              private snackBar: SnackBarNotificationService) {
  }

  ngOnInit(): void {
    this.rolesList = this.data.roles;
  }

  deleteRole(role: string): void {
    this.loading = true;
    this.permissionsService.deleteRole(role).then(res => {
      this.snackBar.displayMessage(res.toString());
      this.deleted = true;
    }).catch(error => {
      this.deleted = false;
      this.snackBar.displayError(error);
    }).finally(() => this.loading = false);
  }
}
