
export interface Factor {
    code: string;
    text: string;
}
export interface CreditScore {
    creditResponseId: number;
    creditScoreId: string;
    borrowerId: string;
    creditFileId: string;
    creditReportIdentifier: string;
    creditRepositorySourceType: string;
    creditRepositorySourceTypeOtherDescription: string;
    date: string;
    exclusionReasonType: string;
    factaInquiriesIndicator: string;
    modelNameType: string;
    modelNameTypeOtherDescription: string;
    value: number;
    factors: Factor[];
    id: number;
}