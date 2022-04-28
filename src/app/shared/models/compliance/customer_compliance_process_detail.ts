import { ComplianceHistory } from './compliance_history';
import { CustomerComplianceProcess } from './customer_compliance_process';
export interface Response {
    historyDate: string;
    branchId: string;
    titleHeader: string;
    actionMessage: string;
    profileStatus: string;
    transactionDate: string;
    pageId: string;
    globalCustomerId: string;
    parentId: string;
    transactionId: string;
    firstname: string;
    lastname: string;
    address: string;
    licenseExpiryDate?: string;
    subTitle: string;
    cellnumber: string;
    dob: string;
    historyTime: string;
    email: string;
    abuseScore: number;
    firstPartyScore: number;
    thirdPartyScore: number;
}
export interface CustomerComplianceProcessDetail {
    response: Response;
    history: CustomerComplianceProcess[]; 
}




