export interface HousingStatus {
  code: string;
  name: string;
}

export interface EducationLevel {
  code: string;
  name: string;
}

export interface MaritalStatus {
  code: string;
  name: string;
}

export interface AdditionalIncomeSource {
  code: string;
  name: string;
}

export interface EmploymentStatus {
  code: string;
  name: string;
}

export interface CustomerDigitalApplication {
  id: number;
  additionalIncome: number;
  additionalIncomeSource: AdditionalIncomeSource;
  address: string;
  annualIncome: number;
  apartmentUnit: string;
  bankruptcy: boolean;
  bankruptcyDate?: any;
  birthday: string;
  blcTransactionId?: any;
  branchId: string;
  canPreview: boolean;
  city: string;
  completed: boolean;
  confirmedEmailAddress: string;
  createdAt: string;
  driversLicenceState: string;
  driversLicenseNumber: string;
  educationLevel: EducationLevel;
  email: string;
  employerName: string;
  employmentStatus: EmploymentStatus;
  equifax: string;
  eventId: string;
  experian: string;
  firstName: string;
  globalCustomerId: string;
  housingStatus: HousingStatus;
  jobTitle: string;
  lastName: string;
  lease: string;
  maritalStatus: MaritalStatus;
  middleName: string;
  monthlyMortgage: number;
  monthlyRent: number;
  numberOfDependents: number;
  otherPhoneNumber: string;
  ownership: string;
  parentId: string;
  phoneNumber: string;
  preferredContactMethod: string;
  preferredLanguage: string;
  prefix: string;
  previousAddress: string;
  previousAnnualIncome: number;
  previousApartmentUnit: string;
  previousCity: string;
  previousEmployerName: string;
  previousEmploymentEndDate: string;
  previousEmploymentStartDate: string;
  previousJobTitle: string;
  previousPhoneNumber: string;
  previousState: string;
  previousZip: string;
  proceededAsSoleApplicant: boolean;
  relatedTo: string;
  relatedToCanPreview: boolean;
  relatedToCompleted: boolean;
  relation?: any;
  relationship: string;
  reposession: boolean;
  reposessionDate?: any;
  requestType: string;
  ssn: string;
  startDate: Date;
  state: string;
  suffix: string;
  timeAtAddressMonths: number;
  timeAtAddressYears: number;
  timeAtPreviousAddressMonths: number;
  timeAtPreviousAddressYears: number;
  title: string;
  transactionId?: any;
  transunion: string;
  workPhoneNumber: string;
  zip: string; 
}
