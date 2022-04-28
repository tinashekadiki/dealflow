import {CreditRegulatoryProduct} from './credit_regulatory_product';
import {CreditScore} from './credit_score';

export interface CreditResponseLocation {
    url: string;
    type: string;
}

export interface CreditReport {
    creditReportId: string;
    reportType: string;
    locations: CreditResponseLocation[];
}

export interface CreditResponse {
    status: string;
    errors: any[];
    creditReports: CreditReport[];
    creditScores: CreditScore[];
    regulatoryProducts: CreditRegulatoryProduct[];
}

export interface PreviousCredit {
  id?: number;
  globalCustomerId?: string;
  creditDocumentLink?: string;
  conscented?: boolean;
  branchId?: string;
  parentId?: string;
  date?: Date;
  coborrowerGlobalId?: string;
  reportType?: string;
}
