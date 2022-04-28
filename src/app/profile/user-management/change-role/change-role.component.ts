import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ApplicationUser, CustomRole} from '../../../shared/models/authorization/authenticated_user';
import {UserService} from '../../../shared/services/user/user.service';
import {MatSelectChange} from '@angular/material/select';

@Component({
  selector: 'app-change-role',
  templateUrl: './change-role.component.html',
  styleUrls: ['./change-role.component.scss']
})
export class ChangeRoleComponent implements OnInit {
  user: ApplicationUser;
  detailedUser: ApplicationUser;
  roles: string[];
  error: string;
  loading: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.user = this.data.user;
    this.roles = this.userService.rolesList;
    this.fetchUserDetails(this.user);
  }

  fetchUserDetails(user: ApplicationUser): void {
    this.userService.fetchSingleUser(user).subscribe({
      next: detailedUser => {
        this.detailedUser = detailedUser;
        this.loading = false;
      },
      error: err => {
        this.error  = err.message;
      }
    });
  }

  updateSingleRole(role: CustomRole, event: MatSelectChange): void{
    const indexOfCurrentRole = this.detailedUser.customRoles.findIndex(e => e.branchId === role.branchId);
    this.detailedUser.customRoles[indexOfCurrentRole].roleId = event.value;
  }
}
