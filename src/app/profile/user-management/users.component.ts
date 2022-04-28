import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddUserDialogComponent} from './add-user-dialog/add-user-dialog.component';
import {BulkUploadUsersComponent} from './bulk-upload-users/bulk-upload-users.component';
import {UserService} from '../../shared/services/user/user.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {AddPermissionsComponent} from './add-permissions/add-permissions.component';
import {ProfileService} from 'src/app/shared/services/profile/profile.service';
import {ApplicationUser, CustomRole} from '../../shared/models/authorization/authenticated_user';
import {ChangeRoleComponent} from './change-role/change-role.component';
import {SnackBarNotificationService} from '../../shared/services/snack-bar-notification/snack-bar-notification.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email', 'action'];
  users: Array<ApplicationUser>;
  dataSource: MatTableDataSource<ApplicationUser>;
  isLoading = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog,
              public userService: UserService,
              public snackBar: SnackBarNotificationService,
              private profileService: ProfileService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }


  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      const defaultCustomRole: CustomRole = {
        roleId: result.defaultRole,
        branchId: result.defaultBranchId
      };
      result.customRoles.push(defaultCustomRole);
      this.handleNewUserForm(result);
    });
  }

  changeRole(user: ApplicationUser): void {
    const dialogRef = this.dialog.open(ChangeRoleComponent, {
      width: '450px',
      data: {
        user
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== null){
        this.updateUserRoles(result);
      }
    });
  }

  openBulkUploadUsersDialog(): void {
    this.dialog.open(BulkUploadUsersComponent);
  }

  openAddPermissionsDialog(user: any): void {
    this.dialog.open(AddPermissionsComponent, {
      data: {
        user
      }
    });
  }

  getUsers(): void {
    this.isLoading = true;
    this.userService.getUsers().then(data => {
        this.users = data;
        this.dataSource = new MatTableDataSource<ApplicationUser>(this.users);
        this.dataSource.paginator = this.paginator;
        this.snackBar.displayMessage('Users retrieved successfully');
      }).catch(error => {
        this.snackBar.displayError(`Failed to load users. Reason ${error.message}`);
      }).finally(() => {
      this.isLoading = false;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleNewUserForm(user: ApplicationUser): void {
    this.profileService.saveUserDMS(user).then(data => {
        this.getUsers();
        this.snackBar.displayMessage(data.toString());
      }).catch(error => {
        this.snackBar.displayError(error.error);
    });
  }

  updateUserRoles(user: ApplicationUser): void {
    this.profileService.updateUserDMS(user).subscribe(data => {
        this.snackBar.displayMessage(data.toString());
      },
      error => {
        if (error.status === 403){
          this.snackBar.displayError('You are not authorised to update a user to this/these role(s).');
        }
        this.snackBar.displayError(JSON.parse(error.error).errorDescription);
      });
  }
}

