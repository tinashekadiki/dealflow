import { CustomerBiometric } from './customer_biometric';
import { CustomerContact } from './customer_contact';
import { CustomerPersonal } from './customer_personal';
import { CustomerPreviousContact } from './customer_previous_contact';
import { CustomerCoborrower } from './customer_coborrower'

export interface Process {
    processId: number;
}
export interface CustomerProfile {
    processes: Process[];
    ComplianceFlag: string;
    CustomerPersonalDetails: CustomerPersonal;
    CustomerBiometricDetail: CustomerBiometric;
    CustomerContactDetails: CustomerContact;
    CustomerPreviousContactDetails: CustomerPreviousContact[];
    CoBorrower?: CustomerCoborrower;
    relationType: string;
    EventCode: string;
}