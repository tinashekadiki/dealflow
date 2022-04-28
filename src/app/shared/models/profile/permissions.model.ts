import {Branch} from './profiles.model';

export interface Role {
  roleId: string;
  branch: Branch;
  userPermission: Permission;
  roleName: string;
}

export interface Permission {
  permissionId: string;
  permissionName: string;
  permissionDescription: string;
}

export interface CustomRoleMap {
  branchId?: string;
  roleName?: string;
  permissionMapList?: PermissionMapList[];
}

export interface PermissionMapList {
  roleId?: string;
  permissionId?: string;
}

export interface iPermission extends Permission {
  parent?: string;
  hidden?: boolean;
}
