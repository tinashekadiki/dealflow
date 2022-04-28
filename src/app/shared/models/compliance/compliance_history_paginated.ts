export interface ComplianceStatus {
  parentId: string;
  branchId: string;
  globalCustomerId: string;
  status: string;
  blocked: boolean;
  blockedAt?: string;
  unblocked: boolean;
  unblockedAt?: any;
  eventId: string;
}

export interface Page {
  pageId: string;
  type: string;
  description: string;
  message: string;
}

export interface ResolutionRequestsModel {
  resolutionId: number;
  resolutionNotes: string;
  resolutionDate?: Date;
  resolutionResult: boolean;
  resolvedBy: string;
  page: Page;
}

export interface IDVerificationStatistic {
  verificationId: number;
  phoneNumber: string;
  verifiedAt: Date;
  verified: boolean;
  pending: boolean;
  complianceStatus: ComplianceStatus;
  page: Page;
  resolutionRequestsModel: ResolutionRequestsModel;
  exId?: number;
  expiryDate?: string;
  createdAt?: string;
  fraudCheckId?: number;
  checkedAt?: string;
  fraudulent?: boolean;
  abuseScore?: number;
  firstParty?: number;
  thirdParty?: number;
}

export interface ComplianceStatistic {
  branchId: string;
  customerCount: number;
  recordType: string;
  good: number;
  bad: number;
  pending: number;
  missingInfo: number;
  data: IDVerificationStatistic[];
  customers: Customer[];
}

export interface Customer {
  firstName: string;
  lastName: string;
  ssn: string;
  globalCustomerId: string;
}
