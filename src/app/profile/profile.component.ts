import {Component, OnInit} from '@angular/core';
import {ApplicationUser, CustomRole} from '../shared/models/authorization/authenticated_user';
import {AuthorizationService} from '../shared/services/authorization/authorization.service';
import {Branch} from '../shared/models/profile/profiles.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(public authorizationService: AuthorizationService) {
  }

  ngOnInit(): void {
    console.log(this.activeBranch);
  }

  get applicationUser(): ApplicationUser {
    return this.authorizationService.activeUser;
  }

  get activeBranch(): CustomRole{
    return this.authorizationService.activeBranch;
  }

  get fullBranchDetails(): Branch{
      if (this.authorizationService.userBranchList === undefined) {
        return null;
      }
      return this.authorizationService.userBranchList?.find((branch: any) => {
        return branch?.branchId === this.authorizationService.activeBranch?.branchId;
      });
  }
}
