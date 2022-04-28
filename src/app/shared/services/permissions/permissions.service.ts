import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CustomRoleMap, Permission, Role} from '../../models/profile/permissions.model';
import {AuthorizationService} from '../authorization/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  permissions: Permission[] = [];
  constructor(private http: HttpClient, private auth: AuthorizationService) {
    this.setPermissions();
  }

  getRolesByBranch(): Promise<Role[]>{
    return this.http.get<Role[]>(`${environment.fetchRolesByBranch}/${this.auth.activeBranch.branchId}`).toPromise();
  }

  setPermissions(): void{
    this.getPermissions().then(res =>  {
      this.permissions = res;
    });
  }

  getPermissions(): Promise<Permission[]>{
    return this.http.get<Permission[]>(`${environment.getAllPermissions}`).toPromise();
  }

  saveNewRole(payLoad: CustomRoleMap): Promise<string>{
    payLoad = {
      ...payLoad,
      branchId: this.auth.activeBranch.branchId
    };
    return this.http.post(`${environment.saveNewRole}`, payLoad, {responseType: 'text'}).toPromise();
  }

  deleteRole(roleId: string): Promise<any>{
    return this.http.delete(`${environment.deleteRole}/${this.auth.activeBranch.branchId}/role/${roleId}`,
      {responseType: 'text'}).toPromise();
  }

  deleteRolePermission(roleId: string, permissionId: string): Promise<any>{
    return this.http.delete(`${environment.deleteRole}/${this.auth.activeBranch.branchId}/role/${roleId}/permission/${permissionId}`,
      {responseType: 'text'}).toPromise();
  }
}
