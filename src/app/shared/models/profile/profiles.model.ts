export class ApplicationUser {
  baseRole: string;
  costCenter: string;
  department: string;
  emailAddress: string;
  employeeId: string;
  firstName: string;
  homeBranchId: string;
  lastName: string;
  organizationalId: number;
  overrideperm: string;
  phoneNumber: string;
  region: string;
  timeZone: string;
  userId: string;
}

export interface Dealership {
  organisationalId: number;
  name: string;
}

export interface Branch {
  branchId: string;
  dealership: Dealership;
  name: string;
  emailAddress: string;
  primaryAddress: string;
  secondaryAddress: string;
  city: string;
  zipCode: string;
  state: string;
  country: string;
  phone: string;
}


