export interface CustomerComplianceProcess {
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
    page: string;
}
