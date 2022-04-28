export interface CreditRegulatoryProduct {
    creditResponseId: number;
    creditFileId: string;
    borrowerId: string;
    creditRepositorySourceType: string;
    creditRepositorySourceTypeOtherDescription: string;
    sourceType: string;
    sourceTypeOtherDescription: string;
    providerDescription: string;
    resultText: string;
    resultStatusType: string;
    resultStatusTypeOtherDescription: string;
    disclaimerText: string;
    match: any[];
    id: number;
}