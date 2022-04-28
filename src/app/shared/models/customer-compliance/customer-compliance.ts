export interface ComplianceStatus {
    parentId: string;
    branchId: string;
    globalCustomerId: string;
    status: string;
    blocked: boolean;
    blockedAt: Date;
    unblocked: boolean;
    unblockedAt?: Date;
    eventId: string;
}

export interface Page {
    pageId: string;
    type: string;
    description: string;
    message: string;
}

export interface Display {
    colorClass: string;
    icon: string;
}

export interface ResolutionRequestsModel {
    resolutionId: number;
    resolutionNotes: string;
    resolutionDate?: Date;
    resolutionResult: boolean;
    resolvedBy: string;
    page: Page;
}

export interface IdVerification {
    verificationId: number;
    phoneNumber: string;
    verifiedAt: Date;
    verified: boolean;
    complianceDate: Date;
    pending: boolean;
    complianceStatus: ComplianceStatus;
    page: Page;
    resolutionRequestsModel: ResolutionRequestsModel;
    display?: Display;
}

export interface ExpiredLicense {
    exId: number;
    expiryDate: Date;
    createdAt: Date;
    complianceDate: Date;
    pending: boolean;
    complianceStatus: ComplianceStatus;
    page: Page;
    resolutionRequestsModel: ResolutionRequestsModel;
    display?: Display;
}

export interface SyntheticFraud {
    fraudCheckId?: string;
    checkedAt?: Date;
    fraudulent: boolean;
    abuseScore?: number;
    firstParty?: number;
    thirdParty?: number;
    complianceDate: Date;
    pending: boolean;
    complianceStatus: ComplianceStatus;
    page: Page;
    resolutionRequestsModel: ResolutionRequestsModel;
    display?: Display;
}

export interface RegulatoryCompliance {
    id?: string;
    result: boolean;
    checkedOn?: Date;
    complianceDate: Date;
    pending: boolean;
    complianceStatus: ComplianceStatus;
    page: Page;
    resolutionRequestsModel: ResolutionRequestsModel;
    display?: Display;
}

export interface Consents {
    disclosureName: string;
    verbiage: string;
}

export interface Disclosures {
    consentId: number;
    createdAt: Date;
    globalCustomerId: string;
    branchId: string;
    parentId: string;
    eventId: string;
    browser: string;
    deviceMac?: any;
    deviceNetworkAdd: string;
    operatingSystem: string;
    phoneNumber: string;
    email: string;
    consents?: Consents;
}

export interface CustomerCompliance {
    IdVerification: IdVerification;
    ExpiredLicense?: ExpiredLicense;
    SyntheticFraud?: SyntheticFraud;
    RegulatoryComplianceOfac?: RegulatoryCompliance;
    RegulatoryComplianceMla?: RegulatoryCompliance;
    disclosures?: Disclosures;
    idVerificationTitle: string;
    expiredLicenseTitle: string;
    syntheticFraudTitle: string;
    ofacTitle: string;
    mlaTitle: string;
    Ofac?: RegulatoryCompliance;
    Mla?: RegulatoryCompliance;
}
