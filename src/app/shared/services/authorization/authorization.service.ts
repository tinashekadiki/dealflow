import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {ApplicationUser, CustomRole, User} from '../../models/authorization/authenticated_user';
import {SecureStorageService} from '../secure-storage/secure-storage.service';

const LS_USER = 'user';
const LS_TOKEN = 'accessToken';
const LS_ACTIVE_BRANCH = 'activeBranch';

@Injectable()
export class AuthorizationService {
  public userAccessToken: string;
  public user: ApplicationUser;
  public activeBranch: CustomRole;
  public userBranchList: any[];
  public isLoadingBranchList = false;

  constructor(private httpClient: HttpClient, private secureStorage: SecureStorageService) {
    this.initialize();
  }

  initialize(): void {
    this.user = JSON.parse(this.secureStorage.getItem(LS_USER));
    this.activeBranch = JSON.parse(this.secureStorage.getItem(LS_ACTIVE_BRANCH));
    this.userAccessToken = this.secureStorage.getItem(LS_TOKEN);
    // this.getFullBranchList();
  }

  setAccessToken(accessTokenP: string): void {
    this.userAccessToken = accessTokenP;
    this.secureStorage.setItem(LS_TOKEN, this.userAccessToken);
  }


  setUser(user: ApplicationUser): void {
    this.user = user;
    this.secureStorage.setItem(LS_USER, user);
    this.getFullBranchList();
  }

  get activeUser(): ApplicationUser {
    return this.user !== undefined ? this.user : JSON.parse(this.secureStorage.getItem(LS_USER));
  }

  updateUserInfo(): Promise<ApplicationUser> {
    return this.httpClient.get<ApplicationUser>(environment.retrieveCurrentUser)
      .toPromise().then((authenticatedUser) => {
        this.setUser(authenticatedUser);
        return authenticatedUser;
      });
  }

  getPermissions(): Observable<User> {
    return this.httpClient.get<User>(environment.userValidationUrl)
      .pipe(map((data: any) => {
        this.setPermissions(data);
        return data;
      }));
  }

  setPermissions(user: User): void {
    this.secureStorage.setItem('permissions', user);
  }

  get permissions(): any {
    return (this.secureStorage.getItem('permissions') != null
      && this.secureStorage.getItem('permissions').length > 0) ?
      JSON.parse(this.secureStorage.getItem('permissions')) : '';
  }


  getPermissionsN(): Observable<ApplicationUser> {
    return this.httpClient.get<ApplicationUser>(environment.userValidationUrl)
      .pipe(map((data: ApplicationUser) => {
        this.setUser(data);
        return data;
      }));
  }

  setActiveBranch(branchData: CustomRole): void {
    this.activeBranch = branchData;
    this.secureStorage.setItem(LS_ACTIVE_BRANCH, branchData);
  }

  get getActiveBranch(): CustomRole {
    return this.activeBranch !== undefined ? this.activeBranch :
      JSON.parse(this.secureStorage.getItem(LS_ACTIVE_BRANCH));
  }

  updateBranch(branchId: string): any {
    let newCustomRole = this.user.customRoles.find(val => val.branchId === branchId);
    if (newCustomRole === undefined) {
      if (this.user.defaultBranchId === branchId){
        newCustomRole = {branchId: this.user.defaultBranchId, roleId: this.user.defaultRole}
      }else{
        return;
      }
    }
    this.setActiveBranch(newCustomRole);
  }

  getFullBranchList(): void {
    if (!this.user) { return; }
    this.isLoadingBranchList = true;
    const orgBranchList = this.user?.customRoles?.map((cR) => {
      return {branchId: cR.branchId, organisationalId: this.user.organisationalId};
    });
    this.httpClient.post(environment.getBranchListByOrgIdBranchIdUrl, orgBranchList).subscribe((branchList: []) => {
      this.userBranchList = branchList.filter(value => value != null);
      this.isLoadingBranchList = false;
    });
  }

  isUserLoggedIn(): boolean {
    return !!this.userAccessToken;
  }

  isAccessTokenExpired(): boolean {
    console.log(this.tokenExpired(this.userAccessToken));
    return this.tokenExpired(this.userAccessToken);
  }

  tokenExpired(token: string): boolean {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date()).getTime() / 1000)) >= expiry;
  }

  signOut(): void {
    this.user = undefined;
    this.activeBranch = undefined;

    this.secureStorage.removeItem(LS_USER);
    this.secureStorage.removeItem(LS_ACTIVE_BRANCH);
    this.secureStorage.removeItem('permissions');
    this.secureStorage.removeItem(LS_TOKEN);
  }
}
