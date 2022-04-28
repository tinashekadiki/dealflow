import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {AuthorizationService} from '../authorization/authorization.service';
import {ApplicationUser} from '../../models/authorization/authenticated_user';
import {uniq} from 'underscore';
import {concat} from 'lodash';
import {Branch} from '../../models/profile/profiles.model';
import {Role} from '../../models/profile/permissions.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly fetchUsersByBranch = environment.fetchUsersByBranch;
  readonly uploadUrl = environment.uploadUserUrl;
  private roles = environment.defaultRoles;

  constructor(private http: HttpClient, private auth: AuthorizationService) {
    this.initialise();
  }

  initialise(): void{
    this.fetchRoles();
  }

  fetchRoles(): Promise<string[]> {
    return this.getRolesByBranch().then(roles => {
      const fetchedRoles = roles.map(e => e.roleId);
      this.roles = concat(this.roles, fetchedRoles);
      this.roles = uniq(this.roles);
      return this.roles;
    });
  }

  get rolesList(): string[]{
    return this.roles;
  }

  public getUsers(): Promise<ApplicationUser[]> {
    return this.http.get<ApplicationUser[]>(`${this.fetchUsersByBranch}${this.auth.activeBranch.branchId}`).toPromise();
  }

  public fetchSingleUser(user: ApplicationUser): Observable<ApplicationUser> {
    return this.http.get<ApplicationUser>(`${environment.fetchUserUsingEmail}${this.auth.activeUser.organisationalId}/email/${user.emailAddress}`);
  }

  public getBranches(): Promise<Branch[]> {
    return this.http.get<Branch[]>(`${environment.getBranchesUrl}${this.auth.activeUser.organisationalId}`).toPromise();
  }

  public getRolesByBranch(): Promise<Role[]> {
    return this.http.get<Role[]>(`${environment.getRolesByBranch}${this.auth.getActiveBranch.branchId}`).toPromise();
  }

  public uploadUsers(data): Observable<any> {
    const organisationalId = this.auth.activeUser.organisationalId;
    let users: ApplicationUser[];
    users = data.map(user => ({
      firstName: user.First_Name,
      lastName: user.Last_Name,
      userId: 0,
      emailAddress: user.Email_Address,
      employeeId: '',
      enabled: true,
      department: user.Department,
      defaultBranchId: user.Default_Branch_Id,
      defaultRole: user.Default_Role,
      phoneNumber: user.Cell_Phone,
      costCenter: user.Cost_Center,
      overrideperm: user.Override_Permission,
      region: user.Region,
      timeZone: user.Timezone,
      customCreateUserEmailText: user.Custom_Text_Email,
      baseRole: user.Default_Role,
      homeBranchId: user.Default_Branch_Id,
      organisationalId,
      customRoles: [
        {
          branchId: user.Default_Branch_Id,
          roleId: user.Default_Role
        }
      ]
    }));
    return this.http.post(environment.createBulkUsers, users);
  }
}
