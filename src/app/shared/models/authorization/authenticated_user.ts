export interface User {
  name: string;
  employeeid: string;
  override: string;
  dealerid: string;
  branchid: string;
  role: string;
  alloweddealerships: any[];
  allowedpages: Allowedpage[];
}


export interface Allowedpage {
  id: number;
  name: string;
  employeeid: string;
  permissionid: string;
  flag: string;
  permissioncode: string;

}

export interface AuthenticatedUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  department: string;
  cost_centre: string;
  employeeid: string;
  branchid: string;
  organizationid: string;
  overrideperm: string;
  zone: string;
  phoneNumber: string;
  timeZone: string;
  permissions: Permission[];
  permissionsAsRegions: Region[];
}

export interface Permission {
  page: string;
  service: string;
}

export interface Region {
  id: number;
  name: string;
  employeeid: string;
  permissionid: string;
  permissioncode: string;
  flag: string;
}

export interface CustomRole {
  branchId: string;
  roleId: string;
}

export interface ApplicationUser {
  emailAddress: string;
  userId: any;
  organisationalId: number;
  employeeId: string;
  firstName: string;
  lastName: string;
  enabled: boolean;
  department: string;
  defaultBranchId: string;
  defaultRole: string;
  customRoles: CustomRole[];
  phoneNumber: string;
  costCenter: string;
  overrideperm: string;
  region: string;
  timeZone: string;
  customCreateUserEmailText: string;
  baseRole: string;
  homeBranchId: string;
}
