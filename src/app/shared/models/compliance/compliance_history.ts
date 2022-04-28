export interface ComplianceHistory {
  id: number;
  description: string;
  globalCustomerId: string;
  timeCreated: string;
  timeZone: string;
  parentid: string;
  process: string;
  service: boolean;
  result: boolean;
  branchid: string;
  page?: string;
  firstname?: any;
  lastname?: any;
  zone?: any;
  ssn?: any;
  signedOn?: any;
  title?: string;
  eventCode?: string;
}
