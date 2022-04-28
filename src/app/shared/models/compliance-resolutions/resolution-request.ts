export interface ResolutionDetails {
    zipcode: string;
    city: string;
    dob: string;
    applicationCreated: string;
    addressLine1: string;
    lastName: string;
    userCreated: string;
    stateCode: string;
    firstName: string;
    applicationId: string;
    ssn: string;
}

export interface ResolutionRequest {
    recordId: number;
    resolutionType: string;
    recordType: string;
    notes: string;
    globalCustomerId: string;
    resolutionDetails: ResolutionDetails;
}
