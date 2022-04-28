export interface ActualCreditReport {
  responseGroup?: ResponseGroup;
}

export interface ResponseGroup {
  id?: string;
  respondingparty?: Respondingparty;
  respondtoparty?: Party;
  response?: Response[];
  signature?: null;
  mismoversionID?: string;
}

export interface Respondingparty {
  name?: string;
  streetAddress?: string;
  streetAddress2?: null | string;
  city?: string;
  state?: string;
  postalCode?: string;
  identifier?: null;
  contactdetail?: Contactdetail[];
}

export interface Contactdetail {
  name?: null | string;
  contactpoint?: Contactpoint[];
}

export interface Contactpoint {
  roleType?: null | string;
  type?: string;
  typeOtherDescription?: null;
  value?: null | string;
  preferenceIndicator?: null | string;
}

export interface Party {
  name?: null | string;
  streetAddress?: null | string;
  streetAddress2?: null;
  city?: null | string;
  state?: null | string;
  postalCode?: null | string;
  identifier?: null;
  contactdetail?: Contactdetail[];
  preferredresponse?: any[];
}

export interface Response {
  id?: string;
  responseDateTime?: string;
  internalAccountIdentifier?: string;
  loginAccountIdentifier?: null;
  loginAccountPassword?: null;
  key?: Key[];
  responsedata?: Responsedatum[];
  status?: Status[];
}

export interface Key {
  name?: string;
  value?: string;
}

export interface Responsedatum {
  creditresponse?: Creditresponse;
}

export interface Creditresponse {
  creditResponseID?: string;
  creditReportIdentifier?: string;
  creditReportTransactionIdentifier?: string;
  creditReportFirstIssuedDate?: string;
  creditReportLastUpdatedDate?: string;
  creditReportMergeType?: string;
  creditReportType?: string;
  creditReportTypeOtherDescription?: null;
  creditRatingCodeType?: string;
  creditRatingCodeTypeOtherDescription?: string;
  datainformation?: null;
  creditbureau?: Creditbureau;
  creditreportprice?: Creditreportprice[];
  creditrepositoryincluded?: Creditrepositoryincluded;
  requestingparty?: Party;
  creditrequestdata?: Creditrequestdata;
  crediterrormessage?: any[];
  borrower?: BorrowerElement[];
  creditliability?: any[];
  creditpublicrecord?: any[];
  creditinquiry?: any[];
  creditfile?: Creditfile[];
  creditscore?: any[];
  credittradereference?: any[];
  creditcomment?: Creditcomment[];
  creditconsumerreferral?: Respondingparty[];
  creditsummary?: Creditsummary[];
  regulatoryproduct?: Regulatoryproduct[];
  embeddedfile?: any[];
  mismoversionID?: string;
}

export interface BorrowerElement {
  borrowerID?: string;
  birthDate?: string;
  firstName?: string;
  lastName?: string;
  middleName?: null;
  nameSuffix?: null;
  printPositionType?: string;
  ssn?: string;
  unparsedName?: null;
  maritalStatusType?: null;
  residence?: Residence[];
  employer?: any[];
}

export interface Residence {
  streetAddress?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: null;
  borrowerResidencyBasisType?: null;
  borrowerResidencyDurationMonths?: null;
  borrowerResidencyDurationYears?: null;
  borrowerResidencyType?: string;
  monthlyRentAmount?: null;
  monthlyRentCurrentRatingType?: null;
  parsedstreetaddress?: Parsedstreetaddress;
  contactdetail?: null;
  landlord?: null;
}

export interface Parsedstreetaddress {
  apartmentOrUnit?: null;
  directionPrefix?: null;
  directionSuffix?: null;
  houseNumber?: string;
  militaryAPOFPO?: null;
  postOfficeBox?: null;
  ruralRoute?: null;
  streetName?: string;
  streetSuffix?: null;
}

export interface Creditbureau {
  name?: string;
  streetAddress?: string;
  streetAddress2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  disclaimerText?: null;
  contactdetail?: Contactdetail[];
}

export interface Creditcomment {
  code?: null;
  reportedDate?: null;
  sourceType?: string;
  type?: string;
  typeOtherDescription?: null;
  text?: Text[];
}

export interface Text {
  value?: string;
}

export interface Creditfile {
  creditFileID?: string;
  borrowerID?: string;
  creditScoreID?: null;
  creditRepositorySourceType?: string;
  creditRepositorySourceTypeOtherDescription?: null;
  infileDate?: null;
  resultStatusType?: string;
  resultStatusTypeOtherDescription?: null;
  alertmessage?: any[];
  borrower?: CreditfileBorrower;
  owningbureau?: null;
  variation?: any[];
  creditcomment?: Creditcomment[];
  crediterrormessage?: any[];
}

export interface CreditfileBorrower {
  borrowerID?: null;
  jointAssetBorrowerID?: null;
  unparsedName?: null;
  firstName?: null;
  middleName?: null;
  lastName?: null;
  nameSuffix?: null;
  ageAtApplicationYears?: null;
  birthDate?: null;
  applicationSignedDate?: null;
  homeTelephoneNumber?: null;
  printPositionType?: null;
  ssn?: null;
  dependentCount?: null;
  jointAssetLiabilityReportingType?: null;
  maritalStatusType?: null;
  schoolingYears?: null;
  creditReportIdentifier?: null;
  alias?: any[];
  mailto?: null;
  residence?: any[];
  currentincome?: any[];
  declaration?: null;
  dependent?: any[];
  employer?: any[];
  fhavaborrower?: null;
  governmentmonitoring?: null;
  presenthousingexpense?: any[];
  summary?: any[];
  vaborrower?: null;
  contactpoint?: any[];
}

export interface Creditreportprice {
  amount?: string;
  type?: string;
  typeOtherDescription?: null | string;
}

export interface Creditrepositoryincluded {
  equifaxIndicator?: string;
  experianIndicator?: string;
  transUnionIndicator?: string;
  otherRepositoryName?: null | string;
}

export interface Creditrequestdata {
  creditRequestID?: string;
  borrowerID?: string;
  creditReportIdentifier?: string;
  creditReportTransactionIdentifier?: null;
  creditReportProductDescription?: null;
  creditReportRequestActionType?: string;
  creditReportRequestActionTypeOtherDescription?: null;
  creditReportType?: string;
  creditReportTypeOtherDescription?: null;
  creditRepositoriesSelectedCount?: string;
  creditRequestDateTime?: null;
  creditRequestType?: string;
  creditrepositoryincluded?: Creditrepositoryincluded;
  creditscoremodelname?: any[];
}

export interface Creditsummary {
  borrowerID?: null;
  name?: string;
  dataset?: Key[];
  text?: Text[];
}

export interface Regulatoryproduct {
  creditFileID?: null;
  borrowerID?: string;
  creditRepositorySourceType?: string;
  creditRepositorySourceTypeOtherDescription?: string;
  sourceType?: string;
  sourceTypeOtherDescription?: null;
  providerDescription?: string;
  resultText?: string;
  resultStatusType?: string;
  resultStatusTypeOtherDescription?: null;
  disclaimerText?: null;
  match?: any[];
}

export interface Status {
  condition?: string;
  code?: string;
  name?: null;
  description?: string;
}
