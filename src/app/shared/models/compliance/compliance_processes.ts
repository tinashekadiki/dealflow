export interface ComplianceProcessPage {
    page: string;
    success: boolean;
    type: string;
    description: string;
}

export interface ComplianceProcess {
    process: string;
    pages: ComplianceProcessPage[];
}

export interface ComplianceProcessesList {
    processes: ComplianceProcess[];
}
