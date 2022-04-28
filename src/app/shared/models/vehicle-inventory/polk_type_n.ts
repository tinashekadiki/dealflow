export class PolkTypeN {
  request: NRequest[];
  requestBranded: string;
  requestPlate: string;
  permissions: NPermissions;
}

export class NPermissions {
  globalcustomerid: string;
  settingcode: string;
}

export class NRequest {
  STREETADDRESS: string;
  State: string;
  FIRSTNAME: string;
  SURNAME: string;
  RequestId: string;
  City: string;
  zipcode: string;
  make: string;
  modelYear: string;
}