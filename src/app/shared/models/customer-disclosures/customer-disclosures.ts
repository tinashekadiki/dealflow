import { Display } from "../customer-compliance/customer-compliance";

export interface Consents {
    disclosureName: string;
    verbiage: string;
}

export interface CustomerDisclosures {
    consentId: number;
    createdAt: Date;
    globalCustomerId: string;
    branchId: string;
    parentId: string;
    eventId: string;
    browser: string;
    deviceMac?: string;
    deviceNetworkAdd: string;
    operatingSystem: string;
    phoneNumber: string;
    email: string;
    consents: Consents;
    display?: Display;
}
